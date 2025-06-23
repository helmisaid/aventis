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

export default function ProductListCard({ product }) {
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
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row h-full border border-gray-100 hover:border-gray-200">
      {/* Product Image */}
      <div className="relative h-64 sm:h-auto sm:w-48 md:w-64 overflow-hidden bg-gray-50">
        <Image
          src={
            product.images ||
            product.image ||
            "/placeholder.svg?height=256&width=256"
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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

        {/* Action Buttons */}
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
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/products/1`} className="flex-grow">
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-amber-400">
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
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewCount || 0} ulasan)
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-lg mb-2 group-hover:text-slate-700 transition-colors text-slate-900">
            {product.name}
          </h3>

          {/* Brand & Category */}
          <div className="flex items-center mb-3">
            <span className="text-sm text-gray-600 font-medium">
              {product.brand || "Aventis"}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {product.category || "Outdoor"}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {product.description ||
              "Produk berkualitas tinggi yang dirancang khusus untuk petualangan outdoor Anda. Terbuat dari bahan premium dengan teknologi terdepan untuk memberikan performa maksimal dalam berbagai kondisi cuaca dan medan."}
          </p>
        </Link>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <span className="font-bold text-lg text-slate-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice || product.price * 1.2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-slate-900">
                {formatPrice(product.price)}
              </span>
            )}

            {/* Stock Status */}
            <div className="mt-1">
              {(product.stock || 10) > 0 ? (
                <span className="text-xs text-green-600 font-medium">
                  ✓ Tersedia
                </span>
              ) : (
                <span className="text-xs text-red-600 font-medium">
                  ✗ Habis
                </span>
              )}
            </div>
          </div>

          <Button
            className="bg-slate-900 hover:bg-slate-800 text-white px-6"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Tambah ke Keranjang
          </Button>
        </div>
      </div>
    </div>
  );
}
