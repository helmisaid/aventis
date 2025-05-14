"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductGridCard({ product, formatPrice }) {
  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking the cart button
    // Add to cart logic here
    console.log("Adding to cart:", product.name)
  }

  const handleWishlist = (e) => {
    e.preventDefault() // Prevent navigation when clicking the wishlist button
    // Add to wishlist logic here
    console.log("Adding to wishlist:", product.name)
  }

  return (
    <Link
      href={`/products/${product.id || 2}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{product.discount}%</div>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isNew && <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</div>}
          {product.isBestSeller && (
            <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">Best Seller</div>
          )}
        </div>

        {/* Action buttons - only show on hover */}
        <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white hover:bg-gray-100 text-gray-700"
            onClick={handleWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : i < product.rating
                      ? "fill-current opacity-50"
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
        </div>

        {/* Product info */}
        <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-xs text-gray-500">{product.brand}</span>
          {product.category && (
            <>
              <span className="mx-1 text-gray-300">•</span>
              <span className="text-xs text-gray-500">{product.category}</span>
            </>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          {product.discount > 0 ? (
            <div className="flex flex-col">
              <span className="font-bold text-sm">{formatPrice ? formatPrice(product.price) : product.price}</span>
              <span className="text-xs text-gray-500 line-through">
                {formatPrice ? formatPrice(product.originalPrice) : product.originalPrice}
              </span>
            </div>
          ) : (
            <span className="font-bold text-sm">{formatPrice ? formatPrice(product.price) : product.price}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
