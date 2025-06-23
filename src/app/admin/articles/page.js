// app/admin/articles/page.jsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Asumsi komponen UI sudah ada
import { Input } from "@/components/ui/input"; // Asumsi komponen UI sudah ada
import { Badge } from "@/components/ui/badge"; // Asumsi komponen UI sudah ada
import { cn } from "@/lib/utils"; // Asumsi utilitas cn sudah ada

// Mock Data (sesuaikan dengan struktur data yang telah dianalisis)
const initialArticlesData = [
  {
    id: "1",
    title: "Pilih Carrier yang Tepat untuk Pendakian di 2025",
    slug: "pilih-carrier-tepat-pendakian-2025",
    image: "/images/article/kerir.jpg",
    category: "Pendakian",
    authorName: "Helmi Said",
    status: "Published",
    date: "2025-05-13T10:00:00Z", // Tanggal publikasi/pembuatan
    excerpt: "Yuk, mulai petualangan pendakianmu dengan carrier yang nyaman!",
  },
  {
    id: "2",
    title: "Gunung Rinjani: Destinasi Pendakian Wajib di 2025",
    slug: "gunung-rinjani-destinasi-wajib-2025",
    image: "/images/article/rinjani.jpg",
    category: "Pendakian",
    authorName: "Aventis Team",
    status: "Published",
    date: "2025-05-10T00:00:00Z",
    excerpt: "Rinjani lagi hits banget! Simak tips pendakian, rute terbaik...",
  },
  {
    id: "3",
    title: "Review Sepatu Pendakian Terbaru: Tahan Banting & Anti Slip",
    slug: "review-sepatu-pendakian-terbaru",
    image: "/images/article/sepatu_daki.jpg",
    category: "Review Alat",
    authorName: "Helmi Said",
    status: "Draft",
    date: "2025-05-08T00:00:00Z",
    excerpt:
      "Cari sepatu pendakian yang kuat di medan berbatu? Kami ulas 3 model...",
  },
  // Tambahkan lebih banyak artikel untuk menguji paginasi dan pencarian
];

const ITEMS_PER_PAGE = 5;

export default function AdminArticlesListPage() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi pengambilan data
    setTimeout(() => {
      setArticles(initialArticlesData);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteArticle = (articleId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId)
      );
      // Di aplikasi nyata, panggil API untuk menghapus
      console.log(`Artikel ${articleId} dihapus`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case "published":
        return "success"; // Anda mungkin perlu mendefinisikan varian ini di Badge component
      case "draft":
        return "secondary";
      case "archived":
        return "outline";
      default:
        return "default";
    }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Daftar Artikel
        </h1>
        <Link href="/admin/articles/create" passHref>
          <Button className="inline-flex items-center">
            <PlusCircle size={18} className="mr-2" />
            Tambah Artikel Baru
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Cari artikel (judul, kategori, penulis)..."
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Gambar
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Judul
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kategori
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Penulis
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Tanggal
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="w-16 h-10 relative">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="text-sm font-medium text-gray-900 max-w-xs truncate"
                      title={article.title}
                    >
                      {article.title}
                    </div>
                    <div
                      className="text-xs text-gray-500 max-w-xs truncate"
                      title={article.excerpt}
                    >
                      {article.excerpt}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {article.category}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {article.authorName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(article.status)}>
                      {article.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {formatDate(article.date)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Lihat Artikel (End-User)"
                        passHref
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Link
                        href={`/admin/articles/edit/${article.id}`}
                        title="Edit Artikel"
                        passHref
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteArticle(article.id)}
                        title="Hapus Artikel"
                        className="h-8 w-8"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  Tidak ada artikel ditemukan.
                  {searchTerm && " Coba ubah kata kunci pencarian Anda."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-700">
            Menampilkan{" "}
            <span className="font-medium">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            sampai{" "}
            <span className="font-medium">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)}
            </span>{" "}
            dari <span className="font-medium">{filteredArticles.length}</span>{" "}
            hasil
          </div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
