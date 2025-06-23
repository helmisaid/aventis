"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  Tag,
  Mountain,
  Tent,
  Zap,
  Backpack,
  Shield,
  Star,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ArticleCard from "../../components/articles/article-card";
import ArticleCardSkeleton from "../../components/articles/article-card-skeleton";
import Pagination from "../../components/Pagination";

const categories = [
  { name: "Semua", icon: Tag },
  { name: "Pendakian", icon: Mountain },
  { name: "Camping", icon: Tent },
  { name: "Panjat Tebing", icon: Zap },
  { name: "Backpacking", icon: Backpack },
  { name: "Survival", icon: Shield },
  { name: "Review Alat", icon: Star },
];

const featuredArticle = {
  id: "1",
  title: "Pilih Carrier yang Tepat untuk Pendakian di 2025",
  excerpt:
    "Carrier adalah sahabat pendaki sejati! Yuk, kenali teknologi carrier terbaru di 2025 yang ringan, tahan air, dan bikin pundakmu nyaman meski bawa beban berat.",
  image: "/images/article/kerir.jpg",
  category: "Pendakian",
  date: "13 Mei 2025",
  readTime: "7 menit baca",
  author: {
    name: "Helmi Said",
    avatar: "/images/article/helmi_avatar.jpg",
  },
};

