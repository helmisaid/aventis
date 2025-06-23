"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
      { title: "Kategori Artikel", href: "/admin/articles/categories" },
    ],
  },
  {
    title: "Kelola Produk",
    href: "/admin/products",
    icon: Package,
    submenu: [
      { title: "Semua Produk", href: "/admin/products" },
      { title: "Tambah Produk", href: "/admin/products/create" },
      { title: "Kategori Produk", href: "/admin/categories" },
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
];

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  // Automatically open submenu if a child route is active
  useEffect(() => {
    const activeParent = navItems.find(
      (item) =>
        item.submenu &&
        item.submenu.some((subitem) => subitem.href === pathname)
    );
    if (activeParent) {
      setOpenSubmenu(activeParent.title);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
        onClick={toggleMobileSidebar}
        aria-label={isMobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={isMobileOpen}
        aria-controls="admin-sidebar"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gray-50">
            <Link
              href="/"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md p-1 transition-colors hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Aventis Admin
              </span>
            </Link>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={toggleMobileSidebar}
              aria-label="Tutup menu navigasi"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isParentActive =
                pathname === item.href ||
                (item.submenu &&
                  item.submenu.some((sub) => pathname === sub.href));
              const isSubmenuOpen = openSubmenu === item.title;

              return (
                <div key={item.title} className="mb-1">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-1",
                          isParentActive
                            ? "bg-gray-900 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm",
                          isSubmenuOpen && !isParentActive
                            ? "bg-gray-50 text-gray-900"
                            : ""
                        )}
                        aria-expanded={isSubmenuOpen}
                        aria-controls={`submenu-${item.title
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        <IconComponent
                          className={cn(
                            "w-5 h-5 mr-3 transition-colors",
                            isParentActive
                              ? "text-white"
                              : "text-gray-500 group-hover:text-gray-700"
                          )}
                        />
                        <span className="flex-1 text-left">{item.title}</span>
                        {isSubmenuOpen ? (
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-colors",
                              isParentActive
                                ? "text-white"
                                : "text-gray-500 group-hover:text-gray-700"
                            )}
                          />
                        ) : (
                          <ChevronRight
                            className={cn(
                              "w-4 h-4 transition-colors",
                              isParentActive
                                ? "text-white"
                                : "text-gray-500 group-hover:text-gray-700"
                            )}
                          />
                        )}
                      </button>
                      {isSubmenuOpen && (
                        <div
                          id={`submenu-${item.title
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          className="pl-8 mt-1 space-y-1"
                        >
                          {item.submenu.map((subitem) => {
                            const isSubitemActive = pathname === subitem.href;
                            return (
                              <Link
                                key={subitem.title}
                                href={subitem.href}
                                className={cn(
                                  "block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-1",
                                  isSubitemActive
                                    ? "bg-gray-900 text-white shadow-md font-semibold"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm"
                                )}
                                aria-current={
                                  isSubitemActive ? "page" : undefined
                                }
                              >
                                {subitem.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-1",
                        isParentActive
                          ? "bg-gray-900 text-white shadow-md font-semibold"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm"
                      )}
                      aria-current={isParentActive ? "page" : undefined}
                    >
                      <IconComponent
                        className={cn(
                          "w-5 h-5 mr-3 transition-colors",
                          isParentActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700"
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 mt-auto border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-md">
                  <Users size={18} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    admin@aventis.com
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  aria-label="Pengaturan akun"
                  title="Pengaturan"
                >
                  <Settings size={16} />
                </button>
                <button
                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Keluar"
                  title="Keluar"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
