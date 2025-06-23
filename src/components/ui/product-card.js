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

export default function ProductCard({ product, className = "", style = {} }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log("Menambahkan ke keranjang:", product.name);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    console.log("Menambahkan ke wishlist:", product.name);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    console.log("Lihat cepat:", product.name);
  };

  return (
    <div
      className={`group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
      style={style}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg?height=256&width=256"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">
              Baru
            </Badge>
          )}
          {product.discount > 0 && (
            <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
              -{product.discount}%
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-amber-500 text-white text-xs font-semibold px-2 py-1">
              Terlaris
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md"
            onClick={handleAddToWishlist}
            title="Tambah ke Wishlist"
          >
            <Heart className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md"
            onClick={handleQuickView}
            title="Lihat Cepat"
          >
            <Eye className="h-4 w-4 text-gray-700" />
          </Button>
        </div>

        {/* Quick Add to Cart - Bottom */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
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
        href={`/products/1`}
        className="block p-4 hover:bg-gray-50/50 transition-colors"
      >
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < product.rating ? "fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviews || 0} ulasan)
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-slate-700 transition-colors">
          {product.name}
        </h3>

        {/* Brand & Category */}
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span>{product.brand || "Aventis"}</span>
          {product.category && (
            <>
              <span className="mx-1">•</span>
              <span>{product.category}</span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description ||
            "Produk berkualitas tinggi untuk petualangan Anda"}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <span className="font-bold text-slate-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice || product.price * 1.2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-slate-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="text-right">
            {product.stock > 0 ? (
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
