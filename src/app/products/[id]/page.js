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
      setProduct(productData);
      setMainImage(productData.images[0]);
      setSelectedColor(productData.colors[0]);

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
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
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
        {/* Rest of your component remains the same */}
        {/* Breadcrumbs */}
        <div className="py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-slate-600 ">
              <Link href="/" className="hover:text-primary">
                Beranda
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/products" className="hover:text-primary">
                Produk
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-primary"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-700 ">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Images */}
              <div className="lg:w-1/2 space-y-4">
                <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden border border-gray-200 ">
                  <Image
                    src={mainImage || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-24 w-24 rounded-md overflow-hidden border-2 ${
                        mainImage === image
                          ? "border-primary"
                          : "border-gray-200 hover:border-gray-300 "
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
                        className="text-sm font-medium text-primary hover:underline"
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
                          className="text-sm text-gray-500  hover:text-primary ml-2"
                        >
                          {product.reviewCount} ulasan
                        </Link>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-600  mt-2">{product.description}</p>
                  </div>

                  <div className="flex items-center">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-3xl font-bold">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-lg text-gray-500  line-through ml-3">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <Badge variant="destructive" className="ml-3">
                          Save{" "}
                          {formatPrice(product.originalPrice - product.price)}
                        </Badge>
                      </>
                    ) : (
                      <span className="text-3xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Color Selection */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Warna: {selectedColor.name}
                      </h3>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            className={`h-10 w-10 rounded-full border-2 ${
                              selectedColor.name === color.name
                                ? "border-primary"
                                : "border-gray-200"
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
                      <h3 className="text-sm font-medium mb-3">Jumlah</h3>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                          className="h-10 w-10 rounded-r-none"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="h-10 w-16 flex items-center justify-center border-y border-gray-200 ">
                          {quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={incrementQuantity}
                          disabled={quantity >= product.stock}
                          className="h-10 w-10 rounded-l-none"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="ml-4 text-sm text-gray-500 ">
                          {product.stock} tersedia
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button className="sm:flex-1" size="lg">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Tambah ke Keranjang
                      </Button>
                      <Button
                        variant="secondary"
                        className="sm:flex-1"
                        size="lg"
                      >
                        Beli Sekarang
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Gratis Ongkir</h4>
                        <p className="text-xs text-gray-500 ">
                          Untuk pesanan di atas Rp 500.000
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Garansi</h4>
                        <p className="text-xs text-gray-500 ">
                          Garansi seumur hidup
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <RefreshCw className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">
                          Pengembalian Mudah
                        </h4>
                        <p className="text-xs text-gray-500 ">
                          Kebijakan pengembalian 30 hari
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Checkout Aman</h4>
                        <p className="text-xs text-gray-500 ">
                          Berbagai opsi pembayaran
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Meta */}
                  <div className="pt-4 space-y-2 text-sm">
                    <p>
                      <span className="text-gray-500 ">SKU:</span>{" "}
                      <span className="font-medium">{product.sku}</span>
                    </p>
                    <p>
                      <span className="text-gray-500 ">Kategori:</span>{" "}
                      <Link
                        href={`/products?category=${product.category}`}
                        className="font-medium hover:text-primary"
                      >
                        {product.category}
                      </Link>
                    </p>
                    <p>
                      <span className="text-gray-500 ">Tag:</span>{" "}
                      {product.tags.map((tag, index) => (
                        <span key={tag}>
                          <Link
                            href={`/products?tag=${tag}`}
                            className="font-medium hover:text-primary"
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

        {/* Product Details Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start mb-8 bg-transparent border-b border-gray-200 p-0 h-auto">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  Deskripsi
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  Fitur
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  Spesifikasi
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                  id="reviews"
                >
                  Ulasan ({product.reviewCount})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-0">
                <div className="bg-white  rounded-lg p-6 shadow-sm">
                  <div className="prose max-w-none">
                    <p>
                      The Aventis Hiking Backpack 45L is designed for serious
                      hikers and backpackers who demand reliability, comfort,
                      and organization from their gear. Whether you&apos;re
                      planning a weekend trek or a more extended adventure, this
                      pack offers the perfect balance of capacity, durability,
                      and features.
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
                      is why we&apos;ve equipped this pack with an adjustable
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
                    <p>
                      Whether you&apos;re an experienced backpacker or preparing
                      for your first multi-day hike, the Aventis Hiking Backpack
                      45L is the reliable companion you need for your outdoor
                      adventures.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-0">
                <div className="bg-white  rounded-lg p-6 shadow-sm">
                  <ul className="space-y-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-0">
                <div className="bg-white  rounded-lg p-6 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b border-gray-100 pb-2"
                        >
                          <span className="font-medium">{key}</span>
                          <span className="text-gray-600 ">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-0">
                <div className="bg-white  rounded-lg p-6 shadow-sm">
                  <div className="space-y-6">
                    {/* Review Summary */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="text-center">
                          <div className="text-5xl font-bold">
                            {product.rating.toFixed(1)}
                          </div>
                          <div className="flex justify-center my-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : i < product.rating
                                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-500 ">
                            Berdasarkan {product.reviewCount} ulasan
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button className="w-full">Tulis Ulasan</Button>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="space-y-2">
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
                              <div key={star} className="flex items-center">
                                <div className="w-12 text-sm text-gray-600 ">
                                  {star} bintang
                                </div>
                                <div className="w-full h-2 mx-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-2 bg-yellow-400 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="w-12 text-sm text-right text-gray-600 ">
                                  {percentage}%
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage
                                  src={review.user.avatar || "/placeholder.svg"}
                                  alt={review.user.name}
                                />
                                <AvatarFallback>
                                  {review.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">
                                  {review.user.name}
                                </h4>
                                <div className="flex items-center">
                                  <div className="flex text-yellow-400">
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
                                  <span className="ml-2 text-sm text-gray-500 ">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium">{review.title}</h5>
                            <p className="text-gray-600  mt-1">
                              {review.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3"
                            >
                              Membantu (12)
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3"
                            >
                              Laporkan
                            </Button>
                          </div>
                          <Separator className="mt-4" />
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      Muat Lebih Banyak Ulasan
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Anda Mungkin Juga Suka</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group bg-white  rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
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
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="mt-auto pt-2">
                      <span className="font-bold">
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
            <h2 className="text-2xl font-bold mb-8">Baru Dilihat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts
                .slice(0, 4)
                .reverse()
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group bg-white  rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
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
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="mt-auto pt-2">
                        <span className="font-bold">
                          {formatPrice(relatedProduct.price)}
                        </span>
                      </div>
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
