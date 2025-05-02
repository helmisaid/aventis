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
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Badge } from "../../components/ui/badge";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

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
    image: "/placeholder.svg?height=400&width=400&text=Backpack",
  },
  {
    id: "2",
    name: "TrailMaster Trekking Poles",
    price: 450000,
    originalPrice: 450000,
    discount: 0,
    quantity: 2,
    color: "Black",
    image: "/placeholder.svg?height=400&width=400&text=Trekking+Poles",
  },
  {
    id: "3",
    name: "WildernessGear Sleeping Bag",
    price: 750000,
    originalPrice: 900000,
    discount: 17,
    quantity: 1,
    color: "Green",
    image: "/placeholder.svg?height=400&width=400&text=Sleeping+Bag",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

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
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
        <div className="bg-gray-50 dark:bg-gray-900 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Shopping Cart
              </span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <ShoppingCart className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Looks like you haven&apos;t added any products to your cart
                  yet.
                </p>
                <Button asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">
                          Cart Items ({cartItems.length})
                        </h2>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/products">Continue Shopping</Link>
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
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
                                  <h3 className="font-semibold">{item.name}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Color: {item.color}
                                  </p>
                                  {item.discount > 0 && (
                                    <Badge
                                      variant="destructive"
                                      className="mt-1"
                                    >
                                      {item.discount}% OFF
                                    </Badge>
                                  )}
                                </div>
                                <div className="mt-2 sm:mt-0 text-right">
                                  <div className="font-semibold">
                                    {formatPrice(item.price)}
                                  </div>
                                  {item.discount > 0 && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                      {formatPrice(item.originalPrice)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    disabled={item.quantity <= 1}
                                    className="h-8 w-8 rounded-r-none"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <div className="h-8 w-12 flex items-center justify-center border-y border-gray-200 dark:border-gray-700">
                                    {item.quantity}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="h-8 w-8 rounded-l-none"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
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
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-20">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-6">
                        Order Summary
                      </h2>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Subtotal
                          </span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>

                        {/* Promo Code */}
                        <div>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem
                              value="promo"
                              className="border-none"
                            >
                              <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                                Apply Promo Code
                              </AccordionTrigger>
                              <AccordionContent>
                                {promoApplied ? (
                                  <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/20 p-2 rounded">
                                    <div>
                                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                        AVENTIS10
                                      </span>
                                      <p className="text-xs text-green-600 dark:text-green-400">
                                        10% discount applied
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={removePromoCode}
                                      className="h-6 w-6 text-green-600 dark:text-green-400"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Enter promo code"
                                      value={promoCode}
                                      onChange={(e) =>
                                        setPromoCode(e.target.value)
                                      }
                                      className="h-9"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={applyPromoCode}
                                      className="h-9"
                                    >
                                      Apply
                                    </Button>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        {promoApplied && (
                          <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>Discount (10%)</span>
                            <span>-{formatPrice(discount)}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Shipping
                          </span>
                          {shipping === 0 ? (
                            <span className="text-green-600 dark:text-green-400">
                              Free
                            </span>
                          ) : (
                            <span>{formatPrice(shipping)}</span>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Tax (11%)
                          </span>
                          <span>{formatPrice(tax)}</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>{formatPrice(total)}</span>
                        </div>

                        <Button className="w-full" size="lg" asChild>
                          <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>

                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                          <p>Secure Checkout</p>
                          <div className="flex justify-center space-x-2 mt-2">
                            <Image
                              src="/placeholder.svg?height=30&width=50&text=Visa"
                              alt="Visa"
                              width={50}
                              height={30}
                              className="h-6 object-contain"
                            />
                            <Image
                              src="/placeholder.svg?height=30&width=50&text=MC"
                              alt="Mastercard"
                              width={50}
                              height={30}
                              className="h-6 object-contain"
                            />
                            <Image
                              src="/placeholder.svg?height=30&width=50&text=Amex"
                              alt="American Express"
                              width={50}
                              height={30}
                              className="h-6 object-contain"
                            />
                            <Image
                              src="/placeholder.svg?height=30&width=50&text=PayPal"
                              alt="PayPal"
                              width={50}
                              height={30}
                              className="h-6 object-contain"
                            />
                          </div>
                        </div>
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
          <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Link
                    key={i}
                    href={`/products/${i + 10}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=400&width=400&text=Product+${
                          i + 10
                        }`}
                        alt={`Product ${i + 10}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {
                          [
                            "OutdoorElite Camping Tent 2-Person",
                            "Aventis Waterproof Jacket",
                            "Mountain Pro Climbing Harness",
                            "TrailMaster Hiking Boots",
                          ][i - 1]
                        }
                      </h3>
                      <div className="mt-auto pt-2">
                        <span className="font-bold">
                          {formatPrice(
                            [1200000, 890000, 650000, 1100000][i - 1]
                          )}
                        </span>
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
