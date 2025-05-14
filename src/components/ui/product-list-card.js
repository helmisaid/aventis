"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Format price to IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function ProductListCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking the cart button
    // Add to cart logic here
    console.log("Adding to cart:", product.name)
  }

  return (
    <Link
      href={`/products/1`}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row h-full"
    >
      <div className="relative h-64 sm:h-auto sm:w-48 md:w-64 overflow-hidden">
        <Image
          src={product.images || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">New</div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Best Seller
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : i < product.rating
                      ? "fill-current opacity-50"
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({product.reviewCount})</span>
        </div>
        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{product.category}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-center">
                <span className="font-bold">{formatPrice(product.price)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
            ) : (
              <span className="font-bold">{formatPrice(product.price)}</span>
            )}
          </div>
          <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}
