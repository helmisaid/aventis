"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
  Tag,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { allProducts, formatPrice } from "../../data/products";

// Mock cart items
const initialCartItems = [
  {
    id: "1",
    name: "Aventis Hiking Backpack 45L",
    price: 1250000,
    originalPrice: 1500000,
    discount: 17,
    quantity: 1,
    color: "Blue",
    image: "/images/products/hiking-backpack-product.jpg",
  },
  {
    id: "2",
    name: "TrailMaster Trekking Poles",
    price: 450000,
    originalPrice: 450000,
    discount: 0,
    quantity: 2,
    color: "Black",
    image: "/images/products/tracking-pole-product.jpg",
  },
  {
    id: "3",
    name: "WildernessGear Sleeping Bag",
    price: 750000,
    originalPrice: 900000,
    discount: 17,
    quantity: 1,
    color: "Green",
    image: "/images/products/sleeping-bag-product.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim() === "AVENTIS10") {
      setPromoApplied(true);
      setShowPromoInput(false);
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
    setShowPromoInput(false);
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 500000 ? 0 : 50000;
  const tax = (subtotal - discount) * 0.11;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-700">Keranjang Belanja</span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Keranjang Belanja Anda</h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <ShoppingCart className="h-16 w-16 text-gray-300" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Keranjang Anda kosong
                </h2>
                <p className="text-gray-500 mb-6">
                  Sepertinya Anda belum menambahkan produk apapun ke keranjang.
                </p>
                <Button asChild>
                  <Link href="/products">Lanjutkan Belanja</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">
                          Item Keranjang ({cartItems.length})
                        </h2>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/products">Lanjutkan Belanja</Link>
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                          >
                            <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Warna: {item.color}
                                  </p>
                                  {item.discount > 0 && (
                                    <Badge
                                      variant="destructive"
                                      className="mt-2"
                                    >
                                      {item.discount}% OFF
                                    </Badge>
                                  )}
                                </div>
                                <div className="mt-2 sm:mt-0 text-right">
                                  <div className="font-bold text-lg">
                                    {formatPrice(item.price)}
                                  </div>
                                  {item.discount > 0 && (
                                    <div className="text-sm text-gray-500 line-through">
                                      {formatPrice(item.originalPrice)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                                <div className="flex items-center bg-gray-50 rounded-lg p-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    disabled={item.quantity <= 1}
                                    className="h-8 w-8 hover:bg-white"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <div className="h-8 w-12 flex items-center justify-center font-medium">
                                    {item.quantity}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="h-8 w-8 hover:bg-white"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Hapus
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-20 border border-gray-200">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-6">
                        Ringkasan Pesanan
                      </h2>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">
                            {formatPrice(subtotal)}
                          </span>
                        </div>

                        {/* Promo Code - DIPERBAIKI */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          {promoApplied ? (
                            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                              <div className="flex items-center">
                                <Tag className="h-4 w-4 text-green-600 mr-2" />
                                <div>
                                  <span className="text-sm font-medium text-green-700">
                                    AVENTIS10
                                  </span>
                                  <p className="text-xs text-green-600">
                                    Diskon 10% diterapkan
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={removePromoCode}
                                className="h-6 w-6 text-green-600 hover:text-green-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div>
                              {!showPromoInput ? (
                                <Button
                                  variant="outline"
                                  onClick={() => setShowPromoInput(true)}
                                  className="w-full justify-start"
                                >
                                  <Tag className="h-4 w-4 mr-2" />
                                  Gunakan Kode Promo
                                </Button>
                              ) : (
                                <div className="space-y-3">
                                  <div className="flex items-center mb-2">
                                    <Tag className="h-4 w-4 text-gray-500 mr-2" />
                                    <span className="text-sm font-medium">
                                      Masukkan Kode Promo
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Contoh: AVENTIS10"
                                      value={promoCode}
                                      onChange={(e) =>
                                        setPromoCode(e.target.value)
                                      }
                                      className="flex-1"
                                    />
                                    <Button onClick={applyPromoCode} size="sm">
                                      Gunakan
                                    </Button>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPromoInput(false)}
                                    className="text-gray-500"
                                  >
                                    Batal
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {promoApplied && (
                          <div className="flex justify-between text-green-600">
                            <span>Diskon (10%)</span>
                            <span className="font-medium">
                              -{formatPrice(discount)}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-gray-600">Pengiriman</span>
                          {shipping === 0 ? (
                            <span className="text-green-600 font-medium">
                              Gratis
                            </span>
                          ) : (
                            <span className="font-medium">
                              {formatPrice(shipping)}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Pajak (11%)</span>
                          <span className="font-medium">
                            {formatPrice(tax)}
                          </span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold text-xl">
                          <span>Total</span>
                          <span className="text-primary">
                            {formatPrice(total)}
                          </span>
                        </div>

                        <Button className="w-full" size="lg" asChild>
                          <Link href="/checkout">Lanjut ke Checkout</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">
                Anda Mungkin Juga Suka
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-gray-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
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
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Baru
                        </div>
                      )}
                      {product.isBestSeller && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Terlaris
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-auto pt-2">
                        <span className="font-bold text-lg">
                          {formatPrice(product.price)}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
