import React from "react";

interface ProductCardSkeletonProps {
	viewMode?: "grid" | "list";
}

const ProductCardSkeleton = ({ viewMode = "grid" }: ProductCardSkeletonProps) => {
	if (viewMode === "list") {
		return (
			<div className="animate-pulse rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<div className="flex gap-4">
					{/* Image */}
					<div className="h-24 w-24 flex-shrink-0 rounded-lg bg-gray-200"></div>

					{/* Content */}
					<div className="flex-1 space-y-3">
						{/* Category */}
						<div className="h-3 w-16 rounded bg-gray-200"></div>

						{/* Product Name */}
						<div className="space-y-2">
							<div className="h-4 w-3/4 rounded bg-gray-200"></div>
							<div className="h-4 w-1/2 rounded bg-gray-200"></div>
						</div>

						{/* Rating */}
						<div className="flex items-center gap-1">
							<div className="flex gap-1">
								{[...Array(5)].map((_, i) => (
									<div key={i} className="h-3 w-3 rounded bg-gray-200"></div>
								))}
							</div>
							<div className="ml-1 h-3 w-8 rounded bg-gray-200"></div>
						</div>

						{/* Price and Button */}
						<div className="flex items-center justify-between">
							<div className="h-5 w-20 rounded bg-gray-200"></div>
							<div className="h-7 w-16 rounded bg-gray-200"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
			{/* Product Image */}
			<div className="relative">
				<div className="aspect-square bg-gray-200"></div>

				{/* Wishlist Button Skeleton */}
				<div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-gray-300"></div>

				{/* Sale Badge Skeleton */}
				<div className="absolute left-3 top-3 h-5 w-10 rounded-md bg-gray-300"></div>
			</div>

			{/* Product Info */}
			<div className="space-y-3 p-4">
				{/* Category */}
				<div className="h-3 w-16 rounded bg-gray-200"></div>

				{/* Product Name */}
				<div className="space-y-2">
					<div className="h-4 w-full rounded bg-gray-200"></div>
					<div className="h-4 w-3/4 rounded bg-gray-200"></div>
				</div>

				{/* Rating */}
				<div className="flex items-center gap-1">
					<div className="flex gap-1">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="h-3 w-3 rounded bg-gray-200"></div>
						))}
					</div>
					<div className="ml-1 h-3 w-8 rounded bg-gray-200"></div>
				</div>

				{/* Price and Button */}
				<div className="flex items-center justify-between">
					<div className="h-5 w-20 rounded bg-gray-200"></div>
					<div className="hidden h-7 w-16 rounded bg-gray-200 sm:block"></div>
				</div>
			</div>
		</div>
	);
};
ProductCardSkeleton.name = "ProductCardSkeleton";
export default ProductCardSkeleton;
