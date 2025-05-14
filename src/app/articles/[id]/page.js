import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Facebook, Heart, Instagram, MessageCircle, Share2, Twitter } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

// Mock article data
const article = {
  id: "1",
  title: "Pilih Carrier yang Tepat untuk Pendakian di 2025",
  content: `
    <p class="lead">Yuk, mulai petualangan pendakianmu dengan carrier yang nyaman! Carrier itu kayak sahabat setia pendaki, bawa semua barangmu tanpa bikin pundak pegal. Di 2025, teknologi carrier makin canggih—ringan, tahan air, dan desainnya bikin kamu gampang gerak. Simak tips pilih carrier terbaik dari Aventis Adventure!</p>
    
    <h2>Kenapa Carrier Penting?</h2>
    <p>Carrier yang tepat bikin pendakianmu lebih asyik. Kalau salah pilih, bisa-bisa pundak sakit atau barangmu basah kuyup pas hujan. Carrier modern sekarang punya bahan ringan kayak nilon ripstop dan rangka aluminium, jadi gak bikin capek meski bawa beban 15-20 kg.</p>
    
    <h2>Ukuran Carrier yang Pas</h2>
    <p>Pilih ukuran carrier sesuai jenis pendakianmu:</p>
    <ul>
      <li><strong>30-40 liter:</strong> Cocok buat pendakian sehari atau ke gunung seperti Prau.</li>
      <li><strong>50-70 liter:</strong> Ideal untuk pendakian 2-3 hari, kayak ke Rinjani atau Semeru.</li>
      <li><strong>80 liter ke atas:</strong> Buat ekspedisi panjang atau pendakian ekstrem.</li>
    </ul>
    <p>Pastikan carrier punya pengaturan torso yang bisa disesuaikan biar pas di punggungmu!</p>
    
    <h2>Fitur yang Harus Dicari</h2>
    <p>Ada beberapa fitur wajib yang bikin carrier top banget:</p>
    <ul>
      <li><strong>Hip belt empuk:</strong> Bantu distribusi beban ke pinggul, bukan pundak.</li>
      <li><strong>Bahan tahan air:</strong> Jaga barangmu tetap kering pas hujan deras.</li>
      <li><strong>Banyak kompartemen:</strong> Biar gampang nyari barang tanpa bongkar semua.</li>
      <li><strong>Ventilasi punggung:</strong> Kurangi keringat di punggung pas cuaca panas.</li>
    </ul>
    <p>Koleksi carrier di Aventis Adventure punya semua fitur ini, lho!</p>
    
    <h2>Rekomendasi Carrier dari Aventis</h2>
    <p>Kami punya beberapa model carrier terbaru di 2025 yang lagi hits:</p>
    <ul>
      <li><strong>Aventis TrailLite 50L:</strong> Super ringan (1.5 kg), cocok buat pendaki pemula.</li>
      <li><strong>Aventis StormGuard 65L:</strong> Tahan air 100%, ideal untuk musim hujan.</li>
      <li><strong>Aventis ProTrek 80L:</strong> Buat pendaki pro yang bawa banyak barang.</li>
    </ul>
    <p>Cek koleksi lengkapnya di website Aventis Adventure, ada diskon khusus bulan ini!</p>
    
    <h2>Tips Merawat Carrier</h2>
    <p>Biar carrier awet, rawat dengan cara ini:</p>
    <ul>
      <li>Bersihkan pakai kain lembap setelah pendakian.</li>
      <li>Jangan simpan di tempat lembap biar gak jamuran.</li>
      <li>Periksa resleting dan jahitan rutin, biar gak rusak pas di gunung.</li>
    </ul>
    
    <h2>Kesimpulan</h2>
    <p>Pilih carrier itu gak cuma soal kapasitas, tapi juga kenyamanan dan fitur yang sesuai kebutuhanmu. Dengan carrier yang tepat dari Aventis Adventure, pendakianmu di 2025 bakal lebih seru dan gak ribet. Yuk, siapin gear-mu sekarang dan taklukkan puncak impianmu!</p>
  `,
  image: "/images/article/kerir.jpg",
  category: "Pendakian",
  date: "13 Mei 2025",
  readTime: "7 menit baca",
  author: {
    name: "Helmi Said",
    avatar: "/images/article/helmi_avatar.jpg",
    bio: "Pendaki dan penggemar alam yang sudah menjelajahi gunung-gunung di Indonesia selama 3 tahun. Suka berbagi tips biar pendakianmu makin asyik!",
  },
  tags: ["Pendakian", "Carrier", "Alat Outdoor", "Tips Pendakian", "Aventis"],
};

