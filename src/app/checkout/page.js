"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  CreditCard,
  Info,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Mock cart items
const cartItems = [
  {
    id: "1",
    name: "Aventis Hiking Backpack 45L",
    price: 1250000,
    quantity: 1,
    color: "Blue",
    image: "/placeholder.svg?height=400&width=400&text=Backpack",
  },
  {
    id: "2",
    name: "TrailMaster Trekking Poles",
    price: 450000,
    quantity: 2,
    color: "Black",
    image: "/placeholder.svg?height=400&width=400&text=Trekking+Poles",
  },
  {
    id: "3",
    name: "WildernessGear Sleeping Bag",
    price: 750000,
    quantity: 1,
    color: "Green",
    image: "/placeholder.svg?height=400&width=400&text=Sleeping+Bag",
  },
];

// Calculate totals
const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
const discount = 0;
const shipping = subtotal > 500000 ? 0 : 50000;
const tax = (subtotal - discount) * 0.11;
const total = subtotal - discount + shipping + tax;

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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
              <Link href="/cart" className="hover:text-primary">
                Cart
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-700 dark:text-gray-300">Checkout</span>
            </div>
          </div>
        </div>

        {/* Checkout Steps */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  Secure Checkout
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="hidden md:flex w-full max-w-3xl mx-auto">
                <div className="w-1/3 text-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto ${
                      step >= 1
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium mt-2 block ${
                      step >= 1
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Shipping
                  </span>
                </div>
                <div className="w-1/3 relative">
                  <div
                    className={`absolute top-5 left-0 right-0 h-0.5 ${
                      step >= 2 ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto relative z-10 ${
                      step >= 2
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium mt-2 block ${
                      step >= 2
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Payment
                  </span>
                </div>
                <div className="w-1/3 relative">
                  <div
                    className={`absolute top-5 left-0 right-0 h-0.5 ${
                      step >= 3 ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto relative z-10 ${
                      step >= 3
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <span
                    className={`text-sm font-medium mt-2 block ${
                      step >= 3
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Confirmation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Checkout Form */}
              <div className="lg:w-2/3">
                {step === 1 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <h3 className="font-semibold mb-4">Shipping Address</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          placeholder="Enter your street address"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="Enter your city"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="province">Province</Label>
                          <Select defaultValue="jakarta">
                            <SelectTrigger id="province" className="mt-1">
                              <SelectValue placeholder="Select province" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jakarta">
                                DKI Jakarta
                              </SelectItem>
                              <SelectItem value="west-java">
                                West Java
                              </SelectItem>
                              <SelectItem value="east-java">
                                East Java
                              </SelectItem>
                              <SelectItem value="central-java">
                                Central Java
                              </SelectItem>
                              <SelectItem value="yogyakarta">
                                Yogyakarta
                              </SelectItem>
                              <SelectItem value="bali">Bali</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            placeholder="Enter postal code"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Select defaultValue="indonesia">
                            <SelectTrigger id="country" className="mt-1">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="indonesia">
                                Indonesia
                              </SelectItem>
                              <SelectItem value="malaysia">Malaysia</SelectItem>
                              <SelectItem value="singapore">
                                Singapore
                              </SelectItem>
                              <SelectItem value="thailand">Thailand</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-4">Shipping Method</h3>
                    <RadioGroup
                      defaultValue="standard"
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-3 mb-6"
                    >
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="font-medium">
                            Standard Shipping (2-4 business days)
                          </Label>
                        </div>
                        <span>
                          {shipping === 0 ? "Free" : formatPrice(shipping)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="font-medium">
                            Express Shipping (1-2 business days)
                          </Label>
                        </div>
                        <span>{formatPrice(100000)}</span>
                      </div>
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="same-day" id="same-day" />
                          <Label htmlFor="same-day" className="font-medium">
                            Same Day Delivery (Jakarta area only)
                          </Label>
                        </div>
                        <span>{formatPrice(150000)}</span>
                      </div>
                    </RadioGroup>

                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any special instructions or delivery notes"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                      <Button variant="outline" asChild>
                        <Link href="/cart">Back to Cart</Link>
                      </Button>
                      <Button onClick={() => setStep(2)}>
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Payment Method
                    </h2>

                    <Tabs
                      defaultValue="credit-card"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="credit-card">
                          Credit Card
                        </TabsTrigger>
                        <TabsTrigger value="bank-transfer">
                          Bank Transfer
                        </TabsTrigger>
                        <TabsTrigger value="e-wallet">E-Wallet</TabsTrigger>
                      </TabsList>
                      <TabsContent value="credit-card">
                        <div className="space-y-4 mb-6">
                          <div>
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              placeholder="Enter name on card"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="0000 0000 0000 0000"
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="bank-transfer">
                        <div className="space-y-4 mb-6">
                          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            <p className="text-sm mb-2">
                              Please transfer the total amount to one of the
                              following bank accounts:
                            </p>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="font-medium">Bank BCA</span>
                                <span>1234567890</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  Bank Mandiri
                                </span>
                                <span>0987654321</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Bank BNI</span>
                                <span>1122334455</span>
                              </div>
                            </div>
                            <p className="text-sm mt-4">
                              After making the transfer, please upload your
                              payment receipt below.
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="receipt">
                              Upload Payment Receipt
                            </Label>
                            <Input id="receipt" type="file" className="mt-1" />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="e-wallet">
                        <div className="space-y-4 mb-6">
                          <RadioGroup
                            defaultValue="gopay"
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2 p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                              <RadioGroupItem value="gopay" id="gopay" />
                              <Label
                                htmlFor="gopay"
                                className="font-medium flex items-center"
                              >
                                <Image
                                  src="/placeholder.svg?height=30&width=60&text=GoPay"
                                  alt="GoPay"
                                  width={60}
                                  height={30}
                                  className="h-6 mr-2"
                                />
                                GoPay
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                              <RadioGroupItem value="ovo" id="ovo" />
                              <Label
                                htmlFor="ovo"
                                className="font-medium flex items-center"
                              >
                                <Image
                                  src="/placeholder.svg?height=30&width=60&text=OVO"
                                  alt="OVO"
                                  width={60}
                                  height={30}
                                  className="h-6 mr-2"
                                />
                                OVO
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg border-gray-200 dark:border-gray-700">
                              <RadioGroupItem value="dana" id="dana" />
                              <Label
                                htmlFor="dana"
                                className="font-medium flex items-center"
                              >
                                <Image
                                  src="/placeholder.svg?height=30&width=60&text=DANA"
                                  alt="DANA"
                                  width={60}
                                  height={30}
                                  className="h-6 mr-2"
                                />
                                DANA
                              </Label>
                            </div>
                          </RadioGroup>
                          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mt-4">
                            <p className="text-sm">
                              You will be redirected to the selected e-wallet
                              platform to complete your payment after placing
                              your order.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="save-payment" />
                        <Label htmlFor="save-payment">
                          Save payment information for future purchases
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-primary hover:underline"
                          >
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back to Shipping
                      </Button>
                      <Button onClick={() => setStep(3)}>Place Order</Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400"
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
                    <h2 className="text-2xl font-bold mb-2">
                      Order Confirmed!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Thank you for your purchase. Your order has been received
                      and is being processed.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-6">
                      <p className="font-medium mb-2">
                        Order Number: #AVT-12345
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        A confirmation email has been sent to your email
                        address.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild>
                        <Link href="/account/orders">View Order</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/">Continue Shopping</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-20">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Order Summary
                    </h2>

                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="items"
                      className="w-full mb-4"
                    >
                      <AccordionItem value="items" className="border-b-0">
                        <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                          {cartItems.length} Items in Cart
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 mt-2">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex gap-3">
                                <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="text-sm font-medium">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Color: {item.color}
                                  </p>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      Qty: {item.quantity}
                                    </span>
                                    <span className="text-sm font-medium">
                                      {formatPrice(item.price)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal
                        </span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>

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

                      {step === 3 && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                Estimated Delivery
                              </p>
                              <p className="text-sm text-green-700 dark:text-green-400">
                                {shippingMethod === "same-day"
                                  ? "Today"
                                  : shippingMethod === "express"
                                  ? "May 3 - May 4, 2023"
                                  : "May 5 - May 7, 2023"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
