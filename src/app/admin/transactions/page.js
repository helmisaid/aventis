// app/admin/transactions/page.jsx
"use client";


import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search, Eye, Edit, MoreVertical, Filter, CalendarDays, ChevronLeft, ChevronRight, CircleDollarSign, PackageCheck, Truck, CheckCircle, XCircle, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Asumsi Anda menggunakan komponen Table dari shadcn/ui atau sejenisnya
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Untuk aksi update status
import { cn } from "@/lib/utils";

// Mock Data Transaksi
const initialTransactionsData = [
  {
    id: "ORD-20250530-001",
    customerName: "Budi Santoso",
    customerEmail: "budi.santoso@example.com",
    orderDate: "2025-05-30T10:15:00Z",
    totalAmount: 1250000,
    status: "Processing",
    paymentMethod: "Bank Transfer",
    items: [{ productName: "Aventis TrailLite 50L Carrier", quantity: 1 }],
  },
  {
    id: "ORD-20250529-003",
    customerName: "Citra Lestari",
    customerEmail: "citra.lestari@example.com",
    orderDate: "2025-05-29T14:30:00Z",
    totalAmount: 980000,
    status: "Shipped",
    paymentMethod: "Credit Card",
    items: [{ productName: "Sepatu Daki ProMax XT", quantity: 1 }],
  },
  {
    id: "ORD-20250529-002",
    customerName: "Agus Wijaya",
    customerEmail: "agus.wijaya@example.com",
    orderDate: "2025-05-29T09:00:00Z",
    totalAmount: 1750000,
    status: "Pending Payment",
    paymentMethod: "Virtual Account",
    items: [{ productName: "Tenda Kemah Aventis Dome Pro (4 Orang)", quantity: 1 }],
  },
  {
    id: "ORD-20250528-001",
    customerName: "Dewi Anggraini",
    customerEmail: "dewi.anggraini@example.com",
    orderDate: "2025-05-28T11:45:00Z",
    totalAmount: 850000,
    status: "Completed",
    paymentMethod: "GoPay",
    items: [{ productName: "Jaket Gunung Aventis Summit Series", quantity: 1 }],
  },
  {
    id: "ORD-20250527-005",
    customerName: "Eko Prasetyo",
    customerEmail: "eko.prasetyo@example.com",
    orderDate: "2025-05-27T16:20:00Z",
    totalAmount: 300000,
    status: "Cancelled",
    paymentMethod: "Bank Transfer",
    items: [{ productName: "Sleeping Bag Aventis Comfort", quantity: 1 }],
  },
  // Tambahkan data lain untuk paginasi dan filter
];

const TRANSACTION_STATUSES = [
  "Pending Payment", "Processing", "Shipped", "Completed", "Cancelled", "Refunded"
];

const ITEMS_PER_PAGE = 10;

// Helper untuk format mata uang
const formatCurrency = (amount, currency = "IDR") => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper untuk format tanggal
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
};

// Helper untuk warna badge status
const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "completed": return "success"; // hijau (perlu custom variant di Badge component)
    case "shipped": return "info"; // biru muda (perlu custom variant di Badge component)
    case "processing": return "warning"; // kuning (perlu custom variant di Badge component)
    case "pending payment": return "secondary"; // abu-abu
    case "cancelled": return "destructive"; // merah
    case "refunded": return "outline"; // outline
    default: return "default";
  }
};
const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "completed": return <CheckCircle className="h-4 w-4 mr-2 text-green-600" />;
    case "shipped": return <Truck className="h-4 w-4 mr-2 text-blue-600" />;
    case "processing": return <RefreshCw className="h-4 w-4 mr-2 text-yellow-600 animate-spin-slow" />;
    case "pending payment": return <CircleDollarSign className="h-4 w-4 mr-2 text-gray-600" />;
    case "cancelled": return <XCircle className="h-4 w-4 mr-2 text-red-600" />;
    case "refunded": return <PackageCheck className="h-4 w-4 mr-2 text-purple-600" />; // Menggunakan PackageCheck sebagai contoh
    default: return null;
  }
};


export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  // const [dateRangeFilter, setDateRangeFilter] = useState({ from: null, to: null }); // Untuk masa depan
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      setTransactions(initialTransactionsData);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions
      .filter(transaction => {
        const searchMatch = searchTerm.toLowerCase() === "" ||
          transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = statusFilter === "all" || transaction.status === statusFilter;
        // Tambahkan filter tanggal di sini jika diimplementasikan
        return searchMatch && statusMatch;
      })
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Urutkan terbaru dulu
  }, [transactions, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const handleUpdateStatus = (transactionId, newStatus) => {
    // Di aplikasi nyata, panggil API untuk update status
    console.log(`Update status transaksi ${transactionId} menjadi ${newStatus}`);
    setTransactions(prev =>
      prev.map(t => (t.id === transactionId ? { ...t, status: newStatus } : t))
    );
    // Tampilkan notifikasi sukses
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Manajemen Transaksi
        </h1>
        <p className="text-gray-500 mt-1">Lihat dan kelola semua pesanan pelanggan.</p>
      </div>

      {/* Filter dan Pencarian */}
      <Card className="mb-6">
        <CardHeader>
            <CardTitle className="text-lg">Filter Transaksi</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="search">Cari (ID Pesanan, Nama, Email)</Label>
            <div className="relative mt-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                type="text"
                placeholder="Ketik untuk mencari..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="statusFilter">Status Pesanan</Label>
            <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setCurrentPage(1); }}>
              <SelectTrigger id="statusFilter" className="w-full mt-1">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                {TRANSACTION_STATUSES.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            {/* Placeholder untuk Date Range Picker */}
            <Label htmlFor="dateRange">Rentang Tanggal (Segera Hadir)</Label>
             <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal" disabled>
                <CalendarDays className="mr-2 h-4 w-4" />
                Pilih Rentang Tanggal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabel Transaksi */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead className="hidden md:table-cell">Tanggal</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium text-primary hover:underline">
                    <Link href={`/admin/transactions/${transaction.id}`}>{transaction.id}</Link>
                  </TableCell>
                  <TableCell>
                    <div>{transaction.customerName}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">{transaction.customerEmail}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(transaction.orderDate)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(transaction.totalAmount)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(transaction.status)} className="whitespace-nowrap items-center flex w-fit">
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Aksi</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Pilih Aksi</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/transactions/${transaction.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        {TRANSACTION_STATUSES.filter(s => s !== transaction.status).map(newStatus => (
                           <DropdownMenuItem key={newStatus} onClick={() => handleUpdateStatus(transaction.id, newStatus)}>
                             {getStatusIcon(newStatus)} Tandai sebagai {newStatus}
                           </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Tidak ada transaksi ditemukan.
                  { (searchTerm || statusFilter !== 'all') && " Coba ubah filter atau kata kunci pencarian Anda." }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginasi */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>
            {' '}sampai <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)}</span>
            {' '}dari <span className="font-medium">{filteredTransactions.length}</span> hasil
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" /> Sebelumnya
            </Button>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Berikutnya <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}