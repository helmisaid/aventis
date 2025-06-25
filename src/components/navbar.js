"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  LogIn,
} from "lucide-react";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Produk", href: "/products" },
  { name: "Artikel", href: "/articles" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Kontak", href: "/contact" },
];

// Contoh pengumuman untuk ticker
const announcements = [
  "Gratis ongkos kirim untuk pesanan di atas Rp750.000",
  "Koleksi musim panas terbaru sudah tersedia",
  "Penawaran terbatas: Diskon 20% untuk semua aksesori",
  "Gabung program loyalitas kami dan dapatkan hadiah",
];

export default function Navbar() {
  // State untuk melacak status login. Ubah ke `true` untuk melihat tampilan "sudah login".
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Gabungkan pengumuman dengan pemisah untuk ticker
  const tickerText = announcements.join(" • ");

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* News Ticker */}
      <div className="bg-primary text-white py-1 overflow-hidden">
        <div className="ticker-container">
          <div className="ticker-content">
            {tickerText} • {tickerText}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                className="object-contain"
                width={74}
                height={40}
                alt="logo"
                src={"/logo.png"}
              />
            </Link>
          </div>

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-md font-medium transition-colors nav-link relative",
                  pathname === link.href
                    ? "text-primary nav-link-active"
                    : "text-slate-900 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Tombol Aksi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link
              href="/account"
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <User className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            {isLoggedIn ? (
              <Link
                href="/account"
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link href="/login">
                <button className="flex items-center justify-center bg-black  text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                  <LogIn className="h-4 w-4 mr-2" />
                  Masuk
                </button>
              </Link>
            )}
          </div>

          {/* Tombol Menu Mobile */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              href="/cart"
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="pl-10 w-full"
                autoFocus
              />
              <button
                onClick={toggleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 text-base transition-colors rounded-lg",
                    pathname === link.href
                      ? "text-primary font-bold"
                      : "text-gray-700 font-medium hover:text-primary hover:bg-gray-50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Tombol Aksi Mobile */}
            <div className="flex items-center justify-around pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  toggleSearch();
                  setIsMenuOpen(false);
                }}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Cari</span>
              </button>
              <Link
                href="/wishlist"
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Wishlist</span>
              </Link>

              <Link
                href="/account"
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Akun</span>
              </Link>
              <Link
                href="/login"
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Masuk</span>
              </Link>
              {/* === AKHIR LOGIKA === */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