const articles = [
  {
    id: "2",
    title: "Gunung Rinjani: Destinasi Pendakian Wajib di 2025",
    excerpt:
      "Rinjani lagi hits banget! Simak tips pendakian, rute terbaik, dan alat wajib bawa biar petualanganmu ke puncak aman dan seru.",
    image: "/images/article/rinjani.jpg",
    category: "Pendakian",
    date: "10 Mei 2025",
    readTime: "6 menit baca",
    author: {
      name: "Helmi Said",
      avatar: "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "3",
    title: "Review Sepatu Pendakian Terbaru: Tahan Banting & Anti Slip",
    excerpt:
      "Cari sepatu pendakian yang kuat di medan berbatu? Kami ulas 3 model sepatu terbaru di Aventis yang bikin langkahmu percaya diri!",
    image: "/images/article/sepatu_daki.jpg",
    category: "Review Alat",
    date: "8 Mei 2025",
    readTime: "5 menit baca",
    author: {
      name: "Siti Aisyah",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&q=80",
    },
  },
  {
    id: "4",
    title: "Tips Camping di Gunung Bromo Biar Gak Kedinginan",
    excerpt:
      "Camping di Bromo itu seru, tapi dinginnya nampol! Ini tips pilih sleeping bag dan tenda yang cocok dari koleksi Aventis Adventure.",
    image: "/images/article/bromo.jpg",
    category: "Camping",
    date: "7 Mei 2025",
    readTime: "6 menit baca",
    author: {
      name: "Helmi Said",
      avatar: "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "5",
    title: "Tren Jaket Windproof untuk Pendakian Musim Hujan",
    excerpt:
      "Musim hujan gak bikin pendakian batal! Cek rekomendasi jaket windproof terbaru yang ringan dan tahan air dari Aventis.",
    image: "/images/article/jaket_windproof.jpg",
    category: "Review Alat",
    date: "6 Mei 2025",
    readTime: "4 menit baca",
    author: {
      name: "Siti Aisyah",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&q=80",
    },
  },
  {
    id: "6",
    title: "Pendakian Gunung Semeru: Persiapan & Alat yang Dibutuhkan",
    excerpt:
      "Semeru selalu jadi impian pendaki! Simak checklist alat pendakian dan tips biar pendakianmu lancar jaya.",
    image: "/images/article/semeru.jpg",
    category: "Pendakian",
    date: "5 Mei 2025",
    readTime: "8 menit baca",
    author: {
      name: "Helmi Said",
      avatar: "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "7",
    title: "Cara Pilih Kompor Camping yang Praktis & Aman",
    excerpt:
      "Mau masak di puncak tanpa ribet? Kami review kompor camping portabel terbaik di Aventis yang hemat bahan bakar.",
    image: "/images/article/kompor.jpg",
    category: "Review Alat",
    date: "4 Mei 2025",
    readTime: "5 menit baca",
    author: {
      name: "Siti Aisyah",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&q=80",
    },
  },
  {
    id: "8",
    title: "Backpacking ke Gunung Prau: Budget & Perlengkapan",
    excerpt:
      "Gunung Prau cocok buat pemula! Ini panduan backpacking hemat plus rekomendasi alat outdoor dari Aventis Adventure.",
    image: "/images/article/prau.jpg",
    category: "Backpacking",
    date: "3 Mei 2025",
    readTime: "7 menit baca",
    author: {
      name: "Helmi Said",
      avatar: "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "9",
    title: "Teknik Survival di Hutan untuk Pendaki Pemula",
    excerpt:
      "Tersesat di hutan? Jangan panik! Pelajari teknik survival dasar dan alat wajib bawa dari Aventis biar aman.",
    image: "/images/article/survival.jpg",
    category: "Survival",
    date: "2 Mei 2025",
    readTime: "6 menit baca",
    author: {
      name: "Siti Aisyah",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&q=80",
    },
  },
  {
    id: "10",
    title: "Panduan Panjat Tebing di Labuan Bajo",
    excerpt:
      "Panjat tebing di Labuan Bajo lagi ngetren! Simak rute populer dan alat panjat rekomendasi dari Aventis Adventure.",
    image: "/images/article/panjat_tebing.jpg",
    category: "Panjat Tebing",
    date: "1 Mei 2025",
    readTime: "5 menit baca",
    author: {
      name: "Helmi Said",
      avatar: "/images/article/helmi_avatar.jpg",
    },
  },
];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredArticles = articles.filter(
    (article) =>
      selectedCategory === "Semua" || article.category === selectedCategory
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Blog Aventis Adventure
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Temukan tips, panduan, dan inspirasi untuk petualangan outdoor
                kamu
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari artikel..."
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Artikel Unggulan</h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        {featuredArticle.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        {featuredArticle.date}
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={
                          featuredArticle.author.avatar || "/placeholder.svg"
                        }
                        alt={featuredArticle.author.name}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm font-medium">
                        {featuredArticle.author.name}
                      </span>
                    </div>
                    <Link href={`/articles/${featuredArticle.id}`}>
                      <Button variant="link" className="text-primary p-0">
                        Baca Selengkapnya{" "}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Header with Category Navigation */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Artikel Terbaru
                </h2>
                <p className="text-gray-600">
                  {selectedCategory === "Semua"
                    ? `Menampilkan ${filteredArticles.length} artikel dari semua kategori`
                    : `Kategori ${selectedCategory} - ${filteredArticles.length} artikel`}
                </p>
              </div>
            </div>

            {/* Category Navigation */}
            <div className="mb-8">
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <nav className="flex flex-wrap items-center gap-8">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = selectedCategory === category.name;
                    const articleCount =
                      category.name === "Semua"
                        ? articles.length
                        : articles.filter(
                            (article) => article.category === category.name
                          ).length;

                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`
                          group flex items-center gap-2 py-2 text-sm font-medium transition-all duration-200 relative
                          ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-600 hover:text-gray-900"
                          }
                        `}
                      >
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-500 group-hover:text-gray-700"
                          }`}
                        />
                        <span>{category.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full transition-colors ${
                            isActive
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                          }`}
                        >
                          {articleCount}
                        </span>

                        {/* Active indicator */}
                        <div
                          className={`
                          absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-900 transition-all duration-200
                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-50"
                          }
                        `}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = selectedCategory === category.name;
                    const articleCount =
                      category.name === "Semua"
                        ? articles.length
                        : articles.filter(
                            (article) => article.category === category.name
                          ).length;

                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`
                          flex items-center gap-2 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 relative
                          ${isActive ? "text-gray-900" : "text-gray-600"}
                        `}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isActive ? "text-gray-900" : "text-gray-500"
                          }`}
                        />
                        <span>{category.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isActive
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {articleCount}
                        </span>

                        {/* Active indicator */}
                        <div
                          className={`
                          absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-900 transition-all duration-200
                          ${isActive ? "opacity-100" : "opacity-0"}
                        `}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  ← Geser untuk melihat kategori lainnya →
                </p>
              </div>

              {/* Separator Line */}
              <div className="mt-6 border-b border-gray-200"></div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Suspense
                fallback={Array.from({ length: 9 }).map((_, i) => (
                  <ArticleCardSkeleton key={i} />
                ))}
              >
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </Suspense>
            </div>

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <Tag className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Belum Ada Artikel
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Belum ada artikel untuk kategori {selectedCategory}. Coba
                    pilih kategori lain.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("Semua")}
                    className="text-gray-900 hover:text-gray-700 font-medium underline underline-offset-4"
                  >
                    Lihat Semua Artikel
                  </button>
                </div>
              </div>
            )}

            <Pagination totalPages={5} currentPage={1} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
