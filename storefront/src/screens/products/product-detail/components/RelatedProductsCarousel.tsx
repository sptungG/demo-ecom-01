import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/ui/components/ProductCard";
import type { ProductListItemFragment } from "@/gql/graphql";

interface RelatedProductsCarouselProps {
	products: ProductListItemFragment[];
	title?: string;
}

const RelatedProductsCarousel: React.FC<RelatedProductsCarouselProps> = ({
	products = [],
	title = "Sản phẩm liên quan",
}) => {
	const handleAddToCart = (productId: string) => {
		console.log("Add to cart:", productId);
		// Implement add to cart logic here
	};

	if (!products || products.length === 0) {
		return null;
	}

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-900">{title}</h2>
			</div>

			{/* Carousel */}
			<Carousel
				opts={{
					align: "start",
					loop: true,
					slidesToScroll: 4, // Cuộn 4 sản phẩm mỗi lần
					containScroll: "trimSnaps", // Giữ snap points
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-2 md:-ml-4">
					{products?.map((product) => (
						<CarouselItem
							key={product.id}
							className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-[22.22%]"
						>
							<div className="p-1">
								<ProductCard product={product} onAddToCart={handleAddToCart} loading="lazy" />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="-left-4" />
				<CarouselNext className="-right-4" />
			</Carousel>
		</div>
	);
};

export default RelatedProductsCarousel;
