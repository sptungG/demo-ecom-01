"use client";
import React, { useState } from "react";
import { ProductDetailsQuery } from "@/gql/graphql";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react";
import ProductDetailTabs from "./components/ProductDetailTabs";
import RelatedProductsCarousel from "./components/RelatedProductsCarousel";
import ShareButton from "./components/ShareButton";
import type { ProductListItemFragment } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

interface ProductDetailProps {
	product: ProductDetailsQuery["product"];
	relatedProducts?: ProductListItemFragment[];
	channel: string;
	addItemAction: (variantId: string, quantity: number) => Promise<void>;
	price?: string;
	currentImage: {
		url: string;
		alt: string;
	};
}

const ProductDetail: React.FC<ProductDetailProps> = ({
	product,
	relatedProducts,
	channel,
	price,
	addItemAction,
	currentImage,
}) => {
	const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
	const [quantity, setQuantity] = useState(1);
	const [isFavorite, setIsFavorite] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [selectedImage, setSelectedImage] = useState(currentImage ?? {});
	const router = useRouter();

	if (!product) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="mb-2 text-2xl font-semibold text-foreground">Product not found</h2>
					<p className="text-muted-foreground">The product you are looking for was not found.</p>
				</div>
			</div>
		);
	}

	const handleVariantChange = (variant: any) => {
		setSelectedVariant(variant);
		// Reset selected image index when variant changes
		setSelectedImage(variant.media?.[0]);
		// Update URL with selected variant
		const url = new URL(window.location.href);
		url.searchParams.set("variant", variant.id);
		router.replace(url.toString(), { scroll: false });
	};

	const handleAddToCart = async () => {
		if (!selectedVariant?.id) {
			toast.warning("No variant selected", {
				description: "Please select a product variant before adding to cart",
				duration: 3000,
			});
			return;
		}

		setIsAddingToCart(true);
		try {
			await addItemAction(selectedVariant.id, quantity);
			toast.success("Success!", {
				description: `Added ${quantity} product(s) to cart`,
				duration: 3000,
			});
		} catch (error) {
			console.error("Error adding to cart:", error);
			toast.error("An error occurred", {
				description: "Unable to add product to cart. Please try again",
				duration: 4000,
			});
		} finally {
			setIsAddingToCart(false);
		}
	};

	const handleBuyNow = async () => {
		if (!selectedVariant?.id) {
			toast.warning("No variant selected", {
				description: "Please select a product variant before purchasing",
				duration: 3000,
			});
			return;
		}

		setIsAddingToCart(true);
		try {
			await addItemAction(selectedVariant.id, quantity);
			// Redirect to checkout
			router.push(`/${channel}/cart`);
		} catch (error) {
			console.error("Error during buy now:", error);
			toast.error("An error occurred", {
				description: "Unable to complete purchase. Please try again",
				duration: 4000,
			});
		} finally {
			setIsAddingToCart(false);
		}
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<Toaster />
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				{/* Product Images Gallery */}
				<div className="space-y-4">
					{/* Main Image */}
					<div className="aspect-square overflow-hidden rounded-lg bg-muted">
						{selectedImage ? (
							<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
								<Zoom>
									<img
										src={selectedImage?.url ?? product.thumbnail?.url}
										alt={selectedImage?.alt ?? product.name}
										className="h-full w-full cursor-zoom-in object-cover transition-all duration-300 hover:scale-105"
									/>
								</Zoom>
							</div>
						) : (
							<div className="flex h-full w-full items-center justify-center text-muted-foreground">
								<span className="text-lg">No image available</span>
							</div>
						)}
					</div>

					{/* Image Carousel Thumbnails */}
					{product.media?.length && product.media.length > 1 && (
						<div className="w-full">
							<Carousel
								opts={{
									align: "start",
									loop: false,
									slidesToScroll: 1,
									containScroll: "trimSnaps",
								}}
								className="w-full"
							>
								<CarouselContent className="-ml-2">
									{product.media?.map((image, index) => (
										<CarouselItem key={index} className="basis-1/4 pl-2 sm:basis-1/5 md:basis-1/6">
											<button
												onClick={() => setSelectedImage(image)}
												className={`aspect-square w-full overflow-hidden rounded-lg border-2 transition-all duration-200 ${
													image.url === selectedImage.url
														? "border-primary ring-2 ring-primary/20"
														: "border-border hover:border-muted-foreground"
												}`}
											>
												<img
													src={image.url}
													alt={image.alt || `${product.name} - Image ${index + 1}`}
													className="h-full w-full object-cover"
												/>
											</button>
										</CarouselItem>
									))}
								</CarouselContent>
								{product.media?.length > 6 && (
									<>
										<CarouselPrevious className="-left-2" />
										<CarouselNext className="-right-2" />
									</>
								)}
							</Carousel>
						</div>
					)}
				</div>

				{/* Product Info */}
				<div className="space-y-6">
					{/* Breadcrumb */}
					<nav className="text-sm text-muted-foreground">
						<Link href="/" className="hover:text-foreground transition-colors">Home</Link>
						<span className="mx-2">/</span>
						<Link href={`/${channel}/products`} className="hover:text-foreground transition-colors">Products</Link>
						{product.category && (
							<>
								<span className="mx-2">/</span>
								<span className="hover:text-foreground transition-colors">{product.category.name}</span>
							</>
						)}
						<span className="mx-2">/</span>
						<span className="text-foreground">{product.name}</span>
					</nav>

					{/* Product Title & Rating */}
					<div>
						<h1 className="mb-2 text-3xl font-bold text-foreground">{product.name}</h1>
						<div className="flex items-center space-x-4">
							<div className="flex items-center">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`h-5 w-5 ${star <= 4 ? "fill-current text-yellow-500" : "text-muted-foreground"}`}
									/>
								))}
								<span className="ml-2 text-sm text-muted-foreground">(4.0) • 128 reviews</span>
							</div>
							<span className="text-sm text-muted-foreground">SKU: {product.id.slice(-8)}</span>
						</div>
					</div>

					{/* Price */}
					<div className="space-y-2">
						<div className="flex items-center space-x-3">
							<span className="text-3xl font-bold text-destructive">{price}</span>
						</div>
						<p className="text-sm text-muted-foreground">Price includes VAT</p>
					</div>

					{/* Stock Status */}
					<div className="flex items-center space-x-2">
						<div
							className={`h-3 w-3 rounded-full ${
								(selectedVariant?.quantityAvailable || 0) > 0 ? "bg-green-500" : "bg-destructive"
							}`}
						></div>
						<span
							className={`text-sm font-medium ${
								(selectedVariant?.quantityAvailable || 0) > 0 ? "text-green-600" : "text-destructive"
							}`}
						>
							{(selectedVariant?.quantityAvailable || 0) > 0
								? `In stock (${selectedVariant?.quantityAvailable} items)`
								: "Out of stock"}
						</span>
					</div>

					{/* Variants */}
					{product.variants && product.variants.length > 1 && (
						<div className="space-y-3">
							<h3 className="text-sm font-medium text-foreground">Variants:</h3>
							<div className="grid grid-cols-2 gap-2">
								{product.variants.map((variant) => (
									<button
										key={variant.id}
										onClick={() => handleVariantChange(variant)}
										className={`rounded-lg border p-3 text-left transition-colors ${
											selectedVariant?.id === variant.id
												? "border-primary bg-primary/5 text-primary"
												: "border-border hover:border-muted-foreground hover:bg-muted/50"
										}`}
									>
										<div className="font-medium">{variant.name}</div>
										{variant.pricing?.price?.gross && (
											<div className="text-sm text-muted-foreground">
												{variant.pricing.price.gross.amount.toLocaleString("en-US")}{" "}
												{variant.pricing.price.gross.currency}
											</div>
										)}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Quantity Selector */}
					<div className="space-y-3">
						<h3 className="text-sm font-medium text-foreground">Quantity:</h3>
						<div className="flex items-center space-x-3">
							<button
								onClick={() => setQuantity(Math.max(1, quantity - 1))}
								className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:border-muted-foreground hover:bg-muted/50 transition-colors"
							>
								<Minus className="h-4 w-4" />
							</button>
							<span className="min-w-[3rem] text-center text-lg font-medium">{quantity}</span>
							<button
								onClick={() => setQuantity(quantity + 1)}
								className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:border-muted-foreground hover:bg-muted/50 transition-colors"
							>
								<Plus className="h-4 w-4" />
							</button>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="space-y-3">
						<div className="flex space-x-3">
							<button
								onClick={handleAddToCart}
								disabled={(selectedVariant?.quantityAvailable || 0) === 0 || isAddingToCart}
								className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<ShoppingCart className="h-5 w-5" />
								<span>{isAddingToCart ? "Adding..." : "Add to Cart"}</span>
							</button>
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className={`rounded-lg border p-3 transition-colors ${
									isFavorite
										? "border-destructive bg-destructive/5 text-destructive"
										: "border-border hover:border-muted-foreground hover:bg-muted/50"
								}`}
							>
								<Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
							</button>
							<ShareButton />
						</div>

						<button
							onClick={handleBuyNow}
							disabled={(selectedVariant?.quantityAvailable || 0) === 0 || isAddingToCart}
							className="w-full rounded-lg bg-destructive px-6 py-3 font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isAddingToCart ? "Processing..." : "Buy Now"}
						</button>
					</div>

					{/* Features */}
					<div className="grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3">
						<div className="flex items-center space-x-3">
							<Truck className="h-6 w-6 text-primary" />
							<div>
								<div className="text-sm font-medium text-foreground">Free Shipping</div>
								<div className="text-xs text-muted-foreground">Orders over $50</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Shield className="h-6 w-6 text-green-600" />
							<div>
								<div className="text-sm font-medium text-foreground">12 Month Warranty</div>
								<div className="text-xs text-muted-foreground">100% Authentic</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<RotateCcw className="h-6 w-6 text-orange-600" />
							<div>
								<div className="text-sm font-medium text-foreground">30 Day Returns</div>
								<div className="text-xs text-muted-foreground">Free returns</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Product Detail Tabs */}
			<ProductDetailTabs product={product} selectedVariant={selectedVariant as any} />

			{/* Related Products Carousel */}
			<div className="mt-4 border-t border-border pt-4">
				<RelatedProductsCarousel products={relatedProducts ?? []} title="Related Products" />
			</div>
		</div>
	);
};

export default ProductDetail;
