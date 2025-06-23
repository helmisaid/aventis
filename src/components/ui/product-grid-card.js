"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Format price to IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductGridCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log("Menambahkan ke keranjang:", product.name);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    console.log("Menambahkan ke wishlist:", product.name);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    console.log("Lihat cepat:", product.name);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg?height=224&width=224"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
              -{product.discount}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">
              Baru
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-amber-500 text-white text-xs font-semibold px-2 py-1">
              Terlaris
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
            onClick={handleWishlist}
            title="Tambah ke Wishlist"
          >
            <Heart className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md"
            onClick={handleQuickView}
            title="Lihat Cepat"
          >
            <Eye className="h-4 w-4 text-gray-700" />
          </Button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
            size="sm"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Tambah ke Keranjang
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <Link
        href={`/products/${product.id || 2}`}
        className="p-4 flex flex-col flex-grow hover:bg-gray-50/50 transition-colors"
      >
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
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
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-semibold text-sm mb-1 group-hover:text-slate-700 transition-colors line-clamp-2 text-slate-900">
          {product.name}
        </h3>

        {/* Brand & Category */}
        <div className="flex items-center mb-2">
          <span className="text-xs text-gray-500">
            {product.brand || "Aventis"}
          </span>
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
              <span className="font-bold text-sm text-slate-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice || product.price * 1.2)}
              </span>
            </div>
          ) : (
            <span className="font-bold text-sm text-slate-900">
              {formatPrice(product.price)}
            </span>
          )}

          {/* Stock indicator */}
          <div className="mt-1">
            {(product.stock || 10) > 0 ? (
              <span className="text-xs text-green-600 font-medium">
                Tersedia
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Habis</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
