"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Package,
  ShoppingCart,
  Users,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Kelola Artikel",
    href: "/admin/articles",
    icon: FileText,
    submenu: [
      { title: "Semua Artikel", href: "/admin/articles" },
      { title: "Tambah Artikel", href: "/admin/articles/create" },
      { title: "Kategori", href: "/admin/articles/categories" },
    ],
  },
  {
    title: "Kelola Produk",
    href: "/admin/products",
    icon: Package,
    submenu: [
      { title: "Semua Produk", href: "/admin/products" },
      { title: "Tambah Produk", href: "/admin/products/create" },
      { title: "Kategori", href: "/admin/products/categories" },
    ],
  },
  {
    title: "Kelola Pengguna",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Kelola Transaksi",
    href: "/admin/transactions",
    icon: ShoppingCart,
  },
]

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <div className="relative">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Aventis</span>
            </Link>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.title} className="mb-2">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md group transition-colors",
                        pathname.startsWith(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                      )}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="flex-1">{item.title}</span>
                      {openSubmenu === item.title ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {openSubmenu === item.title && (
                      <div className="pl-10 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.title}
                            href={subitem.href}
                            className={cn(
                              "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              pathname === subitem.href
                                ? "bg-primary/10 text-primary"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                            )}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@aventis.com</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                  <Settings size={18} />
                </button>
                <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
