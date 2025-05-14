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


export default function ProductCard({ product, className = "", style = {} }) {
  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking the cart button
    // Add to cart logic here
    console.log("Adding to cart:", product.name)
  }

  return (
    <Link
      href={`/products/1`}
      className={`group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full ${className}`}
      style={style}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">New</div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="rounded-full p-2" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-current" : ""}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
        </div>
        <h3 className="font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            className="rounded-full p-2 bg-primary hover:bg-primary/90 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  )
}
