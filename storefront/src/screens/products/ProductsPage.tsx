"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ProductCard } from "@/ui/components/ProductCard";
import { ProductFilter, FilterState } from "@/ui/components/ProductFilter";
import FashionHeroSection from "@/ui/components/FashionHeroSection";

import { type ProductListItemFragment } from "@/gql/graphql";
import { Loader2, Grid, List } from "lucide-react";
import { useProductsSearchParams } from "@/hooks/useProductsSearchParams";
import ProductCardSkeleton from "@/ui/components/ProductCardSkeleton";

interface ProductsPageProps {
	channel: string;
	initialProducts?: ProductListItemFragment[];
	initialCursor?: string | null;
	initialHasNextPage?: boolean;
	initialTotalCount?: number;
	loading?: boolean;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
	channel = "",
	initialProducts = [],
	initialCursor = null,
	initialHasNextPage = false,
	initialTotalCount = 0,
	loading: serverLoading = false,
}) => {
	const {
		currentFilters,
		currentPage,
		cursor,
		updateFilters,
		updatePagination,
		loadMore: loadMoreUrl,
	} = useProductsSearchParams();

	const [products, setProducts] = useState<ProductListItemFragment[]>(initialProducts);
	const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
	const [totalCount, setTotalCount] = useState(initialTotalCount);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isFilterLoading, setIsFilterLoading] = useState(false);

	// Update state when props change (from server)
	useEffect(() => {
		setProducts(initialProducts);
		setHasNextPage(initialHasNextPage);
		setTotalCount(initialTotalCount);
		// Tắt loading khi có dữ liệu mới
		setIsFilterLoading(false);
	}, [initialProducts, initialHasNextPage, initialTotalCount]);

	// Mock data for filters - in real app, fetch from API
	const filterData = useMemo(
		() => ({
			categories: [
				{ id: "electronics", label: "Điện tử", count: 150 },
				{ id: "clothing", label: "Thời trang", count: 200 },
				{ id: "books", label: "Sách", count: 80 },
				{ id: "home", label: "Nhà cửa", count: 120 },
			],
			priceRanges: [
				{ id: "under-100", label: "Dưới 100.000đ" },
				{ id: "100-500", label: "100.000đ - 500.000đ" },
				{ id: "500-1000", label: "500.000đ - 1.000.000đ" },
				{ id: "over-1000", label: "Trên 1.000.000đ" },
			],
			sortOptions: [
				{ id: "NAME", label: "Tên A-Z" },
				{ id: "PRICE", label: "Giá thấp đến cao" },
				{ id: "-PRICE", label: "Giá cao đến thấp" },
				{ id: "CREATED_AT", label: "Mới nhất" },
			],
		}),
		[],
	);

	const handleFilterChange = useCallback(
		(filters: FilterState) => {
			// Bật loading khi filter thay đổi
			setIsFilterLoading(true);
			updateFilters(filters);
		},
		[updateFilters],
	);

	const handleSearch = useCallback(
		(query: string) => {
			// Bật loading khi search
			setIsFilterLoading(true);
			const newFilters = { ...currentFilters, search: query };
			updateFilters(newFilters);
		},
		[currentFilters, updateFilters],
	);

	const handleAddToCart = useCallback(async (productId: string) => {
		console.log("Adding to cart:", productId);
		// Implement cart logic here
	}, []);

	const handleLoadMore = useCallback(() => {
		if (hasNextPage && !serverLoading && !isLoadingMore && initialCursor) {
			setIsLoadingMore(true);
			loadMoreUrl(initialCursor);
		}
	}, [hasNextPage, serverLoading, isLoadingMore, initialCursor, loadMoreUrl]);

	// Reset loading more state when new data arrives
	useEffect(() => {
		setIsLoadingMore(false);
	}, [initialProducts]);

	// Render skeleton items
	const renderSkeletonItems = () => {
		return Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<FashionHeroSection />

			{/* Main Products Section */}
			<div className="">
				<div className="mx-auto max-w-7xl">
					<div className="lg:grid lg:grid-cols-4 lg:gap-8">
						{/* Sidebar Filter */}
						<div className="lg:col-span-1">
							<div className="sticky top-20">
								<ProductFilter
									categories={filterData.categories}
									priceRanges={filterData.priceRanges}
									sortOptions={filterData.sortOptions}
									onFilterChange={handleFilterChange}
									onSearch={handleSearch}
								/>
							</div>
						</div>

						{/* Main Content */}
						<div className="lg:col-span-3">
							{/* Header with view mode toggle */}
							<div className="mb-6 flex items-center justify-between rounded-t-lg bg-white p-4">
								<div className="flex items-center gap-4">
									<span className="text-sm text-gray-600">
										Hiển thị {isFilterLoading ? "..." : products.length} /{" "}
										{isFilterLoading ? "..." : totalCount} sản phẩm
									</span>
									{(serverLoading || isFilterLoading) && (
										<div className="flex items-center gap-2">
											<Loader2 className="h-4 w-4 animate-spin text-gray-400" />
											<span className="text-sm text-gray-500">Đang tải...</span>
										</div>
									)}
								</div>

								<div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
									<button
										onClick={() => setViewMode("grid")}
										className={`rounded-md p-2 transition-colors ${
											viewMode === "grid"
												? "bg-white text-gray-900 shadow-sm"
												: "text-gray-500 hover:text-gray-700"
										}`}
									>
										<Grid className="h-4 w-4" />
									</button>
									<button
										onClick={() => setViewMode("list")}
										className={`rounded-md p-2 transition-colors ${
											viewMode === "list"
												? "bg-white text-gray-900 shadow-sm"
												: "text-gray-500 hover:text-gray-700"
										}`}
									>
										<List className="h-4 w-4" />
									</button>
								</div>
							</div>

							{/* Products Grid */}
							<div className="rounded-b-lg bg-white p-6">
								{/* Hiển thị skeleton khi đang loading filter hoặc server loading và không có sản phẩm */}
								{isFilterLoading || (serverLoading && products.length === 0) ? (
									<div
										className={`${
											viewMode === "grid"
												? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
												: "space-y-4"
										}`}
									>
										{renderSkeletonItems()}
									</div>
								) : (
									<>
										<div
											className={`${
												viewMode === "grid"
													? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
													: "space-y-4"
											}`}
										>
											{products.map((product, index) => (
												<ProductCard
													key={product.id}
													product={product}
													loading={index < 6 ? "eager" : "lazy"}
													priority={index < 2}
													onAddToCart={handleAddToCart}
												/>
											))}
										</div>
										{hasNextPage && (
											<div className="mt-8 flex justify-center">
												<button
													onClick={handleLoadMore}
													disabled={serverLoading || isLoadingMore}
													className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
												>
													{(serverLoading || isLoadingMore) && <Loader2 className="h-4 w-4 animate-spin" />}
													{serverLoading || isLoadingMore ? "Đang tải..." : "Xem thêm sản phẩm"}
												</button>
											</div>
										)}

										{products.length === 0 && !serverLoading && !isFilterLoading && (
											<div className="py-12 text-center">
												<p className="text-lg text-gray-500">Không tìm thấy sản phẩm nào</p>
												<p className="mt-2 text-gray-400">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
											</div>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;