// Mock related articles
const relatedArticles = [
  {
    id: "2",
    title: "Gunung Rinjani: Destinasi Pendakian Wajib di 2025",
    excerpt: "Rinjani lagi hits banget! Simak tips pendakian, rute terbaik, dan alat wajib bawa biar petualanganmu ke puncak aman dan seru.",
    image: "/images/article/rinjani.jpg",
    category: "Pendakian",
    date: "10 Mei 2025",
  },
  {
    id: "3",
    title: "Review Sepatu Pendakian Terbaru: Tahan Banting & Anti Slip",
    excerpt: "Cari sepatu pendakian yang kuat di medan berbatu? Kami ulas 3 model sepatu terbaru di Aventis yang bikin langkahmu percaya diri!",
    image: "/images/article/sepatu_daki.jpg",
    category: "Review Alat",
    date: "8 Mei 2025",
  },
  {
    id: "6",
    title: "Pendakian Gunung Semeru: Persiapan & Alat yang Dibutuhkan",
    excerpt: "Semeru selalu jadi impian pendaki! Simak checklist alat pendakian dan tips biar pendakianmu lancar jaya.",
    image: "/images/article/semeru.jpg",
    category: "Pendakian",
    date: "5 Mei 2025",
  },
];

export default function ArticleDetailPage({ params }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] bg-gray-900">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <Link
                  href={`/articles?category=${article.category}`}
                  className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {article.category}
                </Link>
                <span className="mx-2 text-white/70">•</span>
                <div className="flex items-center text-white/70 text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {article.date}
                </div>
                <span className="mx-2 text-white/70">•</span>
                <div className="flex items-center text-white/70 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{article.title}</h1>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                  <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                  <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{article.author.name}</p>
                  <p className="text-white/70 text-sm">Penulis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <article className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  {/* Social Share Buttons */}
                  <div className="flex justify-end mb-6 space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Bagikan ke Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Bagikan ke Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Bagikan ke Instagram</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Bagikan</span>
                    </Button>
                  </div>

                  {/* Article Content */}
                  <div
                    className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Tags */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3">Tag</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/articles?tag=${tag}`}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-start">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{article.author.name}</h3>
                        <p className="text-gray-600 mt-1">{article.author.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Komentar (12)</h3>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Tambah Komentar
                      </Button>
                    </div>

                    {/* Sample Comments */}
                    <div className="space-y-6">
                      {[
                        {
                          user: "Alim",
                          avatar: "/images/article/alim_avatar.jpg",
                          text: "Artikelnya membantu banget! Aku baru mau beli carrier, kayaknya Aventis TrailLite oke nih buat pemula.",
                          likes: 10,
                          daysAgo: 1,
                        },
                        {
                          user: "George",
                          avatar: "/images/article/george_avatar.jpg",
                          text: "Tips perawatannya bermanfaat! Carrierku sebelumnya cepet rusak gara-gara gak dirawat.",
                          likes: 7,
                          daysAgo: 2,
                        },
                        {
                          user: "Ghifa",
                          avatar: "/images/article/ghifa_avatar.jpg",
                          text: "Ada rekomendasi carrier yang cocok buat naik ke rinjani? Aku cari yang ringan tapi kuat.",
                          likes: 5,
                          daysAgo: 3,
                        },
                      ].map((comment, i) => (
                        <div key={i} className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{comment.user}</h4>
                              <span className="text-xs text-gray-500">{`${comment.daysAgo} hari lalu`}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{comment.text}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <button className="text-xs text-gray-500 flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                {comment.likes}
                              </button>
                              <button className="text-xs text-gray-500">Balas</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      Muat Komentar Lain
                    </Button>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* Related Articles */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Artikel Terkait</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Link key={article.id} href={`/articles/${article.id}`} className="flex gap-3 group">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Kategori</h3>
                  <div className="space-y-2">
                    {["Pendakian", "Camping", "Panjat Tebing", "Backpacking", "Survival", "Review Alat"].map((category) => (
                      <Link
                        key={category}
                        href={`/articles?category=${category}`}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:text-primary transition-colors"
                      >
                        <span>{category}</span>
                        <span className="text-sm text-gray-500">{`(${Math.floor(Math.random() * 20) + 5})`}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Tag Populer</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Pendakian",
                      "Camping",
                      "Alat Outdoor",
                      "Petualangan",
                      "Gunung",
                      "Backpacking",
                      "Panjat Tebing",
                      "Trekking",
                      "Alam",
                      "Survival",
                      "Rinjani",
                      "Semeru",
                    ].map((tag) => (
                      <Link
                        key={tag}
                        href={`/articles?tag=${tag}`}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
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