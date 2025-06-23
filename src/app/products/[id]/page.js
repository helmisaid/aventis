"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  CheckCircle,
  Info,
  Award,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  getProductById,
  getRelatedProducts,
  formatPrice,
} from "@/data/products";

export default function ProductDetailPage({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product data based on the ID
    const productData = getProductById(productId);
    if (productData) {
      // Update reviews with Unsplash avatars
      const updatedProduct = {
        ...productData,
        reviews: productData.reviews.map((review, index) => ({
          ...review,
          user: {
            ...review.user,
            avatar: `https://images.unsplash.com/photo-${
              [
                "1507003211169-0a1dd7228f2d",
                "1494790108755-2616c5e29a5b",
                "1438761681033-6461ffad8d80",
                "1472099645785-5658abf4ff4e",
                "1500648767791-00dcc994a43e",
              ][index % 5]
            }?w=100&h=100&fit=crop&crop=face`,
          },
        })),
      };
      setProduct(updatedProduct);
      setMainImage(updatedProduct.images[0]);
      setSelectedColor(updatedProduct.colors[0]);

      // Get related products
      const related = getRelatedProducts(productId);
      setRelatedProducts(related);
    }
    setLoading(false);
  }, [productId]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error if product not found
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 my-44 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Produk Tidak Ditemukan</h1>
            <p className="mb-6">
              Produk yang Anda cari tidak ada atau telah dihapus.
            </p>
            <Link href="/products">
              <Button>Jelajahi Semua Produk</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="py-3 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link
                href="/products"
                className="hover:text-gray-900 transition-colors"
              >
                Produk
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-gray-900 transition-colors"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Images */}
              <div className="lg:w-1/2 space-y-4">
                <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={mainImage || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    priority
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-24 w-24 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                        mainImage === image
                          ? "border-gray-900 shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setMainImage(image)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Link
                        href={`/products?brand=${product.brand}`}
                        className="text-sm font-medium text-gray-900 hover:underline"
                      >
                        {product.brand}
                      </Link>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="flex items-center">
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
                        <Link
                          href="#reviews"
                          className="text-sm text-gray-600 hover:text-gray-900 ml-2 transition-colors"
                        >
                          {product.reviewCount} ulasan
                        </Link>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {product.name}
                    </h1>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                  </div>

                  <div className="flex items-center">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-lg text-gray-500 line-through ml-3">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <Badge variant="destructive" className="ml-3">
                          Hemat{" "}
                          {formatPrice(product.originalPrice - product.price)}
                        </Badge>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Color Selection */}
                    <div>
                      <h3 className="text-sm font-medium mb-3 text-gray-900">
                        Warna: {selectedColor.name}
                      </h3>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            className={`h-10 w-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                              selectedColor.name === color.name
                                ? "border-gray-900 shadow-md"
                                : "border-gray-300 hover:border-gray-500"
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setSelectedColor(color)}
                            title={color.name}
                          >
                            <span className="sr-only">{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div>
                      <h3 className="text-sm font-medium mb-3 text-gray-900">
                        Jumlah
                      </h3>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                          className="h-10 w-10 rounded-r-none border-gray-300 hover:bg-gray-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="h-10 w-16 flex items-center justify-center border-y border-gray-300 bg-white font-medium">
                          {quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={incrementQuantity}
                          disabled={quantity >= product.stock}
                          className="h-10 w-10 rounded-l-none border-gray-300 hover:bg-gray-50"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="ml-4 text-sm text-gray-600">
                          {product.stock} tersedia
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        className="sm:flex-1 bg-gray-900 hover:bg-gray-800"
                        size="lg"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Tambah ke Keranjang
                      </Button>
                      <Button
                        variant="secondary"
                        className="sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900"
                        size="lg"
                      >
                        Beli Sekarang
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 border-gray-300 hover:bg-gray-50"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 border-gray-300 hover:bg-gray-50"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">
                          Gratis Ongkir
                        </h4>
                        <p className="text-xs text-gray-600">
                          Untuk pesanan di atas Rp 500.000
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">
                          Garansi
                        </h4>
                        <p className="text-xs text-gray-600">
                          Garansi seumur hidup
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center">
                        <RefreshCw className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">
                          Pengembalian Mudah
                        </h4>
                        <p className="text-xs text-gray-600">
                          Kebijakan pengembalian 30 hari
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">
                          Checkout Aman
                        </h4>
                        <p className="text-xs text-gray-600">
                          Berbagai opsi pembayaran
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Meta */}
                  <div className="pt-4 space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">SKU:</span>{" "}
                      <span className="font-medium text-gray-900">
                        {product.sku}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Kategori:</span>{" "}
                      <Link
                        href={`/products?category=${product.category}`}
                        className="font-medium text-gray-900 hover:underline"
                      >
                        {product.category}
                      </Link>
                    </p>
                    <p>
                      <span className="text-gray-600">Tag:</span>{" "}
                      {product.tags.map((tag, index) => (
                        <span key={tag}>
                          <Link
                            href={`/products?tag=${tag}`}
                            className="font-medium text-gray-900 hover:underline"
                          >
                            {tag}
                          </Link>
                          {index < product.tags.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs - ENHANCED VERSION */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full mb-8 bg-white border border-gray-200 rounded-lg p-1 h-auto shadow-sm overflow-x-auto">
                <div className="flex min-w-max md:grid md:grid-cols-4 gap-1">
                  <TabsTrigger
                    value="description"
                    className="flex-shrink-0 min-w-[120px] md:min-w-0 rounded-md py-3 px-4 md:px-6 text-xs md:text-sm font-medium transition-all duration-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-100 whitespace-nowrap"
                  >
                    <Info className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Deskripsi
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="flex-shrink-0 min-w-[120px] md:min-w-0 rounded-md py-3 px-4 md:px-6 text-xs md:text-sm font-medium transition-all duration-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-100 whitespace-nowrap"
                  >
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Fitur
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="flex-shrink-0 min-w-[120px] md:min-w-0 rounded-md py-3 px-4 md:px-6 text-xs md:text-sm font-medium transition-all duration-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-100 whitespace-nowrap"
                  >
                    <Award className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Spesifikasi
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="flex-shrink-0 min-w-[120px] md:min-w-0 rounded-md py-3 px-4 md:px-6 text-xs md:text-sm font-medium transition-all duration-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-100 whitespace-nowrap"
                    id="reviews"
                  >
                    <Star className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">
                      Ulasan ({product.reviewCount})
                    </span>
                    <span className="sm:hidden">Ulasan</span>
                  </TabsTrigger>
                </div>
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm border border-gray-200">
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      Tentang Produk Ini
                    </h3>
                    <div className="h-1 w-20 bg-gray-900 rounded-full mb-4 md:mb-6"></div>
                  </div>
                  <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                    <p>
                      The Aventis Hiking Backpack 45L is designed for serious
                      hikers and backpackers who demand reliability, comfort,
                      and organization from their gear. Whether youre planning a
                      weekend trek or a more extended adventure, this pack
                      offers the perfect balance of capacity, durability, and
                      features.
                    </p>
                    <p>
                      Crafted from high-quality ripstop nylon, this backpack is
                      built to withstand the rigors of the trail while keeping
                      your gear protected from the elements. The integrated rain
                      cover provides additional protection during unexpected
                      downpours.
                    </p>
                    <p>
                      Comfort is paramount during long days on the trail, which
                      is why weve equipped this pack with an adjustable
                      suspension system that can be customized to your torso
                      length. The padded shoulder straps and hip belt distribute
                      weight evenly, reducing fatigue and preventing hot spots.
                    </p>
                    <p>
                      Organization is thoughtfully designed with multiple access
                      points to the main compartment, allowing you to reach
                      items without unpacking everything. External attachment
                      points accommodate trekking poles, ice axes, or other
                      gear, while the hydration reservoir compatibility keeps
                      you refreshed on the move.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm border border-gray-200">
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      Fitur Unggulan
                    </h3>
                    <div className="h-1 w-20 bg-gray-900 rounded-full mb-4 md:mb-6"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-0">
                <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm border border-gray-200">
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      Spesifikasi Teknis
                    </h3>
                    <div className="h-1 w-20 bg-gray-900 rounded-full mb-4 md:mb-6"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium text-gray-900">
                            {key}
                          </span>
                          <span className="text-gray-700 font-semibold">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm border border-gray-200">
                  <div className="space-y-8">
                    {/* Review Summary */}
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <div className="text-5xl font-bold text-gray-900 mb-2">
                            {product.rating.toFixed(1)}
                          </div>
                          <div className="flex justify-center mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-6 w-6 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : i < product.rating
                                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">
                            Berdasarkan {product.reviewCount} ulasan
                          </div>
                          <Button className="w-full bg-gray-900 hover:bg-gray-800">
                            Tulis Ulasan
                          </Button>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const percentage =
                              star === 5
                                ? 70
                                : star === 4
                                ? 20
                                : star === 3
                                ? 7
                                : star === 2
                                ? 2
                                : 1;
                            return (
                              <div
                                key={star}
                                className="flex items-center gap-3"
                              >
                                <div className="w-16 text-sm text-gray-700 font-medium">
                                  {star} bintang
                                </div>
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="w-12 text-sm text-right text-gray-700 font-medium">
                                  {percentage}%
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Reviews List */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-bold text-gray-900">
                        Ulasan Pelanggan
                      </h4>
                      {product.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12 mr-4 border-2 border-white shadow-md">
                                <AvatarImage
                                  src={review.user.avatar || "/placeholder.svg"}
                                  alt={review.user.name}
                                />
                                <AvatarFallback className="bg-gray-900 text-white font-semibold">
                                  {review.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h5 className="font-semibold text-gray-900">
                                  {review.user.name}
                                </h5>
                                <div className="flex items-center mt-1">
                                  <div className="flex text-yellow-400 mr-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? "fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-900 mb-2">
                              {review.title}
                            </h6>
                            <p className="text-gray-700 leading-relaxed">
                              {review.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            >
                              👍 Membantu (12)
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            >
                              🚩 Laporkan
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-6">
                      <Button
                        variant="outline"
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        Muat Lebih Banyak Ulasan
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Anda Mungkin Juga Suka
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(relatedProduct.rating)
                                ? "fill-current"
                                : i < relatedProduct.rating
                                ? "fill-current opacity-50"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-gray-900 transition-colors text-gray-800">
                      {relatedProduct.name}
                    </h3>
                    <div className="mt-auto pt-2">
                      <span className="font-bold text-gray-900">
                        {formatPrice(relatedProduct.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recently Viewed */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Baru Dilihat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts
                .slice(0, 4)
                .reverse()
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold mb-1 group-hover:text-gray-900 transition-colors text-gray-800">
                        {relatedProduct.name}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
