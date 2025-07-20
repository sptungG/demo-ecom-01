import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Search, SlidersHorizontal } from "lucide-react";
import { ProductFilterInput, StockAvailability } from "@/gql/graphql";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterOption {
	id: string;
	label: string;
	count?: number;
}

interface ProductFilterProps {
	categories: FilterOption[];
	priceRanges: FilterOption[];
	sortOptions: FilterOption[];
	initialFilters?: FilterState;
	onFilterChange: (filters: FilterState) => void;
	onSearch: (query: string) => void;
}

// Chỉ sử dụng các trường cần thiết từ ProductFilterInput
export type FilterState = {
	search?: string;
	categories?: string[];
	price?: {
		gte?: number;
		lte?: number;
	};
	stockAvailability?: StockAvailability;
	sortBy?: string;
	priceRange?: string; // For UI convenience
};

export function ProductFilter({
	categories,
	priceRanges,
	sortOptions,
	initialFilters = {},
	onFilterChange,
	onSearch,
}: ProductFilterProps) {
	// Khởi tạo filters từ initialFilters hoặc giá trị mặc định
	const [filters, setFilters] = useState<FilterState>({
		search: initialFilters.search || "",
		categories: initialFilters.categories || [],
		sortBy: initialFilters.sortBy || "NAME",
		stockAvailability: initialFilters.stockAvailability,
		priceRange: initialFilters.priceRange,
		price: initialFilters.price,
	});
	const debounceFilter = useDebounce(filters, 1000);
	const firstRender = useRef(true);

	// Cập nhật filters khi initialFilters thay đổi
	useEffect(() => {
		if (initialFilters && Object.keys(initialFilters).length > 0) {
			setFilters({
				search: initialFilters.search || "",
				categories: initialFilters.categories || [],
				sortBy: initialFilters.sortBy || "NAME",
				stockAvailability: initialFilters.stockAvailability,
				priceRange: initialFilters.priceRange,
				price: initialFilters.price,
			});
			firstRender.current = false;
		}
	}, []);
	useEffect(() => {
		if (!firstRender.current && JSON.stringify(initialFilters) !== JSON.stringify(debounceFilter)) {
			onFilterChange(debounceFilter);
		}
	}, [debounceFilter, initialFilters]);

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({
		categories: true,
		price: false,
		sort: false,
		stockAvailability: false,
	});

	const toggleSection = (section: string) => {
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const updateFilters = (newFilters: Partial<FilterState>) => {
		const updatedFilters = { ...filters, ...newFilters };
		setFilters(updatedFilters);
	};

	const handleSearch = (query: string) => {
		updateFilters({ search: query });
		onSearch(query);
	};

	const toggleDropdown = (section: string) => {
		setOpenDropdowns((prev) => ({
			...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
			[section]: !prev[section],
		}));
	};

	const clearFilters = () => {
		const clearedFilters = {
			search: "",
			categories: [],
			sortBy: "NAME",
			stockAvailability: undefined,
		};
		setFilters(clearedFilters);
	};

	const activeFiltersCount =
		(filters.categories?.length ?? 0) + (filters.priceRange ? 1 : 0) + (filters.stockAvailability ? 1 : 0);

	const selectedPriceRange = priceRanges.find((range) => range.id === filters.priceRange);
	const selectedSort = sortOptions.find((sort) => sort.id === filters.sortBy);

	// Stock availability options
	const stockOptions = [
		{ id: StockAvailability.InStock, label: "Còn hàng" },
		{ id: StockAvailability.OutOfStock, label: "Hết hàng" },
	];
	const selectedStock = stockOptions.find((stock) => stock.id === filters.stockAvailability);

	return (
		<div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
			{/* Mobile Filter Toggle */}
			<div className="border-b border-gray-200 p-4 lg:hidden">
				<button
					onClick={() => setIsFilterOpen(!isFilterOpen)}
					className="flex items-center gap-2 font-medium text-gray-700 transition-colors hover:text-gray-900"
				>
					<SlidersHorizontal className="h-4 w-4" />
					Bộ lọc
					{activeFiltersCount > 0 && (
						<span className="min-w-[20px] rounded-full bg-blue-500 px-2 py-1 text-center text-xs text-white">
							{activeFiltersCount}
						</span>
					)}
				</button>
			</div>

			{/* Desktop Horizontal Layout */}
			<div className="hidden lg:block">
				<div className="px-6 py-4">
					<div className="flex flex-wrap items-center gap-6">
						{/* Search Bar */}
						<div className="relative min-w-[250px] max-w-md flex-1">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
							<input
								type="text"
								placeholder="Tìm kiếm sản phẩm..."
								value={filters.search}
								onChange={(e) => handleSearch(e.target.value)}
								className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						{/* Sort Dropdown */}
						<div className="relative">
							<button
								onClick={() => toggleDropdown("sort")}
								className="flex min-w-[140px] items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition-colors hover:border-gray-400"
							>
								<span className="text-sm font-medium text-gray-700">{selectedSort?.label || "Sắp xếp"}</span>
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform ${
										openDropdowns.sort ? "rotate-180" : ""
									}`}
								/>
							</button>
							{openDropdowns.sort && (
								<div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
									<div className="py-1">
										{sortOptions.map((option) => (
											<button
												key={option.id}
												onClick={() => {
													updateFilters({ sortBy: option.id });
													setOpenDropdowns({});
												}}
												className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
													filters.sortBy === option.id
														? "bg-blue-50 font-medium text-blue-700"
														: "text-gray-700"
												}`}
											>
												{option.label}
											</button>
										))}
									</div>
								</div>
							)}
						</div>
						{/* Categories Dropdown */}
						{/* <div className="relative">
							<button
								onClick={() => toggleDropdown("categories")}
								className="flex min-w-[140px] items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition-colors hover:border-gray-400"
							>
								<span className="truncate text-sm font-medium text-gray-700">
									{filters.categories?.length && filters.categories.length > 0
										? `Danh mục (${filters.categories.length})`
										: "Danh mục"}
								</span>
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform ${
										openDropdowns.categories ? "rotate-180" : ""
									}`}
								/>
							</button>
							{openDropdowns.categories && (
								<div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
									<div className="max-h-64 overflow-y-auto py-2">
										{categories.map((category) => (
											<label
												key={category.id}
												className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-50"
											>
												<input
													type="checkbox"
													value={category.id}
													checked={filters.categories?.includes(category.id)}
													onChange={(e) => {
														const newCategories = e.target.checked
															? [...(filters.categories ?? []), category.id]
															: filters.categories?.filter((id) => id !== category.id);
														updateFilters({ categories: newCategories });
													}}
													className="rounded text-blue-600 focus:ring-blue-500"
												/>
												<span className="flex-1 text-sm text-gray-700">{category.label}</span>
												{category.count && (
													<span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
														{category.count}
													</span>
												)}
											</label>
										))}
									</div>
								</div>
							)}
						</div> */}
						{/* Price Range Input Fields */}
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
								<span className="text-sm font-medium text-gray-700">Giá:</span>
								<input
									type="number"
									placeholder="From"
									value={filters.price?.gte || ""}
									onChange={(e) => {
										const value = e.target.value ? Number(e.target.value) : undefined;
										updateFilters({
											price: { ...filters.price, gte: value },
											priceRange: "", // Clear preset range when custom input is used
										});
									}}
									className="w-20 border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
									min="0"
								/>
								<span className="text-gray-400">-</span>
								<input
									type="number"
									placeholder="To"
									value={filters.price?.lte || ""}
									onChange={(e) => {
										const value = e.target.value ? Number(e.target.value) : undefined;
										updateFilters({
											price: { ...filters.price, lte: value },
											priceRange: "", // Clear preset range when custom input is used
										});
									}}
									className="w-20 border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
									min="0"
								/>
								<span className="text-sm text-gray-500">₫</span>
							</div>
						</div>
						{(filters.price?.gte || filters.price?.lte) && (
							<span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
								{filters.price?.gte ? `${filters.price.gte.toLocaleString()}` : "0"} -{" "}
								{filters.price?.lte ? `${filters.price.lte.toLocaleString()}` : "∞"}
								<button
									onClick={() => updateFilters({ price: undefined })}
									className="rounded-full p-0.5 hover:bg-purple-200"
								>
									<X className="h-3 w-3" />
								</button>
							</span>
						)}
						{/* Stock Availability Dropdown */}
						<div className="relative">
							<button
								onClick={() => toggleDropdown("stock")}
								className="flex min-w-[140px] items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition-colors hover:border-gray-400"
							>
								<span className="truncate text-sm font-medium text-gray-700">
									{selectedStock?.label || "Tình trạng"}
								</span>
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform ${
										openDropdowns.stock ? "rotate-180" : ""
									}`}
								/>
							</button>
							{openDropdowns.stock && (
								<div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
									<div className="py-1">
										<button
											onClick={() => {
												updateFilters({ stockAvailability: undefined });
												setOpenDropdowns({});
											}}
											className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
												!filters.stockAvailability ? "bg-blue-50 font-medium text-blue-700" : "text-gray-700"
											}`}
										>
											Tất cả
										</button>
										{stockOptions.map((option) => (
											<button
												key={option.id}
												onClick={() => {
													updateFilters({ stockAvailability: option.id });
													setOpenDropdowns({});
												}}
												className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
													filters.stockAvailability === option.id
														? "bg-blue-50 font-medium text-blue-700"
														: "text-gray-700"
												}`}
											>
												{option.label}
											</button>
										))}
									</div>
								</div>
							)}
						</div>
						{/* Clear Filters */}
						{activeFiltersCount > 0 && (
							<button
								onClick={clearFilters}
								className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
							>
								<X className="h-4 w-4" />
								Xóa bộ lọc
							</button>
						)}
					</div>

					{/* Active Filters Tags */}
					{((filters.categories?.length && filters.categories.length > 0) ||
						filters.priceRange ||
						filters.search ||
						filters.stockAvailability) && (
						<div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
							<span className="text-sm font-medium text-gray-500">Đang lọc:</span>

							{filters.search && (
								<span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
									\"{filters.search}\"
									<button onClick={() => handleSearch("")} className="rounded-full p-0.5 hover:bg-blue-200">
										<X className="h-3 w-3" />
									</button>
								</span>
							)}

							{filters.categories?.map((categoryId) => {
								const category = categories.find((cat) => cat.id === categoryId);
								return category ? (
									<span
										key={categoryId}
										className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
									>
										{category.label}
										<button
											onClick={() => {
												const newCategories = filters.categories?.filter((id) => id !== categoryId);
												updateFilters({ categories: newCategories });
											}}
											className="rounded-full p-0.5 hover:bg-green-200"
										>
											<X className="h-3 w-3" />
										</button>
									</span>
								) : null;
							})}

							{selectedPriceRange && (
								<span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
									{selectedPriceRange.label}
									<button
										onClick={() => updateFilters({ priceRange: "" })}
										className="rounded-full p-0.5 hover:bg-purple-200"
									>
										<X className="h-3 w-3" />
									</button>
								</span>
							)}

							{selectedStock && (
								<span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
									{selectedStock.label}
									<button
										onClick={() => updateFilters({ stockAvailability: undefined })}
										className="rounded-full p-0.5 hover:bg-orange-200"
									>
										<X className="h-3 w-3" />
									</button>
								</span>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Mobile Filter Content */}
			<div className={`${isFilterOpen ? "block" : "hidden"} lg:hidden`}>
				<div className="border-b border-gray-200 p-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
						<input
							type="text"
							placeholder="Tìm kiếm sản phẩm..."
							value={filters.search}
							onChange={(e) => handleSearch(e.target.value)}
							className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div className="space-y-6 p-4">
					{/* Clear Filters */}
					{activeFiltersCount > 0 && (
						<button
							onClick={clearFilters}
							className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
						>
							<X className="h-4 w-4" />
							Xóa bộ lọc ({activeFiltersCount})
						</button>
					)}

					{/* Sort */}
					<div>
						<button
							onClick={() => toggleSection("sort")}
							className="mb-3 flex w-full items-center justify-between text-left font-medium text-gray-900"
						>
							Sắp xếp
							<ChevronDown
								className={`h-4 w-4 transition-transform ${openSections.sort ? "rotate-180" : ""}`}
							/>
						</button>
						{openSections.sort && (
							<div className="space-y-2">
								{sortOptions.map((option) => (
									<label key={option.id} className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="sort"
											value={option.id}
											checked={filters.sortBy === option.id}
											onChange={(e) => updateFilters({ sortBy: e.target.value })}
											className="text-blue-600 focus:ring-blue-500"
										/>
										<span className="text-sm text-gray-700">{option.label}</span>
									</label>
								))}
							</div>
						)}
					</div>

					{/* Categories */}
					<div>
						<button
							onClick={() => toggleSection("categories")}
							className="mb-3 flex w-full items-center justify-between text-left font-medium text-gray-900"
						>
							Danh mục
							<ChevronDown
								className={`h-4 w-4 transition-transform ${openSections.categories ? "rotate-180" : ""}`}
							/>
						</button>
						{openSections.categories && (
							<div className="max-h-48 space-y-2 overflow-y-auto">
								{categories.map((category) => (
									<label key={category.id} className="flex cursor-pointer items-center gap-2">
										<input
											type="checkbox"
											value={category.id}
											checked={filters.categories?.includes(category.id)}
											onChange={(e) => {
												const newCategories = e.target.checked
													? [...(filters.categories ?? []), category.id]
													: filters.categories?.filter((id) => id !== category.id);
												updateFilters({ categories: newCategories });
											}}
											className="text-blue-600 focus:ring-blue-500"
										/>
										<span className="text-sm text-gray-700">{category.label}</span>
										{category.count && <span className="text-xs text-gray-500">({category.count})</span>}
									</label>
								))}
							</div>
						)}
					</div>

					{/* Price Range Input Fields */}
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
							<span className="text-sm font-medium text-gray-700">Giá:</span>
							<input
								type="number"
								placeholder="Từ"
								value={filters.price?.gte || ""}
								onChange={(e) => {
									const value = e.target.value ? Number(e.target.value) : undefined;
									updateFilters({
										price: { ...filters.price, gte: value },
										priceRange: "", // Clear preset range when custom input is used
									});
								}}
								className="w-20 border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
								min="0"
							/>
							<span className="text-gray-400">-</span>
							<input
								type="number"
								placeholder="Đến"
								value={filters.price?.lte || ""}
								onChange={(e) => {
									const value = e.target.value ? Number(e.target.value) : undefined;
									updateFilters({
										price: { ...filters.price, lte: value },
										priceRange: "", // Clear preset range when custom input is used
									});
								}}
								className="w-20 border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
								min="0"
							/>
							<span className="text-sm text-gray-500">₫</span>
						</div>
					</div>

					{/* Price Range */}
					<div>
						<button
							onClick={() => toggleSection("price")}
							className="mb-3 flex w-full items-center justify-between text-left font-medium text-gray-900"
						>
							Khoảng giá
							<ChevronDown
								className={`h-4 w-4 transition-transform ${openSections.price ? "rotate-180" : ""}`}
							/>
						</button>
						{openSections.price && (
							<div className="space-y-3">
								{/* Custom Price Input */}
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">Nhập khoảng giá tùy chỉnh:</label>
									<div className="flex items-center gap-2">
										<input
											type="number"
											placeholder="Từ"
											value={filters.price?.gte || ""}
											onChange={(e) => {
												const value = e.target.value ? Number(e.target.value) : undefined;
												updateFilters({
													price: { ...filters.price, gte: value },
													priceRange: "", // Clear preset range when custom input is used
												});
											}}
											className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
											min="0"
										/>
										<span className="text-gray-400">-</span>
										<input
											type="number"
											placeholder="Đến"
											value={filters.price?.lte || ""}
											onChange={(e) => {
												const value = e.target.value ? Number(e.target.value) : undefined;
												updateFilters({
													price: { ...filters.price, lte: value },
													priceRange: "", // Clear preset range when custom input is used
												});
											}}
											className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
											min="0"
										/>
									</div>
									<div className="text-xs text-gray-500">Đơn vị: VNĐ</div>
								</div>

								{/* Preset Price Ranges */}
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">Hoặc chọn khoảng giá có sẵn:</label>
									{priceRanges.map((range) => (
										<label key={range.id} className="flex cursor-pointer items-center gap-2">
											<input
												type="radio"
												name="priceRange"
												value={range.id}
												checked={filters.priceRange === range.id}
												onChange={(e) => {
													updateFilters({
														priceRange: e.target.value,
														price: undefined, // Clear custom price when preset is selected
													});
												}}
												className="text-blue-600 focus:ring-blue-500"
											/>
											<span className="text-sm text-gray-700">{range.label}</span>
										</label>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Stock Availability */}
					<div>
						<button
							onClick={() => toggleSection("stockAvailability")}
							className="mb-3 flex w-full items-center justify-between text-left font-medium text-gray-900"
						>
							Tình trạng
							<ChevronDown
								className={`h-4 w-4 transition-transform ${
									openSections.stockAvailability ? "rotate-180" : ""
								}`}
							/>
						</button>
						{openSections.stockAvailability && (
							<div className="space-y-2">
								{stockOptions.map((option) => (
									<label key={option.id} className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="stockAvailability"
											value={option.id}
											checked={filters.stockAvailability === option.id}
											onChange={(e) =>
												updateFilters({ stockAvailability: e.target.value as StockAvailability })
											}
											className="text-blue-600 focus:ring-blue-500"
										/>
										<span className="text-sm text-gray-700">{option.label}</span>
									</label>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Click outside to close dropdowns */}
			{Object.values(openDropdowns).some(Boolean) && (
				<div className="fixed inset-0 z-30" onClick={() => setOpenDropdowns({})} />
			)}
		</div>
	);
}
