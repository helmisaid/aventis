"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  PlusCircle,
  ListFilter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allProducts } from "@/data/products";

// Konversi data produk yang sudah ada ke format admin
const convertProductsToAdminFormat = (products) => {
  return products.map((product) => ({
    id: product.id.toString(),
    sku: `AVN-${product.category.toUpperCase().slice(0, 3)}-${product.id
      .toString()
      .padStart(3, "0")}`,
    name: product.name,
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, "-"),
    imageUrl: product.image,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice || product.price,
    stockQuantity: Math.floor(Math.random() * 100) + 10,
    status: "Published",
    description:
      product.description ||
      `${product.name} - Produk berkualitas tinggi untuk kebutuhan outdoor Anda.`,
    tags: [product.category.toLowerCase(), "outdoor", "adventure"],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    updatedAt: new Date().toISOString(),
    discount: product.discount || 0,
    isNew: product.isNew || false,
    isBestSeller: product.isBestSeller || false,
  }));
};

const PRODUCT_CATEGORIES = [
  "Tas & Carrier",
  "Sepatu",
  "Tenda",
  "Jaket & Pakaian",
  "Aksesoris",
  "Peralatan Masak",
];
const PRODUCT_STATUSES = ["Published", "Draft", "Archived"];
const ITEMS_PER_PAGE = 8;

const formatCurrency = (amount, currency = "IDR") =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);

const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "published":
      return "default";
    case "draft":
      return "secondary";
    case "archived":
      return "outline";
    default:
      return "default";
  }
};

