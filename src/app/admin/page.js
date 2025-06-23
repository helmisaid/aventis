"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  ArrowRight,
  BarChartBig,
  CalendarDays,
  Eye,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

// Helper for currency formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Mock data
const initialDashboardData = {
  stats: [
    {
      title: "Total Pendapatan",
      value: 45231890,
      icon: DollarSign,
      trend: "+20.1% dari bulan lalu",
      link: "/admin/transactions",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pesanan",
      value: 573,
      icon: ShoppingCart,
      trend: "+12.4% dari bulan lalu",
      link: "/admin/transactions",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Produk",
      value: 128,
      icon: Package,
      trend: "+4 produk baru bulan ini",
      link: "/admin/products",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Pengguna Aktif",
      value: 2350,
      icon: Users,
      trend: "+10.1% dari bulan lalu",
      link: "/admin/users",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ],
  recentOrders: [
    {
      id: "ORD-001",
      customer: "Budi Santoso",
      status: "Selesai",
      date: "2025-05-28",
      amount: 1250000,
      avatar: "BS",
    },
    {
      id: "ORD-002",
      customer: "Citra Lestari",
      status: "Diproses",
      date: "2025-05-29",
      amount: 850000,
      avatar: "CL",
    },
    {
      id: "ORD-003",
      customer: "Agus Wijaya",
      status: "Dikirim",
      date: "2025-05-29",
      amount: 2100000,
      avatar: "AW",
    },
    {
      id: "ORD-004",
      customer: "Dewi Anggraini",
      status: "Menunggu",
      date: "2025-05-30",
      amount: 750000,
      avatar: "DA",
    },
    {
      id: "ORD-005",
      customer: "Eko Prasetyo",
      status: "Selesai",
      date: "2025-05-30",
      amount: 1800000,
      avatar: "EP",
    },
    {
      id: "ORD-006",
      customer: "Fitri Handayani",
      status: "Dibatalkan",
      date: "2025-05-27",
      amount: 300000,
      avatar: "FH",
    },
  ],
  salesOverTime: [
    { month: "Des '24", revenue: 30000000, orders: 350 },
    { month: "Jan '25", revenue: 35000000, orders: 400 },
    { month: "Feb '25", revenue: 28000000, orders: 320 },
    { month: "Mar '25", revenue: 40000000, orders: 450 },
    { month: "Apr '25", revenue: 38000000, orders: 420 },
    { month: "Mei '25", revenue: 45231890, orders: 573 },
  ],
};

const getStatusClassNames = (status) => {
  switch (status) {
    case "Selesai":
      return "bg-green-100 text-green-700 border-green-200";
    case "Diproses":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Dikirim":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Menunggu":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Dibatalkan":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardData(initialDashboardData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-2xl shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Dashboard Admin
          </h1>
          <p className="text-gray-600 mt-1">
            Selamat datang kembali! Berikut ringkasan toko Anda.
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm transition-colors duration-200 shrink-0">
          <CalendarDays className="h-4 w-4 mr-2" />
          Pilih Rentang Tanggal
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.link || "#"}
            className="block group"
          >
            <Card className="hover:shadow-lg transition-all duration-300 group-hover:scale-105 bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    stat.bgColor
                  )}
                >
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.title === "Total Pendapatan"
                    ? formatCurrency(stat.value)
                    : stat.value.toLocaleString("id-ID")}
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <BarChartBig className="h-5 w-5 mr-2 text-blue-600" />
              Ringkasan Penjualan (6 Bulan Terakhir)
            </CardTitle>
            <CardDescription className="text-gray-600">
              Tren pendapatan dan pesanan.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] sm:h-[400px] p-2 sm:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dashboardData.salesOverTime}
                margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280" }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#3B82F6"
                  fontSize={12}
                  tickFormatter={(value) => `${value / 1000000}Jt`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#10B981"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    color: "#374151",
                  }}
                  formatter={(value, name) => {
                    if (name === "Pendapatan")
                      return [formatCurrency(value), "Pendapatan"];
                    return [value.toLocaleString("id-ID"), name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", color: "#6B7280" }} />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="Pendapatan"
                  fill="#3B82F6"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                />
                <Bar
                  yAxisId="right"
                  dataKey="orders"
                  name="Pesanan"
                  fill="#10B981"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-1 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Pesanan Terbaru
              </CardTitle>
              <CardDescription className="text-gray-600">
                {dashboardData.recentOrders.length} pesanan baru minggu ini.
              </CardDescription>
            </div>
            <Link href="/admin/transactions">
              <button className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors duration-200">
                Lihat Semua
                <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {dashboardData.recentOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-semibold text-white">
                      {order.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.customer}
                      </p>
                      <p className="text-xs text-gray-500">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(order.amount)}
                    </p>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full border",
                        getStatusClassNames(order.status)
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <Link href={`/admin/transactions/${order.id}`}>
                    <button
                      className="h-8 w-8 rounded-lg hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      title="Lihat Pesanan"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
