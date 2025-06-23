// app/about/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar"; // Sesuaikan path jika perlu
import Footer from "@/components/footer"; // Sesuaikan path jika perlu
import { Button } from "@/components/ui/button"; // Asumsi komponen ini ada
import {
  Users,
  MountainSnow,
  Compass,
  Heart,
  ShieldCheck,
  Zap,
  MessageSquareHeart,
  UsersRound,
} from "lucide-react"; 

export default function AboutAventisPage() {
  const teamMembers = [
    {
      name: "Helmi Said Hidayatulloh",
      role: "Founder & CEO",
      bio: "Seorang pendaki berpengalaman yang percaya bahwa alam adalah guru terbaik. Mendirikan Aventis untuk berbagi semangat petualangan.",
      image: "/images/article/helmi_avatar.jpg", 
    },
    {
      name: "Muhammad Irfan Maulana",
      role: "Head of Product",
      bio: "Memastikan setiap produk Aventis memiliki kualitas terbaik dan inovatif untuk mendukung setiap petualangan.",
      image: "/images/article/irfan.jpg", 
    },
    {
      name: "Ghazi Al Ghifari. M",
      role: "Lead Content Creator",
      bio: "Bertanggung jawab atas artikel inspiratif dan tips berguna agar petualanganmu semakin aman dan menyenangkan.",
      image: "/images/article/ghifa_avatar.jpg", 
    },
  ];

  const values = [
    {
      icon: <Zap className="h-10 w-10 text-primary mb-3" />,
      title: "Inovasi",
      description:
        "Kami terus berinovasi untuk menghadirkan perlengkapan petualangan terbaik dengan teknologi terkini.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary mb-3" />,
      title: "Kualitas & Keamanan",
      description:
        "Setiap produk dirancang dengan standar kualitas dan keamanan tertinggi untuk menemani setiap langkahmu.",
    },
    {
      icon: <UsersRound className="h-10 w-10 text-primary mb-3" />,
      title: "Komunitas",
      description:
        "Kami membangun komunitas para petualang untuk saling berbagi, menginspirasi, dan bertumbuh bersama.",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary mb-3" />,
      title: "Semangat Petualangan",
      description:
        "Mendorong setiap orang untuk berani menjelajah, menemukan hal baru, dan mencintai alam.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] bg-gray-800 text-white flex items-center justify-center text-center">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1571738318198-fda6afce5348?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Ganti dengan gambar hero yang relevan
              alt="Tim Aventis di alam terbuka"
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
          <div className="relative z-10 p-4 container mx-auto">
            <Compass className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Tentang Aventis Adventure
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Menemani Setiap Langkah Petualangan Anda dengan Perlengkapan dan
              Inspirasi Terbaik.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <MountainSnow className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Misi Kami
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Di Aventis Adventure, kami percaya bahwa setiap orang berhak
                merasakan keajaiban alam dan menemukan versi terbaik dirinya
                melalui petualangan. Misi kami adalah untuk **menginspirasi dan
                memfasilitasi** pengalaman luar ruang yang aman, nyaman, dan tak
                terlupakan bagi para petualang di seluruh Indonesia.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kami berkomitmen untuk menyediakan perlengkapan outdoor
                berkualitas tinggi, informasi yang akurat dan bermanfaat, serta
                membangun komunitas yang solid bagi para pencinta alam.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="lg:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1691415929933-42e5771fd94a?q=80&w=2666&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Ganti dengan gambar yang relevan
                  alt="Pendiri Aventis sedang merencanakan rute"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl object-cover w-full"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Kisah Petualangan Kami Dimulai
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aventis Adventure lahir dari kecintaan mendalam terhadap alam
                  dan semangat untuk berbagi pengalaman. Berawal dari sekelompok
                  sahabat yang sering menjelajahi gunung dan hutan, kami
                  menyadari pentingnya perlengkapan yang andal dan informasi
                  yang tepat untuk setiap petualangan.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dari sanalah ide untuk Aventis muncul: sebuah platform yang
                  tidak hanya menjual peralatan outdoor, tetapi juga menjadi
                  sumber inspirasi, panduan, dan teman bagi para petualang. Kami
                  memulai dengan riset mendalam, berkolaborasi dengan para ahli,
                  dan mendengarkan masukan dari komunitas untuk menciptakan
                  produk dan konten yang benar-benar dibutuhkan.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Setiap produk yang kami tawarkan telah melalui uji coba ketat,
                  dan setiap artikel yang kami tulis didasarkan pada pengalaman
                  nyata dan pengetahuan yang valid. Kami bangga menjadi bagian
                  dari perjalanan petualangan Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              Nilai-Nilai yang Kami Pegang Teguh
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {value.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section - Simple Version */}
        <section className="py-12 md:py-20 bg-primary text-slate-900">
          <div className="container mx-auto px-4 text-center">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tim di Balik Aventis
            </h2>
            <p className="text-lg text-gray-900 leading-relaxed max-w-3xl mx-auto mb-10">
              Kami adalah tim yang terdiri dari para petualang, desainer,
              penulis, dan ahli teknis yang memiliki satu visi: menjadikan
              petualangan lebih mudah diakses dan dinikmati oleh semua orang.
              Setiap anggota tim membawa semangat dan keahlian unik untuk
              memastikan Aventis Adventure selalu menjadi yang terdepan.
            </p>
            {/* Opsional: Tambahkan beberapa profil singkat tim jika diinginkan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-800">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <Image
                    src={member.image || "/images/avatars/default.png"}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4 "
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <MessageSquareHeart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Siap Memulai Petualangan Anda?
            </h2>
            <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
              Jelajahi koleksi produk kami atau dapatkan inspirasi dari
              artikel-artikel petualangan terbaru.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                asChild
                className="bg-black hover:bg-slate-800 "
              >
                <Link href="/products">Lihat Produk Kami</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/articles">Baca Artikel Petualangan</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