const getStockBadgeVariant = (stock) => {
  if (stock <= 0) return "destructive";
  if (stock < 10) return "secondary";
  return "default";
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    const adminProducts = convertProductsToAdminFormat(allProducts);
    setTimeout(() => {
      setProducts(adminProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products
      .filter((product) => {
        const searchMatch =
          searchTerm.toLowerCase() === "" ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch =
          categoryFilter === "all" || product.category === categoryFilter;
        const statusMatch =
          statusFilter === "all" || product.status === statusFilter;
        return searchMatch && categoryMatch && statusMatch;
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSelectProduct = (productId, checked) => {
    setSelectedProductIds((prev) =>
      checked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  const handleSelectAllProducts = (checked) => {
    if (checked) {
      setSelectedProductIds(paginatedProducts.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedProductIds.length === 0) {
      alert("Pilih produk yang ingin dihapus.");
      return;
    }
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus ${selectedProductIds.length} produk terpilih?`
      )
    ) {
      setProducts((prev) =>
        prev.filter((p) => !selectedProductIds.includes(p.id))
      );
      setSelectedProductIds([]);
      console.log("Produk terpilih dihapus:", selectedProductIds);
    }
  };

  const handleDeleteProduct = (productId, productName) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus produk "${productName}"?`
      )
    ) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
      console.log(`Produk ${productId} dihapus`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Kelola Produk
          </h1>
          <p className="text-gray-600 mt-1">
            Tambahkan, edit, dan atur semua produk Anda.
          </p>
        </div>
        <Link href="/admin/products/create">
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105 font-medium">
            <PlusCircle className="h-4 w-4" />
            Tambah Produk Baru
          </button>
        </Link>
      </div>

      {/* Filter Card */}
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
            <ListFilter className="h-5 w-5" />
            Filter & Cari Produk
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div>
            <Label
              htmlFor="searchProduct"
              className="text-sm font-medium text-gray-700"
            >
              Cari (Nama, SKU)
            </Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="searchProduct"
                type="text"
                placeholder="Ketik nama atau SKU..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 border-gray-200 focus:border-gray-900 focus:ring-gray-900 hover:border-gray-300 transition-colors"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="categoryFilter"
              className="text-sm font-medium text-gray-700"
            >
              Kategori
            </Label>
            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger
                id="categoryFilter"
                className="w-full mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors"
              >
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="statusFilterProduct"
              className="text-sm font-medium text-gray-700"
            >
              Status Publikasi
            </Label>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger
                id="statusFilterProduct"
                className="w-full mt-2 border-gray-200  hover:border-gray-300 transition-colors"
              >
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                {PRODUCT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedProductIds.length > 0 && (
        <Card className="bg-gray-900 text-white border border-gray-800 shadow-lg">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm font-medium">
              {selectedProductIds.length} produk terpilih.
            </p>
            <div className="flex gap-2">
              <button
                className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() =>
                  alert(
                    `Aksi 'Ubah Status' untuk ${selectedProductIds.length} produk (belum diimplementasi)`
                  )
                }
              >
                Ubah Status
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={handleBulkDelete}
              >
                Hapus Terpilih
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedProductIds.length === paginatedProducts.length &&
                      paginatedProducts.length > 0
                    }
                    onCheckedChange={handleSelectAllProducts}
                    aria-label="Pilih semua produk di halaman ini"
                    className="border-gray-300"
                  />
                </TableHead>
                <TableHead className="w-[80px] font-semibold text-gray-900">
                  Gambar
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Nama Produk
                </TableHead>
                <TableHead className="hidden md:table-cell font-semibold text-gray-900">
                  SKU
                </TableHead>
                <TableHead className="hidden lg:table-cell font-semibold text-gray-900">
                  Kategori
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-900">
                  Harga
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-900">
                  Stok
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Status
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-900">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                      selectedProductIds.includes(product.id)
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedProductIds.includes(product.id)}
                        onCheckedChange={(checked) =>
                          handleSelectProduct(product.id, checked)
                        }
                        aria-label={`Pilih produk ${product.name}`}
                        className="border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-200"
                          sizes="64px"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link
                        href={`/products/${product.id}`}
                        target="_blank"
                        className="hover:text-gray-900 hover:underline transition-colors duration-150 font-semibold"
                        title="Lihat di Halaman Publik"
                      >
                        {product.name}
                      </Link>
                      <p
                        className="text-xs text-gray-500 max-w-xs truncate mt-1"
                        title={product.description}
                      >
                        {product.description}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {product.isNew && (
                          <Badge className="bg-gray-900 text-white text-xs px-2 py-1 hover:bg-gray-800 transition-colors">
                            Baru
                          </Badge>
                        )}
                        {product.isBestSeller && (
                          <Badge className="bg-gray-600 text-white text-xs px-2 py-1 hover:bg-gray-700 transition-colors">
                            Terlaris
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-gray-600 font-mono">
                      {product.sku}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200 transition-colors"
                      >
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatCurrency(product.price)}
                      {product.discount > 0 && (
                        <div className="text-xs text-gray-500 line-through">
                          {formatCurrency(product.originalPrice)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={getStockBadgeVariant(product.stockQuantity)}
                        className={`${
                          product.stockQuantity <= 0
                            ? "bg-red-100 text-red-800 border-red-200"
                            : product.stockQuantity < 10
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        } font-medium`}
                      >
                        {product.stockQuantity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(product.status)}
                        className={`${
                          product.status === "Published"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : product.status === "Draft"
                            ? "bg-gray-100 text-gray-800 border-gray-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        } font-medium`}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 border border-transparent hover:border-gray-200">
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 border border-gray-200 shadow-lg"
                        >
                          <DropdownMenuLabel className="text-gray-900 font-semibold">
                            Aksi Cepat
                          </DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/products/${product.id}`}
                              target="_blank"
                              className="flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="mr-2 h-4 w-4" /> Lihat Publik
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              className="flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit Produk
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-200" />
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-gray-700">
                              Ubah Status
                            </DropdownMenuLabel>
                            {PRODUCT_STATUSES.filter(
                              (s) => s !== product.status
                            ).map((newStatus) => (
                              <DropdownMenuCheckboxItem
                                key={newStatus}
                                onSelect={() => {
                                  console.log(
                                    `Ubah status produk ${product.id} menjadi ${newStatus}`
                                  );
                                  setProducts((prev) =>
                                    prev.map((p) =>
                                      p.id === product.id
                                        ? { ...p, status: newStatus }
                                        : p
                                    )
                                  );
                                }}
                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                              >
                                Jadikan {newStatus}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator className="bg-gray-200" />
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteProduct(product.id, product.name)
                            }
                            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Hapus Produk
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-24 text-center text-gray-500"
                  >
                    Tidak ada produk ditemukan.
                    {(searchTerm ||
                      categoryFilter !== "all" ||
                      statusFilter !== "all") &&
                      " Coba ubah filter atau kata kunci pencarian Anda."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-700">
            Menampilkan{" "}
            <span className="font-medium text-gray-900">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            sampai{" "}
            <span className="font-medium text-gray-900">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
            </span>{" "}
            dari{" "}
            <span className="font-medium text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            hasil
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-150 font-medium text-gray-700 hover:border-gray-400"
            >
              <ChevronLeft className="h-4 w-4" /> Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-150 font-medium text-gray-700 hover:border-gray-400"
            >
              Berikutnya <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
