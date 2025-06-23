"use client"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Package, User, Heart, LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function AccountPage() {
  const user = {
    name: "Helmi Said Hidayatulloh",
    email: "helmi@gmail.com",
    avatar: "/images/article/helmi_avatar.jpg",
    orderCount: 3,
    wishlistCount: 12,
  }

  const menuItems = [
    {
      title: "Pesanan",
      description: "Lihat dan lacak pesanan Anda",
      icon: Package,
      href: "/account/orders",
      highlight: true,
    },
    {
      title: "Profil Saya",
      description: "Kelola informasi personal Anda",
      icon: User,
      href: "/account/profile",
    },
    {
      title: "Wishlist",
      description: "Lihat barang yang Anda simpan",
      icon: Heart,
      href: "/account/wishlist",
    },
  ]

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
              <span className="text-gray-700">Akun</span>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* User Profile Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <div>
                    <Button variant="outline" className="border-black hover:bg-gray-50">
                      Edit Profil
                    </Button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">{user.orderCount}</div>
                    <div className="text-gray-500 text-sm">Pesanan</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">{user.wishlistCount}</div>
                    <div className="text-gray-500 text-sm">Wishlist</div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Menu Akun</h2>
                </div>

                <div>
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      {index > 0 && <Separator />}
                      <Link href={item.href}>
                        <div
                          className={`p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                            item.highlight ? "bg-gray-50" : ""
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="p-6">
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50 w-full gap-2 text-gray-700">
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
