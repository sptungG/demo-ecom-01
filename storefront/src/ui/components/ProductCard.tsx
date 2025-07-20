import { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

interface ProductCardProps {
  product: ProductListItemFragment;
  loading?: "eager" | "lazy";
  priority?: boolean;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, loading = "lazy", priority, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      setIsAddingToCart(true);
      try {
        await onAddToCart(product.id);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <LinkWithChannel href={`/products/${product.slug}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          {product?.thumbnail?.url && (
            <ProductImageWrapper
              loading={loading}
              src={product.thumbnail.url}
              alt={product.thumbnail.alt ?? ""}
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Heart 
              className={`w-4 h-4 transition-colors duration-200 ${
                isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
              {isAddingToCart ? 'Đang thêm...' : 'Thêm vào giỏ'}
            </button>
          </div>

          {/* Sale Badge */}
          {product.pricing?.priceRange?.start?.gross.amount !== product.pricing?.priceRange?.stop?.gross.amount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Sale
            </div>
          )}
        </div>
      </LinkWithChannel>

      {/* Product Info */}
      <div className="p-4">
        <LinkWithChannel href={`/products/${product.slug}`}>
          {/* Category */}
          {product.category?.name && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.category.name}
            </p>
          )}
          
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.5)</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-900">
              {formatMoneyRange({
                start: product?.pricing?.priceRange?.start?.gross,
                stop: product?.pricing?.priceRange?.stop?.gross ?? product?.pricing?.priceRange?.start?.gross,
              })}
            </p>
            
            {/* Desktop Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="hidden sm:flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50"
            >
              <ShoppingCart className="w-3 h-3" />
              {isAddingToCart ? '...' : 'Thêm'}
            </button>
          </div>
        </LinkWithChannel>
      </div>
    </div>
  );
}