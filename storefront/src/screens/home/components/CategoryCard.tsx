
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { Package, ArrowRight, Sparkles } from "lucide-react";

// Interface Category chuẩn dựa trên GraphQL schema của Saleor
export interface Category {
  /** The ID of the category */
  id: string;
  /** Name of category */
  name: string;
  /** Slug of the category */
  slug: string;
  /** Level of the category */
  level: number;
  /** The date and time when the category was last updated */
  updatedAt: string;
  /** Description of the category (Rich text format) */
  description?: string | null;
  /** SEO description of category */
  seoDescription?: string | null;
  /** SEO title of category */
  seoTitle?: string | null;
  /** Background image of the category */
  backgroundImage?: {
    /** The URL of the image */
    url: string;
    /** Alt text for an image */
    alt?: string | null;
  } | null;
  /** Parent category */
  parent?: {
    id: string;
    name: string;
  } | null;
  /** List of children of the category */
  children?: {
    /** A total count of items in the collection */
    totalCount?: number | null;
  } | null;
  /** List of products in the category */
  products?: {
    /** A total count of items in the collection */
    totalCount?: number | null;
  } | null;
  /** List of ancestors of the category */
  ancestors?: {
    /** A total count of items in the collection */
    totalCount?: number | null;
  } | null;
  /** List of public metadata items */
  metadata?: Array<{
    key: string;
    value: string;
  }>;
  /** List of private metadata items */
  privateMetadata?: Array<{
    key: string;
    value: string;
  }>;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const productCount = category.products?.totalCount || 0;
  const hasImage = category.backgroundImage?.url;

  return (
    <LinkWithChannel
      href={`/categories/${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
    >
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <>
            <img
              src={category.backgroundImage!.url}
              alt={category.backgroundImage!.alt || category.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Package className="h-16 w-16 text-blue-500/60" />
          </div>
        )}
        
        {/* Product Count Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 shadow-lg">
          {productCount} sản phẩm
        </div>
        
        {/* Hover Arrow */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <ArrowRight className="h-4 w-4 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Category Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {category.name}
        </h3>
        
        {/* Description */}
        {category.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
        )}
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-500 group-hover:from-purple-500 group-hover:to-pink-500"
            style={{ width: `${Math.min((productCount / 100) * 100, 100)}%` }}
          />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Level {category.level}
          </span>
          <div className="flex items-center space-x-1 text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Khám phá</span>
          </div>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
    </LinkWithChannel>
  );
}
