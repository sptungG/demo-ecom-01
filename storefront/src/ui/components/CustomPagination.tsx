import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
  showFirstLast = true,
  maxVisiblePages = 7,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pages.push(1);

    let startPage = Math.max(2, currentPage - halfVisible + 1);
    let endPage = Math.min(totalPages - 1, currentPage + halfVisible - 1);

    // Adjust if we're near the beginning
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    // Adjust if we're near the end
    if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('ellipsis');
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('ellipsis');
    }

    // Always show last page (if not already included)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
      {/* First Page Button */}
      {showFirstLast && currentPage > 1 && (
        <button
          onClick={() => handlePageClick(1)}
          disabled={loading}
          className={clsx(
            'flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-colors',
            'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Trang đầu"
        >
          ««
        </button>
      )}

      {/* Previous Page Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={clsx(
          'flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-colors',
          'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 text-gray-500"
            >
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }

        const isCurrentPage = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={loading}
            className={clsx(
              'flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-colors',
              isCurrentPage
                ? 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            aria-label={`Trang ${page}`}
            aria-current={isCurrentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={clsx(
          'flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-colors',
          'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="Trang sau"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Last Page Button */}
      {showFirstLast && currentPage < totalPages && (
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={loading}
          className={clsx(
            'flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-colors',
            'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Trang cuối"
        >
          »»
        </button>
      )}
    </nav>
  );
};

// Pagination Info Component
interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between text-sm text-gray-700">
      <span>
        Hiển thị <span className="font-medium">{startItem}</span> đến{' '}
        <span className="font-medium">{endItem}</span> trong tổng số{' '}
        <span className="font-medium">{totalItems}</span> sản phẩm
      </span>
      <span>
        Trang <span className="font-medium">{currentPage}</span> / {totalPages}
      </span>
    </div>
  );
};