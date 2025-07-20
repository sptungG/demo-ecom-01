"use client";
import React, { useState } from "react";
import { ProductDetailsQuery } from "@/gql/graphql";
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react";
import ProductDetailTabs from "./components/ProductDetailTabs";
import RelatedProductsCarousel from "./components/RelatedProductsCarousel";
import type { ProductListItemFragment } from "@/gql/graphql";

interface ProductDetailProps {
	product: ProductDetailsQuery["product"];
}
// Mock data cho sản phẩm liên quan
const mockRelatedProducts: ProductListItemFragment[] = [
	{
		id: "1",
		name: "Sản phẩm liên quan 1",
		slug: "san-pham-lien-quan-1",
		thumbnail: {
			url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
			alt: "Sản phẩm liên quan 1",
		},
		category: {
			id: "cat1",
			name: "Danh mục 1",
		},
		pricing: {
			priceRange: {
				start: {
					gross: {
						amount: 299000,
						currency: "VND",
					},
				},
			},
		},
	},
	{
		id: "2",
		name: "Sản phẩm liên quan 2",
		slug: "san-pham-lien-quan-2",
		thumbnail: {
			url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
			alt: "Sản phẩm liên quan 2",
		},
		category: {
			id: "cat2",
			name: "Danh mục 2",
		},
		pricing: {
			priceRange: {
				start: {
					gross: {
						amount: 459000,
						currency: "VND",
					},
				},
			},
		},
	},
	{
		id: "3",
		name: "Sản phẩm liên quan 3",
		slug: "san-pham-lien-quan-3",
		thumbnail: {
			url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
			alt: "Sản phẩm liên quan 3",
		},
		category: {
			id: "cat3",
			name: "Danh mục 3",
		},
		pricing: {
			priceRange: {
				start: {
					gross: {
						amount: 199000,
						currency: "VND",
					},
				},
			},
		},
	},
	{
		id: "4",
		name: "Sản phẩm liên quan 4",
		slug: "san-pham-lien-quan-4",
		thumbnail: {
			url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
			alt: "Sản phẩm liên quan 4",
		},
		category: {
			id: "cat4",
			name: "Danh mục 4",
		},
		pricing: {
			priceRange: {
				start: {
					gross: {
						amount: 599000,
						currency: "VND",
					},
				},
			},
		},
	},
	{
		id: "5",
		name: "Sản phẩm liên quan 5",
		slug: "san-pham-lien-quan-5",
		thumbnail: {
			url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
			alt: "Sản phẩm liên quan 5",
		},
		category: {
			id: "cat5",
			name: "Danh mục 5",
		},
		pricing: {
			priceRange: {
				start: {
					gross: {
						amount: 399000,
						currency: "VND",
					},
				},
			},
		},
	},
];

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
	const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
	const [quantity, setQuantity] = useState(1);
	const [isFavorite, setIsFavorite] = useState(false);

	if (!product) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="mb-2 text-2xl font-semibold text-gray-900">Sản phẩm không tồn tại</h2>
					<p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không được tìm thấy.</p>
				</div>
			</div>
		);
	}

	const currentPrice = selectedVariant?.pricing?.price?.gross || product.pricing?.priceRange?.start?.gross;
	const originalPrice = product.pricing?.priceRange?.stop?.gross;
	const hasDiscount = originalPrice && currentPrice && originalPrice.amount > currentPrice.amount;

	const handleQuantityChange = (change: number) => {
		const newQuantity = quantity + change;
		if (newQuantity >= 1 && newQuantity <= (selectedVariant?.quantityAvailable || 99)) {
			setQuantity(newQuantity);
		}
	};

	const handleAddToCart = () => {
		console.log("Add to cart:", {
			product: product.id,
			variant: selectedVariant?.id,
			quantity,
		});
	};

	const handleBuyNow = () => {
		console.log("Buy now:", {
			product: product.id,
			variant: selectedVariant?.id,
			quantity,
		});
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				{/* Product Images */}
				<div className="space-y-4">
					<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
						{product.thumbnail ? (
							<img
								src={product.thumbnail.url}
								alt={product.thumbnail.alt || product.name}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-gray-400">
								<span className="text-lg">Không có hình ảnh</span>
							</div>
						)}
					</div>

					{/* Thumbnail Gallery */}
					<div className="grid grid-cols-4 gap-2">
						{[1, 2, 3, 4].map((index) => (
							<div
								key={index}
								className="aspect-square cursor-pointer overflow-hidden rounded-md bg-gray-100 transition-opacity hover:opacity-75"
							>
								{product.thumbnail ? (
									<img
										src={product.thumbnail.url}
										alt={`${product.name} ${index}`}
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="h-full w-full bg-gray-200"></div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Product Info */}
				<div className="space-y-6">
					{/* Breadcrumb */}
					<nav className="text-sm text-gray-500">
						<span>Trang chủ</span>
						<span className="mx-2">/</span>
						<span>Sản phẩm</span>
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
								<span className="ml-2 text-sm text-gray-600">(4.0) • 128 đánh giá</span>
							</div>
							<span className="text-sm text-gray-500">SKU: {product.id.slice(-8)}</span>
						</div>
					</div>

					{/* Price */}
					<div className="space-y-2">
						<div className="flex items-center space-x-3">
							{currentPrice && (
								<span className="text-3xl font-bold text-red-600">
									{currentPrice.amount.toLocaleString("vi-VN")} {currentPrice.currency}
								</span>
							)}
							{hasDiscount && originalPrice && (
								<span className="text-xl text-gray-500 line-through">
									{originalPrice.amount.toLocaleString("vi-VN")} {originalPrice.currency}
								</span>
							)}
							{hasDiscount && (
								<span className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
									-
									{Math.round(((originalPrice!.amount - currentPrice!.amount) / originalPrice!.amount) * 100)}
									%
								</span>
							)}
						</div>
						<p className="text-sm text-gray-600">Giá đã bao gồm VAT</p>
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
								? `Còn hàng (${selectedVariant?.quantityAvailable} sản phẩm)`
								: "Hết hàng"}
						</span>
					</div>

					{/* Variants */}
					{product.variants && product.variants.length > 1 && (
						<div className="space-y-3">
							<h3 className="text-sm font-medium text-gray-900">Phiên bản:</h3>
							<div className="grid grid-cols-2 gap-2">
								{product.variants.map((variant) => (
									<button
										key={variant.id}
										onClick={() => setSelectedVariant(variant)}
										className={`rounded-lg border p-3 text-left transition-colors ${
											selectedVariant?.id === variant.id
												? "border-blue-500 bg-blue-50 text-blue-700"
												: "border-gray-300 hover:border-gray-400"
										}`}
									>
										<div className="font-medium">{variant.name}</div>
										{variant.pricing?.price?.gross && (
											<div className="text-sm text-gray-600">
												{variant.pricing.price.gross.amount.toLocaleString("vi-VN")}{" "}
												{variant.pricing.price.gross.currency}
											</div>
										)}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Quantity */}
					<div className="space-y-3">
						<h3 className="text-sm font-medium text-gray-900">Số lượng:</h3>
						<div className="flex items-center space-x-3">
							<div className="flex items-center rounded-lg border border-gray-300">
								<button
									onClick={() => handleQuantityChange(-1)}
									disabled={quantity <= 1}
									className="p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
								>
									<Minus className="h-4 w-4" />
								</button>
								<span className="min-w-[60px] px-4 py-2 text-center">{quantity}</span>
								<button
									onClick={() => handleQuantityChange(1)}
									disabled={quantity >= (selectedVariant?.quantityAvailable || 99)}
									className="p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
								>
									<Plus className="h-4 w-4" />
								</button>
							</div>
							<span className="text-sm text-gray-600">
								{selectedVariant?.quantityAvailable || 0} sản phẩm có sẵn
							</span>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="space-y-3">
						<div className="flex space-x-3">
							<button
								onClick={handleAddToCart}
								disabled={(selectedVariant?.quantityAvailable || 0) === 0}
								className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
							>
								<ShoppingCart className="h-5 w-5" />
								<span>Thêm vào giỏ hàng</span>
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
							disabled={(selectedVariant?.quantityAvailable || 0) === 0}
							className="w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
						>
							Mua ngay
						</button>
					</div>

					{/* Features */}
					<div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
						<div className="flex items-center space-x-3">
							<Truck className="h-6 w-6 text-blue-600" />
							<div>
								<div className="text-sm font-medium">Miễn phí vận chuyển</div>
								<div className="text-xs text-gray-600">Đơn hàng từ 500k</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Shield className="h-6 w-6 text-green-600" />
							<div>
								<div className="text-sm font-medium">Bảo hành 12 tháng</div>
								<div className="text-xs text-gray-600">Chính hãng 100%</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<RotateCcw className="h-6 w-6 text-orange-600" />
							<div>
								<div className="text-sm font-medium">Đổi trả 30 ngày</div>
								<div className="text-xs text-gray-600">Miễn phí đổi trả</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Product Detail Tabs */}
			<ProductDetailTabs product={product} selectedVariant={selectedVariant as any} />

			{/* Related Products Carousel */}
			<div className="mt-4 border-t border-gray-200 pt-4">
				<RelatedProductsCarousel products={mockRelatedProducts} title="Sản phẩm liên quan" />
			</div>
		</div>
	);
};

export default ProductDetail;
