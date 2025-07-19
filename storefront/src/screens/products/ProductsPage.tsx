"use client";
import React, { useState, useEffect } from "react";
import { ProductCard } from "@/ui/components/ProductCard";
import { ProductFilter, FilterState } from "@/ui/components/ProductFilter";
import { Pagination } from "@/ui/components/Pagination";
import { executeGraphQL } from "@/lib/graphql";
import {
	ProductListPaginatedDocument,
	SearchProductsDocument,
	CategoryListDocument,
	type ProductListItemFragment,
	OrderDirection,
} from "@/gql/graphql";
import { Loader2, Grid, List } from "lucide-react";

interface ProductsPageProps {
	channel: string;
	initialProducts?: ProductListItemFragment[];
	initialCursor?: string | null;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
	channel,
	initialProducts = [],
	initialCursor = null,
}) => {
	const [products, setProducts] = useState<ProductListItemFragment[]>(initialProducts);
	const [loading, setLoading] = useState(false);
	const [cursor, setCursor] = useState<string | null>(initialCursor);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [currentFilters, setCurrentFilters] = useState<FilterState>({
		search: "",
		categories: [],
		priceRange: "",
		sortBy: "NAME",
	});

	// Mock data for filters - in real app, fetch from API
	const filterData = {
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
	};

	const fetchProducts = async (filters: FilterState, loadMore = false) => {
		setLoading(true);
		try {
			let result;

			if (filters.search) {
				// Use search query when there's a search term
				result = await executeGraphQL(SearchProductsDocument, {
					variables: {
						search: filters.search,
						sortBy: filters.sortBy as any,
						sortDirection: filters.sortBy.startsWith("-")
							? ("DESC" as OrderDirection)
							: ("ASC" as OrderDirection),
						first: 12,
						after: loadMore ? cursor : null,
						channel,
					},
				});
			} else {
				// Use regular product list query
				result = await executeGraphQL(ProductListPaginatedDocument, {
					variables: {
						first: 12,
						after: loadMore ? cursor : null,
						channel,
					},
				});
			}

			if (result.products) {
				const newProducts = result.products.edges.map((edge: any) => edge.node);

				if (loadMore) {
					setProducts((prev) => [...prev, ...newProducts]);
				} else {
					setProducts(newProducts);
				}

				setCursor(result.products.pageInfo.endCursor as any);
				setHasNextPage(result.products.pageInfo.hasNextPage);
				setTotalCount(result.products.totalCount || 0);
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleFilterChange = (filters: FilterState) => {
		setCurrentFilters(filters);
		setCursor(null);
		fetchProducts(filters, false);
	};

	const handleSearch = (query: string) => {
		const newFilters = { ...currentFilters, search: query };
		setCurrentFilters(newFilters);
		setCursor(null);
		fetchProducts(newFilters, false);
	};

	const handleAddToCart = async (productId: string) => {
		// Implement add to cart logic here
		console.log("Adding to cart:", productId);
		// You can integrate with your cart context/state management
	};

	const loadMore = () => {
		if (hasNextPage && !loading) {
			fetchProducts(currentFilters, true);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-4">
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
						{/* Header */}
						<div className="border-b border-gray-200 bg-white p-6">
							<div className="mb-4 flex items-center justify-between">
								<div>
									<h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>
									<p className="mt-1 text-gray-600">{loading ? "Đang tải..." : `${totalCount} sản phẩm`}</p>
								</div>

								{/* View Mode Toggle */}
								<div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
									<button
										onClick={() => setViewMode("grid")}
										className={`rounded-md p-2 transition-colors ${
											viewMode === "grid"
												? "bg-white text-gray-900 shadow-sm"
												: "text-gray-600 hover:text-gray-900"
										}`}
									>
										<Grid className="h-4 w-4" />
									</button>
									<button
										onClick={() => setViewMode("list")}
										className={`rounded-md p-2 transition-colors ${
											viewMode === "list"
												? "bg-white text-gray-900 shadow-sm"
												: "text-gray-600 hover:text-gray-900"
										}`}
									>
										<List className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>

						{/* Products Grid */}
						<div className="p-6">
							{loading && products.length === 0 ? (
								<div className="flex items-center justify-center py-12">
									<Loader2 className="h-8 w-8 animate-spin text-gray-400" />
								</div>
							) : (
								<>
									<div
										className={`${
											viewMode === "grid"
												? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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

									{/* Load More Button */}
									{hasNextPage && (
										<div className="mt-8 flex justify-center">
											<button
												onClick={loadMore}
												disabled={loading}
												className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
											>
												{loading && <Loader2 className="h-4 w-4 animate-spin" />}
												{loading ? "Đang tải..." : "Xem thêm sản phẩm"}
											</button>
										</div>
									)}

									{products.length === 0 && !loading && (
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
	);
};

export default ProductsPage;
