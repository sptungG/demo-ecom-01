import { FilterState } from '@/ui/components/ProductFilter';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { StockAvailability } from '@/gql/graphql';

export function useProductsSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current filters from URL
  const currentFilters = useMemo((): FilterState => {
    // Parse price range
    const priceRange = searchParams.get('priceRange') || undefined;
    let price: { gte?: number; lte?: number } | undefined;
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (!isNaN(min) || !isNaN(max)) {
        price = {
          ...(min && { gte: min }),
          ...(max && { lte: max })
        };
      }
    }

    return {
      search: searchParams.get('search') || undefined,
      categories: searchParams.getAll('category').filter(Boolean),
      price,
      stockAvailability: searchParams.get('stockAvailability') as StockAvailability | undefined,
      sortBy: searchParams.get('sortBy') || 'NAME',
      priceRange: priceRange,
    };
  }, [searchParams]);

  // Get pagination info from URL
  const currentPage = useMemo(() => {
    return parseInt(searchParams.get('page') || '1', 10);
  }, [searchParams]);

  const cursor = useMemo(() => {
    return searchParams.get('cursor');
  }, [searchParams]);

  // Update URL with new filters
  const updateFilters = useCallback((filters: FilterState) => {
    const params = new URLSearchParams();
    
    // Basic filters
    if (filters.search) {
      params.set('search', filters.search);
    }
    
    // Categories
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach(category => {
        params.append('category', category);
      });
    }
    
    // Price range
    if (filters.priceRange) {
      params.set('priceRange', filters.priceRange);
    }
    
    // Sort
    if (filters.sortBy && filters.sortBy !== 'NAME') {
      params.set('sortBy', filters.sortBy);
    }

    // Stock availability
    if (filters.stockAvailability) {
      params.set('stockAvailability', filters.stockAvailability);
    }
    
    // Reset pagination when filters change
    params.delete('page');
    params.delete('cursor');
    
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [router, pathname]);

  // Convert FilterState to GraphQL ProductFilterInput
  const getGraphQLFilter = useCallback(() => {
    const filter: any = {};

    if (currentFilters.search) {
      filter.search = currentFilters.search;
    }

    if (currentFilters.categories && currentFilters.categories.length > 0) {
      filter.categories = currentFilters.categories;
    }

    // Price range parsing from priceRange string
    if (currentFilters.priceRange) {
      const [min, max] = currentFilters.priceRange.split('-').map(Number);
      if (!isNaN(min) || !isNaN(max)) {
        filter.price = {
          ...(min && { gte: min }),
          ...(max && { lte: max })
        };
      }
    }

    // Stock availability
    if (currentFilters.stockAvailability) {
      filter.stockAvailability = currentFilters.stockAvailability;
    }

    return filter;
  }, [currentFilters]);

  // Update pagination
  const updatePagination = useCallback((page: number, newCursor?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    
    if (newCursor) {
      params.set('cursor', newCursor);
    } else {
      params.delete('cursor');
    }
    
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [router, pathname, searchParams]);

  // Load more (for infinite scroll)
  const loadMore = useCallback((newCursor: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('cursor', newCursor);
    params.set('loadMore', 'true');
    
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [router, pathname, searchParams]);

  return {
    currentFilters,
    currentPage,
    cursor,
    updateFilters,
    updatePagination,
    loadMore,
    getGraphQLFilter,
  };
}