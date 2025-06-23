"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Info,
  Wallet,
  Building,
  Check,
  Truck,
  CreditCard,
  Shield,
  ShoppingCart,
} from "lucide-react";
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
import { Label } from "../../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { CheckoutSteps } from "../../components/checkout/checkout-steps";
import { CustomRadio } from "../../components/ui/custom-radio";
import { motion, AnimatePresence } from "framer-motion";

const cartItems = [
  {
    id: "1",
    name: "Aventis Hiking Backpack 45L",
    price: 1250000,
    quantity: 1,
    color: "Biru",
    image: "/images/products/hiking-backpack-product.jpg",
  },
  {
    id: "2",
    name: "TrailMaster Trekking Poles",
    price: 450000,
    quantity: 2,
    color: "Hitam",
    image: "/images/products/tracking-pole-product.jpg",
  },
  {
    id: "3",
    name: "WildernessGear Sleeping Bag",
    price: 750000,
    quantity: 1,
    color: "Hijau",
    image: "/images/products/sleeping-bag-product.jpg",
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
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [eWallet, setEWallet] = useState("gopay");
  const [selectedBank, setSelectedBank] = useState("bca");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const paymentMethods = [
    {
      value: "bank-transfer",
      label: "Transfer Bank",
      icon: Building,
      description: "Transfer langsung ke rekening bank",
    },
    {
      value: "e-wallet",
      label: "E-Wallet",
      icon: Wallet,
      description: "Bayar dengan dompet digital",
    },
  ];

  const bankOptions = [
    {
      value: "bca",
      name: "Bank BCA",
      account: "1234567890",
      logo: "/bca.png",
    },
    {
      value: "mandiri",
      name: "Bank Mandiri",
      account: "0987654321",
      logo: "/mandiri.webp",
    },
    {
      value: "bni",
      name: "Bank BNI",
      account: "1122334455",
      logo: "/bni.webp",
    },
    {
      value: "bri",
      name: "Bank BRI",
      account: "5566778899",
      logo: "/bri.png",
    },
  ];

  const eWalletOptions = [
    {
      value: "gopay",
      name: "GoPay",
      logo: "/gopay.png",
    },
    {
      value: "ovo",
      name: "OVO",
      logo: "/ovo.png",
    },
    {
      value: "dana",
      name: "DANA",
      logo: "/dana.webp",
    },
    {
      value: "shopeepay",
      name: "ShopeePay",
      logo: "/spay.png",
    },
  ];

  const handlePaymentChange = (value) => {
    setPaymentMethod(value);
  };

  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleEWalletChange = (value) => {
    setEWallet(value);
  };

  const handleBankChange = (value) => {
    setSelectedBank(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link
                href="/cart"
                className="hover:text-gray-700 transition-colors"
              >
                Keranjang
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-900 font-medium">Checkout</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-600 mt-1">
                  Selesaikan pesanan Anda dengan aman
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Transaksi Aman & Terpercaya</span>
              </div>
            </div>

            <div className="mt-8">
              <CheckoutSteps currentStep={step} />
            </div>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Checkout Form */}
              <div className="lg:w-2/3">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-sm p-8"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Informasi Pengiriman
                        </h2>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label
                              htmlFor="firstName"
                              className="text-sm font-medium text-gray-700"
                            >
                              Nama Depan *
                            </Label>
                            <Input
                              id="firstName"
                              placeholder="Masukkan nama depan"
                              className="mt-2 h-12"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="lastName"
                              className="text-sm font-medium text-gray-700"
                            >
                              Nama Belakang *
                            </Label>
                            <Input
                              id="lastName"
                              placeholder="Masukkan nama belakang"
                              className="mt-2 h-12"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="email"
                              className="text-sm font-medium text-gray-700"
                            >
                              Alamat Email *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="contoh@email.com"
                              className="mt-2 h-12"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="phone"
                              className="text-sm font-medium text-gray-700"
                            >
                              Nomor Telepon *
                            </Label>
                            <Input
                              id="phone"
                              placeholder="+62 812 3456 7890"
                              className="mt-2 h-12"
                            />
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Alamat Pengiriman
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <Label
                                htmlFor="address"
                                className="text-sm font-medium text-gray-700"
                              >
                                Alamat Lengkap *
                              </Label>
                              <Input
                                id="address"
                                placeholder="Jl. Contoh No. 123, RT/RW 01/02"
                                className="mt-2 h-12"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="city"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Kota *
                                </Label>
                                <Input
                                  id="city"
                                  placeholder="Jakarta"
                                  className="mt-2 h-12"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="province"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Provinsi *
                                </Label>
                                <Select defaultValue="jakarta">
                                  <SelectTrigger
                                    id="province"
                                    className="mt-2 h-12"
                                  >
                                    <SelectValue placeholder="Pilih provinsi" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="jakarta">
                                      DKI Jakarta
                                    </SelectItem>
                                    <SelectItem value="west-java">
                                      Jawa Barat
                                    </SelectItem>
                                    <SelectItem value="east-java">
                                      Jawa Timur
                                    </SelectItem>
                                    <SelectItem value="central-java">
                                      Jawa Tengah
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
                                <Label
                                  htmlFor="postalCode"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Kode Pos *
                                </Label>
                                <Input
                                  id="postalCode"
                                  placeholder="12345"
                                  className="mt-2 h-12"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="country"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Negara *
                                </Label>
                                <Select defaultValue="indonesia">
                                  <SelectTrigger
                                    id="country"
                                    className="mt-2 h-12"
                                  >
                                    <SelectValue placeholder="Pilih negara" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="indonesia">
                                      Indonesia
                                    </SelectItem>
                                    <SelectItem value="malaysia">
                                      Malaysia
                                    </SelectItem>
                                    <SelectItem value="singapore">
                                      Singapura
                                    </SelectItem>
                                    <SelectItem value="thailand">
                                      Thailand
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Pilih Metode Pengiriman
                          </h3>
                          <div className="space-y-3">
                            <CustomRadio
                              name="shipping-method"
                              value="standard"
                              checked={shippingMethod === "standard"}
                              onChange={handleShippingMethodChange}
                              price={
                                shipping === 0
                                  ? "Gratis"
                                  : formatPrice(shipping)
                              }
                              className="hover:bg-gray-50"
                            >
                              <div>
                                <div className="font-semibold text-gray-900">
                                  Pengiriman Standar
                                </div>
                                <div className="text-sm text-gray-500">
                                  Estimasi 2-4 hari kerja
                                </div>
                              </div>
                            </CustomRadio>

                            <CustomRadio
                              name="shipping-method"
                              value="express"
                              checked={shippingMethod === "express"}
                              onChange={handleShippingMethodChange}
                              price={formatPrice(100000)}
                              className="hover:bg-gray-50"
                            >
                              <div>
                                <div className="font-semibold text-gray-900">
                                  Pengiriman Ekspres
                                </div>
                                <div className="text-sm text-gray-500">
                                  Estimasi 1-2 hari kerja
                                </div>
                              </div>
                            </CustomRadio>

                            <CustomRadio
                              name="shipping-method"
                              value="same-day"
                              checked={shippingMethod === "same-day"}
                              onChange={handleShippingMethodChange}
                              price={formatPrice(150000)}
                              className="hover:bg-gray-50"
                            >
                              <div>
                                <div className="font-semibold text-gray-900">
                                  Pengiriman Hari Ini
                                </div>
                                <div className="text-sm text-gray-500">
                                  Khusus area Jakarta & sekitarnya
                                </div>
                              </div>
                            </CustomRadio>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                          <Label
                            htmlFor="notes"
                            className="text-sm font-medium text-gray-700"
                          >
                            Catatan Pesanan (Opsional)
                          </Label>
                          <Textarea
                            id="notes"
                            placeholder="Tambahkan instruksi khusus untuk pengiriman atau catatan lainnya..."
                            className="mt-2 min-h-[100px]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                        <Link
                          href="/cart"
                          className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 text-center"
                        >
                          ← Kembali ke Keranjang
                        </Link>
                        <button
                          onClick={() => setStep(2)}
                          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                          Lanjut ke Pembayaran →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-sm p-8"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Metode Pembayaran
                        </h2>
                      </div>

                      <div className="space-y-4 mb-8">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.value}
                            className={`rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                              paymentMethod === method.value
                                ? "bg-blue-50 ring-2 ring-blue-200"
                                : "bg-gray-50 hover:bg-gray-100"
                            }`}
                            onClick={() => handlePaymentChange(method.value)}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                                  paymentMethod === method.value
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                                }`}
                              >
                                {paymentMethod === method.value && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <method.icon className="w-6 h-6 text-gray-600" />
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {method.label}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {method.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {paymentMethod === "bank-transfer" && (
                          <motion.div
                            key="bank-transfer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                          >
                            <div className="bg-blue-50 rounded-xl p-6">
                              <h4 className="font-semibold text-blue-900 mb-3">
                                Pilih Bank Tujuan Transfer
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {bankOptions.map((bank) => (
                                  <div
                                    key={bank.value}
                                    className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                      selectedBank === bank.value
                                        ? "bg-blue-100 ring-2 ring-blue-300"
                                        : "bg-white hover:bg-gray-50"
                                    }`}
                                    onClick={() => handleBankChange(bank.value)}
                                  >
                                    <div
                                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                        selectedBank === bank.value
                                          ? "bg-blue-600"
                                          : "bg-gray-300"
                                      }`}
                                    >
                                      {selectedBank === bank.value && (
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                      )}
                                    </div>
                                    <Image
                                      src={bank.logo || "/placeholder.svg"}
                                      alt={bank.name}
                                      width={40}
                                      height={25}
                                      className="object-contain"
                                    />
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {bank.name}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {bank.account}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-amber-50 rounded-xl p-6">
                              <h4 className="font-semibold text-amber-900 mb-3">
                                Instruksi Transfer
                              </h4>
                              <ol className="list-decimal list-inside space-y-2 text-sm text-amber-800">
                                <li>
                                  Transfer sejumlah{" "}
                                  <strong>{formatPrice(total)}</strong> ke
                                  rekening yang dipilih
                                </li>
                                <li>
                                  Gunakan nomor pesanan sebagai berita transfer
                                </li>
                                <li>Simpan bukti transfer untuk konfirmasi</li>
                                <li>Upload bukti transfer di bawah ini</li>
                              </ol>
                            </div>

                            <div>
                              <Label
                                htmlFor="receipt"
                                className="text-sm font-medium text-gray-700"
                              >
                                Upload Bukti Transfer *
                              </Label>
                              <Input
                                id="receipt"
                                type="file"
                                accept="image/*,.pdf"
                                className="mt-2 h-12 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Format: JPG, PNG, PDF (Max. 5MB)
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "e-wallet" && (
                          <motion.div
                            key="e-wallet"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                          >
                            <div className="bg-green-50 rounded-xl p-6">
                              <h4 className="font-semibold text-green-900 mb-3">
                                Pilih E-Wallet
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {eWalletOptions.map((wallet) => (
                                  <div
                                    key={wallet.value}
                                    className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                      eWallet === wallet.value
                                        ? "bg-green-100 ring-2 ring-green-300"
                                        : "bg-white hover:bg-gray-50"
                                    }`}
                                    onClick={() =>
                                      handleEWalletChange(wallet.value)
                                    }
                                  >
                                    <div
                                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                        eWallet === wallet.value
                                          ? "bg-green-600"
                                          : "bg-gray-300"
                                      }`}
                                    >
                                      {eWallet === wallet.value && (
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                      )}
                                    </div>
                                    <Image
                                      src={wallet.logo || "/placeholder.svg"}
                                      alt={wallet.name}
                                      width={40}
                                      height={25}
                                      className="object-contain"
                                    />
                                    <div className="font-medium text-gray-900">
                                      {wallet.name}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6">
                              <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                  <h4 className="font-semibold text-blue-900 mb-2">
                                    Cara Pembayaran
                                  </h4>
                                  <ul className="text-sm text-blue-800 space-y-1">
                                    <li>
                                      • Anda akan diarahkan ke aplikasi{" "}
                                      {
                                        eWalletOptions.find(
                                          (w) => w.value === eWallet
                                        )?.name
                                      }
                                    </li>
                                    <li>
                                      • Konfirmasi pembayaran sebesar{" "}
                                      {formatPrice(total)}
                                    </li>
                                    <li>
                                      • Transaksi akan diproses secara otomatis
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-4 mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                              termsAccepted
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            onClick={() => setTermsAccepted(!termsAccepted)}
                          >
                            {termsAccepted && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <label
                            className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                            onClick={() => setTermsAccepted(!termsAccepted)}
                          >
                            Saya setuju dengan{" "}
                            <Link
                              href="/terms"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              Syarat dan Ketentuan
                            </Link>{" "}
                            dan{" "}
                            <Link
                              href="/privacy"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              Kebijakan Privasi
                            </Link>{" "}
                            yang berlaku
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                        <button
                          onClick={() => setStep(1)}
                          className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                        >
                          ← Kembali ke Pengiriman
                        </button>
                        <button
                          onClick={() => setStep(3)}
                          disabled={!termsAccepted}
                          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                            termsAccepted
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Buat Pesanan →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-sm p-8 text-center"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Pesanan Berhasil Dibuat!
                      </h2>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Terima kasih atas kepercayaan Anda. Pesanan Anda telah
                        diterima dan akan segera diproses.
                      </p>

                      <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                        <div className="text-sm text-gray-500 mb-1">
                          Nomor Pesanan
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-3">
                          #AVT-12345
                        </div>
                        <div className="text-sm text-gray-600">
                          Email konfirmasi telah dikirim ke alamat email Anda
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <Link
                          href="/account/orders"
                          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-center"
                        >
                          Lihat Status Pesanan
                        </Link>
                        <Link
                          href="/"
                          className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 text-center"
                        >
                          Lanjutkan Belanja
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-6">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Ringkasan Pesanan
                    </h2>

                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="items"
                      className="w-full mb-6"
                    >
                      <AccordionItem value="items" className="border-0">
                        <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
                          <span className="flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            {cartItems.length} Barang dalam Keranjang
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 mt-4">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-grow min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    Warna: {item.color}
                                  </p>
                                  <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-500">
                                      Qty: {item.quantity}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900">
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
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          {formatPrice(subtotal)}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Pengiriman</span>
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

                      <div className="flex justify-between text-gray-600">
                        <span>Pajak (11%)</span>
                        <span className="font-medium">{formatPrice(tax)}</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total Pembayaran</span>
                        <span className="text-blue-600">
                          {formatPrice(total)}
                        </span>
                      </div>

                      {step === 3 && (
                        <div className="bg-green-50 rounded-lg p-4 mt-6">
                          <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-green-900">
                                Estimasi Pengiriman
                              </p>
                              <p className="text-sm text-green-700">
                                {shippingMethod === "same-day"
                                  ? "Hari ini sebelum pukul 18:00"
                                  : shippingMethod === "express"
                                  ? "1-2 hari kerja"
                                  : "2-4 hari kerja"}
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
