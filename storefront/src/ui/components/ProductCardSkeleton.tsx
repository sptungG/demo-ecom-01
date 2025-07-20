import React from 'react';

interface ProductCardSkeletonProps {
  viewMode?: 'grid' | 'list';
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
          
          {/* Content */}
          <div className="flex-1 space-y-3">
            {/* Category */}
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            
            {/* Product Name */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded w-8 ml-1"></div>
            </div>
            
            {/* Price and Button */}
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-20"></div>
              <div className="h-7 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <div className="aspect-square bg-gray-200"></div>
        
        {/* Wishlist Button Skeleton */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full"></div>
        
        {/* Sale Badge Skeleton */}
        <div className="absolute top-3 left-3 w-10 h-5 bg-gray-300 rounded-md"></div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        
        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-8 ml-1"></div>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="hidden sm:block h-7 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;