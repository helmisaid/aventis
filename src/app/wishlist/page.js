"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Heart,
  HeartCrack,
  Eye,
  ShoppingCart,
  Star,
  Trash2,
  Share2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { allProducts, formatPrice } from "@/data/products";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  // Simulasi wishlist dengan produk asli (ID: 1, 3, 6, 8)
  const wishlistProductIds = ["1", "3", "6", "8"];

  useEffect(() => {
    // Simulasi loading dan mengambil produk dari data asli
    const timer = setTimeout(() => {
      const wishlistProducts = allProducts
        .filter((product) => wishlistProductIds.includes(product.id))
        .map((product) => ({
          ...product,
          addedDate: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        }));

      setWishlistItems(wishlistProducts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
    // Toast notification bisa ditambahkan di sini
    console.log(`Produk ${itemId} dihapus dari wishlist`);
  };

  const handleAddToCart = (item) => {
    // Simulasi menambah ke keranjang
    console.log("Menambah ke keranjang:", item);
    // Toast notification bisa ditambahkan di sini
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkRemove = () => {
    if (selectedItems.length === 0) return;

    setWishlistItems((prevItems) =>
      prevItems.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        )}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Daftar Keinginan Saya
                </h1>
                <p className="text-gray-600 mt-2">
                  {wishlistItems.length} produk yang Anda simpan untuk dilihat
                  nanti
                </p>
              </div>

              {wishlistItems.length > 0 && (
                <div className="flex items-center gap-3">
                  {selectedItems.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkRemove}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus Terpilih ({selectedItems.length})
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Bagikan
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              )}
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Daftar Keinginan Kosong
                </h2>
                <p className="text-gray-500 mb-8">
                  Belum ada produk yang Anda simpan. Mulai jelajahi koleksi
                  produk outdoor terbaik kami dan simpan yang Anda sukai!
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800"
                >
                  <Link href="/products">
                    <Eye className="h-4 w-4 mr-2" />
                    Jelajahi Produk
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <Card
                  key={item.id}
                  className={cn(
                    "group overflow-hidden transition-all duration-300 hover:shadow-lg bg-white",
                    selectedItems.includes(item.id) && "ring-2 ring-slate-900"
                  )}
                >
                  <CardHeader className="p-0 relative">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {item.isNew && (
                          <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs">
                            Baru
                          </Badge>
                        )}
                        {item.isBestSeller && (
                          <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                            Terlaris
                          </Badge>
                        )}
                        {item.discount && (
                          <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                            -{item.discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Selection Checkbox */}
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => handleSelectItem(item.id)}
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            selectedItems.includes(item.id)
                              ? "bg-slate-900 border-slate-900"
                              : "bg-white/80 border-gray-300 hover:border-slate-900"
                          )}
                        >
                          {selectedItems.includes(item.id) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </button>
                      </div>

                      {/* Quick Actions Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            asChild
                          >
                            <Link href={`/products/${item.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-slate-900 hover:bg-slate-800"
                            onClick={() => handleAddToCart(item)}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.brand}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({item.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl font-bold text-slate-900">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      Ditambahkan {formatDate(item.addedDate)}
                    </p>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <HeartCrack className="h-4 w-4 mr-2" />
                      Hapus
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-slate-900 hover:bg-slate-800"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Keranjang
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Suggested Products */}
          {wishlistItems.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Produk yang Mungkin Anda Suka
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts.slice(0, 4).map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                        <Button size="sm" variant="outline" className="ml-auto">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
