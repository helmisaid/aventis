"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, ArrowLeft, ExternalLink, Download } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Separator } from "../../../components/ui/separator"
import Navbar from "../../../components/navbar"
import Footer from "../../../components/footer"
import { Badge } from "../../../components/ui/badge"

// Sample order data
const orders = [
  {
    id: "AVT-12345",
    date: "13 Mei 2023",
    totalItems: 3,
    total: 2900000,
    status: "completed",
    items: [
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
    ],
    shippingDetails: {
      name: "Budi Santoso",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta Pusat",
      postalCode: "10220",
      province: "DKI Jakarta",
      country: "Indonesia",
      phone: "081234567890",
    },
    shippingMethod: "Pengiriman Standar",
    paymentMethod: "Transfer Bank",
    trackingNumber: "JNE1234567890",
  },
  {
    id: "AVT-12346",
    date: "28 April 2023",
    totalItems: 2,
    total: 1950000,
    status: "completed",
    items: [
      {
        id: "4",
        name: "Alpine Pro Hiking Boots",
        price: 1200000,
        quantity: 1,
        color: "Coklat",
        image: "/placeholder.svg",
      },
      {
        id: "5",
        name: "Outdoor Cooking Set",
        price: 750000,
        quantity: 1,
        color: "Silver",
        image: "/placeholder.svg",
      },
    ],
    shippingDetails: {
      name: "Budi Santoso",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta Pusat",
      postalCode: "10220",
      province: "DKI Jakarta",
      country: "Indonesia",
      phone: "081234567890",
    },
    shippingMethod: "Pengiriman Ekspres",
    paymentMethod: "Kartu Kredit",
    trackingNumber: "SiCepat9876543210",
  },
  {
    id: "AVT-12347",
    date: "15 Maret 2023",
    totalItems: 1,
    total: 2450000,
    status: "completed",
    items: [
      {
        id: "6",
        name: "Expedition 2-Person Tent",
        price: 2450000,
        quantity: 1,
        color: "Hijau",
        image: "/placeholder.svg",
      },
    ],
    shippingDetails: {
      name: "Budi Santoso",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta Pusat",
      postalCode: "10220",
      province: "DKI Jakarta",
      country: "Indonesia",
      phone: "081234567890",
    },
    shippingMethod: "Pengiriman Standar",
    paymentMethod: "E-Wallet (GoPay)",
    trackingNumber: "JNE7654321098",
  },
  {
    id: "AVT-12348",
    date: "1 Juni 2023",
    totalItems: 2,
    total: 850000,
    status: "processing",
    items: [
      {
        id: "7",
        name: "Hydration Backpack 2L",
        price: 350000,
        quantity: 1,
        color: "Biru",
        image: "/placeholder.svg",
      },
      {
        id: "8",
        name: "Tactical LED Headlamp",
        price: 500000,
        quantity: 1,
        color: "Hitam",
        image: "/placeholder.svg",
      },
    ],
    shippingDetails: {
      name: "Budi Santoso",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta Pusat",
      postalCode: "10220",
      province: "DKI Jakarta",
      country: "Indonesia",
      phone: "081234567890",
    },
    shippingMethod: "Pengiriman Standar",
    paymentMethod: "Transfer Bank",
    trackingNumber: null,
  },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderStatus, setOrderStatus] = useState("all")

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-black text-white">Selesai</Badge>
      case "processing":
        return <Badge className="bg-gray-500 text-white">Diproses</Badge>
      case "cancelled":
        return <Badge className="bg-gray-700 text-white">Dibatalkan</Badge>
      default:
        return <Badge className="bg-gray-400">Unknown</Badge>
    }
  }

  const filteredOrders = orderStatus === "all" ? orders : orders.filter((order) => order.status === orderStatus)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-600">
                Beranda
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/account" className="hover:text-gray-600">
                Akun
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-700">Pesanan</span>
            </div>
          </div>
        </div>

        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Riwayat Pesanan</h1>
                <p className="text-gray-600 mt-1">Lacak dan kelola pesanan Anda</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/">
                  <Button variant="outline" className="border-black hover:bg-gray-50 h-9 gap-1">
                    <ArrowLeft className="h-4 w-4" /> Lanjutkan Belanja
                  </Button>
                </Link>
                <Button className="bg-black hover:bg-gray-800 text-white h-9">Hubungi Dukungan</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {selectedOrder ? (
              <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} formatPrice={formatPrice} />
            ) : (
              <OrdersList
                orders={filteredOrders}
                orderStatus={orderStatus}
                setOrderStatus={setOrderStatus}
                setSelectedOrder={setSelectedOrder}
                formatPrice={formatPrice}
                getStatusBadge={getStatusBadge}
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function OrdersList({ orders, orderStatus, setOrderStatus, setSelectedOrder, formatPrice, getStatusBadge }) {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")

  const sortOrders = (orders) => {
    switch (sort) {
      case "newest":
        return [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))
      case "oldest":
        return [...orders].sort((a, b) => new Date(a.date) - new Date(b.date))
      case "highest":
        return [...orders].sort((a, b) => b.total - a.total)
      case "lowest":
        return [...orders].sort((a, b) => a.total - b.total)
      default:
        return orders
    }
  }

  const filteredOrders = sortOrders(
    search.trim()
      ? orders.filter(
          (order) =>
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.items.some((item) => item.name.toLowerCase().includes(search.toLowerCase())),
        )
      : orders,
  )

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="w-full sm:w-1/3 md:w-1/4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Cari pesanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-gray-300 focus:border-black focus:ring-black"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Tabs defaultValue={orderStatus} onValueChange={setOrderStatus} className="w-auto">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                Semua
              </TabsTrigger>
              <TabsTrigger value="processing" className="data-[state=active]:bg-black data-[state=active]:text-white">
                Diproses
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-black data-[state=active]:text-white">
                Selesai
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-black data-[state=active]:text-white">
                Dibatalkan
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Select defaultValue={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px] border-gray-300 focus:ring-black">
              <SelectValue placeholder="Urut berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
              <SelectItem value="highest">Harga Tertinggi</SelectItem>
              <SelectItem value="lowest">Harga Terendah</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-gray-100 mx-auto rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Tidak Ada Pesanan Ditemukan</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {search
              ? `Tidak ada pesanan yang cocok dengan "${search}"`
              : "Anda belum memiliki pesanan dengan status ini"}
          </p>
          <Button className="bg-black hover:bg-gray-800 text-white" asChild>
            <Link href="/">Mulai Belanja</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-5 flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <h3 className="font-bold">Pesanan #{order.id}</h3>
                    {getStatusBadge(order.status)}
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="text-gray-500">Total Barang</p>
                      <p className="font-medium">{order.totalItems} barang</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Pembayaran</p>
                      <p className="font-medium">{formatPrice(order.total)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Metode Pengiriman</p>
                      <p className="font-medium">{order.shippingMethod}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Metode Pembayaran</p>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-3">
                  <Button className="bg-black hover:bg-gray-800 text-white" onClick={() => setSelectedOrder(order)}>
                    Lihat Detail
                  </Button>
                  {order.status === "completed" && (
                    <Button variant="outline" className="border-black hover:bg-gray-50 gap-1">
                      <Download className="h-4 w-4" /> Faktur
                    </Button>
                  )}
                </div>
              </div>
              <Separator />
              <div className="px-5 py-3 bg-gray-50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-12 h-12 relative rounded-md overflow-hidden border border-gray-200"
                    >
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-sm text-gray-500 flex-shrink-0">+{order.items.length - 3} lainnya</span>
                  )}
                </div>

                {order.status === "processing" && order.trackingNumber && (
                  <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                    <span className="text-gray-500">Lacak Pesanan:</span>
                    <span className="font-medium">{order.trackingNumber}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function OrderDetail({ order, onBack, formatPrice }) {
  const steps = [
    { label: "Pesanan Dibuat", completed: true },
    { label: "Pembayaran Diterima", completed: true },
    { label: "Pesanan Diproses", completed: order.status !== "cancelled" },
    { label: "Pesanan Dikirim", completed: order.status === "completed" },
    { label: "Pesanan Diterima", completed: order.status === "completed" },
  ]

  return (
    <div>
      <div className="mb-8">
        <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-9 gap-1" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Pesanan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold">Pesanan #{order.id}</h2>
                <p className="text-gray-500">Dipesan pada {order.date}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <div className="inline-flex">{getStatusBadge(order.status)}</div>
                {order.status === "completed" && (
                  <Button variant="outline" size="sm" className="border-black hover:bg-gray-50 gap-1 h-8">
                    <Download className="h-3.5 w-3.5" /> Unduh Faktur
                  </Button>
                )}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="mt-8">
              <h3 className="font-medium mb-4">Status Pesanan</h3>
              <div className="relative">
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start mb-4 last:mb-0">
                    <div
                      className={`relative z-10 w-5 h-5 rounded-full border-2 mr-4 ${
                        step.completed ? "border-black bg-black" : "border-gray-300 bg-white"
                      }`}
                    >
                      {step.completed && (
                        <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className={`font-medium ${step.completed ? "text-black" : "text-gray-500"}`}>{step.label}</p>
                      {index === 3 && order.trackingNumber && (
                        <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                          <span>No. Resi: {order.trackingNumber}</span>
                          <ExternalLink className="h-3.5 w-3.5 cursor-pointer" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">Barang Pesanan</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Warna: {item.color}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">Jumlah: {item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">Ringkasan Pembayaran</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(order.total - order.total * 0.11)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pengiriman</span>
                <span>{order.total > 500000 ? "Gratis" : formatPrice(50000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pajak (11%)</span>
                <span>{formatPrice(order.total * 0.11)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-medium mb-2">Metode Pembayaran</h4>
              <p className="text-gray-600">{order.paymentMethod}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-medium mb-2">Metode Pengiriman</h4>
              <p className="text-gray-600">{order.shippingMethod}</p>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">Alamat Pengiriman</h3>
            <div className="space-y-1">
              <p className="font-medium">{order.shippingDetails.name}</p>
              <p className="text-gray-600">{order.shippingDetails.phone}</p>
              <p className="text-gray-600">{order.shippingDetails.address}</p>
              <p className="text-gray-600">
                {order.shippingDetails.city}, {order.shippingDetails.province} {order.shippingDetails.postalCode}
              </p>
              <p className="text-gray-600">{order.shippingDetails.country}</p>
            </div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">Butuh Bantuan?</h3>
            <p className="text-gray-600 mb-4">
              Jika Anda memiliki pertanyaan atau masalah dengan pesanan ini, hubungi tim dukungan kami.
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white w-full">Hubungi Dukungan</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusBadge(status) {
  switch (status) {
    case "completed":
      return <Badge className="bg-black text-white">Selesai</Badge>
    case "processing":
      return <Badge className="bg-gray-500 text-white">Diproses</Badge>
    case "cancelled":
      return <Badge className="bg-gray-700 text-white">Dibatalkan</Badge>
    default:
      return <Badge className="bg-gray-400">Unknown</Badge>
  }
}
