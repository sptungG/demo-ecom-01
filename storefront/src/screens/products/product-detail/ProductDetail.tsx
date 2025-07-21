"use client";
import React, { useState } from "react";
import { ProductDetailsQuery } from "@/gql/graphql";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
	Heart,
	Share2,
	ShoppingCart,
	Star,
	Truck,
	Shield,
	RotateCcw,
	Plus,
	Minus,
	AlertCircle,
	CheckCircle,
} from "lucide-react";
import ProductDetailTabs from "./components/ProductDetailTabs";
import RelatedProductsCarousel from "./components/RelatedProductsCarousel";
import type { ProductListItemFragment } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

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

type AlertType = {
	type: "success" | "error" | "warning";
	title: string;
	message: string;
	show: boolean;
};

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
	const [alert, setAlert] = useState<AlertType>({
		type: "success",
		title: "",
		message: "",
		show: false,
	});
	const router = useRouter();

	// Show alert function
	const showAlert = (type: "success" | "error" | "warning", title: string, message: string) => {
		setAlert({ type, title, message, show: true });
		// Auto hide alert after 5 seconds
		setTimeout(() => {
			setAlert((prev) => ({ ...prev, show: false }));
		}, 5000);
	};

	if (!product) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="mb-2 text-2xl font-semibold text-gray-900">Product not found</h2>
					<p className="text-gray-600">The product you are looking for was not found.</p>
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
			showAlert(
				"warning",
				"No variant selected",
				"Please select a product variant before adding to cart",
			);
			return;
		}

		setIsAddingToCart(true);
		try {
			await addItemAction(selectedVariant.id, quantity);
			showAlert("success", "Success!", `Added ${quantity} product(s) to cart`);
		} catch (error) {
			console.error("Error adding to cart:", error);
			showAlert("error", "An error occurred", "Unable to add product to cart. Please try again");
		} finally {
			setIsAddingToCart(false);
		}
	};

	const handleBuyNow = async () => {
		if (!selectedVariant?.id) {
			showAlert("warning", "No variant selected", "Please select a product variant before purchasing");
			return;
		}

		setIsAddingToCart(true);
		try {
			await addItemAction(selectedVariant.id, quantity);
			// Redirect to checkout
			router.push(`/${channel}/cart`);
		} catch (error) {
			console.error("Error during buy now:", error);
			showAlert("error", "An error occurred", "Unable to complete purchase. Please try again");
		} finally {
			setIsAddingToCart(false);
		}
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			{/* Alert Component */}
			{alert.show && (
				<div className="mb-6">
					<Alert
						variant={alert.type === "error" ? "destructive" : "default"}
						className={`
							${alert.type === "success" ? "border-green-500 bg-green-50 text-green-800" : ""}
							${alert.type === "warning" ? "border-yellow-500 bg-yellow-50 text-yellow-800" : ""}
						`}
					>
						{alert.type === "success" && <CheckCircle className="h-4 w-4" />}
						{alert.type === "error" && <AlertCircle className="h-4 w-4" />}
						{alert.type === "warning" && <AlertCircle className="h-4 w-4" />}
						<AlertTitle>{alert.title}</AlertTitle>
						<AlertDescription>{alert.message}</AlertDescription>
					</Alert>
				</div>
			)}

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				{/* Product Images Gallery */}
				<div className="space-y-4">
					{/* Main Image */}
					<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
						{selectedImage ? (
							<div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
								<Zoom>
									<img
										src={selectedImage?.url ?? product.thumbnail?.url}
										alt={selectedImage?.alt ?? product.name}
										className="h-full w-full cursor-zoom-in object-cover transition-all duration-300 hover:scale-105"
									/>
								</Zoom>
							</div>
						) : (
							<div className="flex h-full w-full items-center justify-center text-gray-400">
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
														? "border-blue-500 ring-2 ring-blue-200"
														: "border-gray-200 hover:border-gray-300"
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
					<nav className="text-sm text-gray-500">
						<Link href="/">Home</Link>
						<span className="mx-2">/</span>
						<Link href={`/${channel}/products`}>Products</Link>
						{product.category && (
							<>
								<span className="mx-2">/</span>
								<span>{product.category.name}</span>
							</>
						)}
						<span className="mx-2">/</span>
						<span className="text-gray-900">{product.name}</span>
					</nav>

					{/* Product Title & Rating */}
					<div>
						<h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
						<div className="flex items-center space-x-4">
							<div className="flex items-center">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`h-5 w-5 ${star <= 4 ? "fill-current text-yellow-400" : "text-gray-300"}`}
									/>
								))}
								<span className="ml-2 text-sm text-gray-600">(4.0) • 128 reviews</span>
							</div>
							<span className="text-sm text-gray-500">SKU: {product.id.slice(-8)}</span>
						</div>
					</div>

					{/* Price */}
					<div className="space-y-2">
						<div className="flex items-center space-x-3">
							<span className="text-3xl font-bold text-red-600">{price}</span>
						</div>
						<p className="text-sm text-gray-600">Price includes VAT</p>
					</div>

					{/* Stock Status */}
					<div className="flex items-center space-x-2">
						<div
							className={`h-3 w-3 rounded-full ${
								(selectedVariant?.quantityAvailable || 0) > 0 ? "bg-green-500" : "bg-red-500"
							}`}
						></div>
						<span
							className={`text-sm font-medium ${
								(selectedVariant?.quantityAvailable || 0) > 0 ? "text-green-600" : "text-red-600"
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
							<h3 className="text-sm font-medium text-gray-900">Variants:</h3>
							<div className="grid grid-cols-2 gap-2">
								{product.variants.map((variant) => (
									<button
										key={variant.id}
										onClick={() => handleVariantChange(variant)}
										className={`rounded-lg border p-3 text-left transition-colors ${
											selectedVariant?.id === variant.id
												? "border-blue-500 bg-blue-50 text-blue-700"
												: "border-gray-300 hover:border-gray-400"
										}`}
									>
										<div className="font-medium">{variant.name}</div>
										{variant.pricing?.price?.gross && (
											<div className="text-sm text-gray-600">
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
						<h3 className="text-sm font-medium text-gray-900">Quantity:</h3>
						<div className="flex items-center space-x-3">
							<button
								onClick={() => setQuantity(Math.max(1, quantity - 1))}
								className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:border-gray-400"
							>
								<Minus className="h-4 w-4" />
							</button>
							<span className="min-w-[3rem] text-center text-lg font-medium">{quantity}</span>
							<button
								onClick={() => setQuantity(quantity + 1)}
								className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:border-gray-400"
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
								className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
							>
								<ShoppingCart className="h-5 w-5" />
								<span>{isAddingToCart ? "Adding..." : "Add to Cart"}</span>
							</button>
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className={`rounded-lg border p-3 transition-colors ${
									isFavorite
										? "border-red-500 bg-red-50 text-red-600"
										: "border-gray-300 hover:border-gray-400"
								}`}
							>
								<Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
							</button>
							<button className="rounded-lg border border-gray-300 p-3 transition-colors hover:border-gray-400">
								<Share2 className="h-5 w-5" />
							</button>
						</div>

						<button
							onClick={handleBuyNow}
							disabled={(selectedVariant?.quantityAvailable || 0) === 0 || isAddingToCart}
							className="w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
						>
							{isAddingToCart ? "Processing..." : "Buy Now"}
						</button>
					</div>

					{/* Features */}
					<div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
						<div className="flex items-center space-x-3">
							<Truck className="h-6 w-6 text-blue-600" />
							<div>
								<div className="text-sm font-medium">Free Shipping</div>
								<div className="text-xs text-gray-600">Orders over $50</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Shield className="h-6 w-6 text-green-600" />
							<div>
								<div className="text-sm font-medium">12 Month Warranty</div>
								<div className="text-xs text-gray-600">100% Authentic</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<RotateCcw className="h-6 w-6 text-orange-600" />
							<div>
								<div className="text-sm font-medium">30 Day Returns</div>
								<div className="text-xs text-gray-600">Free returns</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Product Detail Tabs */}
			<ProductDetailTabs product={product} selectedVariant={selectedVariant as any} />

			{/* Related Products Carousel */}
			<div className="mt-4 border-t border-gray-200 pt-4">
				<RelatedProductsCarousel products={relatedProducts ?? []} title="Related Products" />
			</div>
		</div>
	);
};

export default ProductDetail;
