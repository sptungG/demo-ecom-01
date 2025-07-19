import { useState } from "react";
import { ChevronDown, Filter, X, Search } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface ProductFilterProps {
  categories: FilterOption[];
  priceRanges: FilterOption[];
  sortOptions: FilterOption[];
  onFilterChange: (filters: FilterState) => void;
  onSearch: (query: string) => void;
}

export interface FilterState {
  search: string;
  categories: string[];
  priceRange: string;
  sortBy: string;
}

export function ProductFilter({ 
  categories, 
  priceRanges, 
  sortOptions, 
  onFilterChange, 
  onSearch 
}: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    priceRange: '',
    sortBy: 'NAME'
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: false,
    sort: false
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearch = (query: string) => {
    updateFilters({ search: query });
    onSearch(query);
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      categories: [],
      priceRange: '',
      sortBy: 'NAME'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFiltersCount = filters.categories.length + (filters.priceRange ? 1 : 0) + (filters.search ? 1 : 0);

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 border-b border-gray-200">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 text-gray-700 font-medium"
        >
          <Filter className="w-4 h-4" />
          Bộ lọc
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6">
          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <X className="w-4 h-4" />
              Xóa bộ lọc ({activeFiltersCount})
            </button>
          )}

          {/* Sort */}
          <div>
            <button
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
              Sắp xếp
              <ChevronDown className={`w-4 h-4 transition-transform ${openSections.sort ? 'rotate-180' : ''}`} />
            </button>
            {openSections.sort && (
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
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
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
              Danh mục
              <ChevronDown className={`w-4 h-4 transition-transform ${openSections.categories ? 'rotate-180' : ''}`} />
            </button>
            {openSections.categories && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={category.id}
                      checked={filters.categories.includes(category.id)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...filters.categories, category.id]
                          : filters.categories.filter(id => id !== category.id);
                        updateFilters({ categories: newCategories });
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{category.label}</span>
                    {category.count && (
                      <span className="text-xs text-gray-500">({category.count})</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
              Khoảng giá
              <ChevronDown className={`w-4 h-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
            </button>
            {openSections.price && (
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.id}
                      checked={filters.priceRange === range.id}
                      onChange={(e) => updateFilters({ priceRange: e.target.value })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}