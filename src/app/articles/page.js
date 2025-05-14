import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ArticleCard from "../../components/articles/article-card";
import ArticleCardSkeleton from "../../components/articles/article-card-skeleton";
import Pagination from "../../components/Pagination";

const categories = [
  "Semua",
  "Pendakian",
  "Camping",
  "Panjat Tebing",
  "Backpacking",
  "Survival",
  "Review Alat",
];

const featuredArticle = {
  id: "1",
  title: "Pilih Carrier yang Tepat untuk Pendakian di 2025",
  excerpt:
    "Carrier adalah sahabat pendaki sejati! Yuk, kenali teknologi carrier terbaru di 2025 yang ringan, tahan air, dan bikin pundakmu nyaman meski bawa beban berat.",
  image:
    "/images/article/kerir.jpg",
  category: "Pendakian",
  date: "13 Mei 2025",
  readTime: "7 menit baca",
  author: {
    name: "Helmi Said",
    avatar:
      "/images/article/helmi_avatar.jpg",
  },
};

const articles = [
  {
    id: "2",
    title: "Gunung Rinjani: Destinasi Pendakian Wajib di 2025",
    excerpt:
      "Rinjani lagi hits banget! Simak tips pendakian, rute terbaik, dan alat wajib bawa biar petualanganmu ke puncak aman dan seru.",
    image:
      "/images/article/rinjani.jpg",
    category: "Pendakian",
    date: "10 Mei 2025",
    readTime: "6 menit baca",
    author: {
      name: "Helmi Said",
      avatar:
        "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "3",
    title: "Review Sepatu Pendakian Terbaru: Tahan Banting & Anti Slip",
    excerpt:
      "Cari sepatu pendakian yang kuat di medan berbatu? Kami ulas 3 model sepatu terbaru di Aventis yang bikin langkahmu percaya diri!",
    image:
      "/images/article/sepatu_daki.jpg",
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
    image:
      "/images/article/bromo.jpg",
    category: "Camping",
    date: "7 Mei 2025",
    readTime: "6 menit baca",
    author: {
      name: "Helmi Said",
      avatar:
        "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "5",
    title: "Tren Jaket Windproof untuk Pendakian Musim Hujan",
    excerpt:
      "Musim hujan gak bikin pendakian batal! Cek rekomendasi jaket windproof terbaru yang ringan dan tahan air dari Aventis.",
    image:
      "/images/article/jaket_windproof.jpg",
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
    image:
      "/images/article/semeru.jpg",
    category: "Pendakian",
    date: "5 Mei 2025",
    readTime: "8 menit baca",
    author: {
      name: "Helmi Said",
      avatar:
        "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "7",
    title: "Cara Pilih Kompor Camping yang Praktis & Aman",
    excerpt:
      "Mau masak di puncak tanpa ribet? Kami review kompor camping portabel terbaik di Aventis yang hemat bahan bakar.",
    image:
      "/images/article/kompor.jpg",
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
    image:
      "/images/article/prau.jpg",
    category: "Backpacking",
    date: "3 Mei 2025",
    readTime: "7 menit baca",
    author: {
      name: "Helmi Said",
      avatar:
        "/images/article/helmi_avatar.jpg",
    },
  },
  {
    id: "9",
    title: "Teknik Survival di Hutan untuk Pendaki Pemula",
    excerpt:
      "Tersesat di hutan? Jangan panik! Pelajari teknik survival dasar dan alat wajib bawa dari Aventis biar aman.",
    image:
      "/images/article/survival.jpg",
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
    image:
      "/images/article/panjat_tebing.jpg",
    category: "Panjat Tebing",
    date: "1 Mei 2025",
    readTime: "5 menit baca",
    author: {
      name: "Helmi Said",
      avatar:
        "/images/article/helmi_avatar.jpg",
    },
  },
];

export default function ArticlesPage() {
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
            <Tabs defaultValue="Semua" className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Artikel Terbaru</h2>
                <TabsList className="bg-white">
                  {categories.slice(0, 5).map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="text-sm"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="Lainnya" className="text-sm">
                    Lainnya
                  </TabsTrigger>
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Suspense
                      fallback={Array.from({ length: 9 }).map((_, i) => (
                        <ArticleCardSkeleton key={i} />
                      ))}
                    >
                      {articles
                        .filter(
                          (article) =>
                            category === "Semua" ||
                            article.category === category
                        )
                        .map((article) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                    </Suspense>
                  </div>
                </TabsContent>
              ))}

              <TabsContent value="Lainnya" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {categories.slice(5).map((category) => (
                    <Link
                      key={category}
                      href={`/articles?category=${category}`}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Tag className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">{category}</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Pagination totalPages={5} currentPage={1} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
