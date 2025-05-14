"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Search, ShoppingCart, User, Heart } from "lucide-react"
import { Input } from "./ui/input"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Articles", href: "/articles" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

// Sample announcements for the ticker
const announcements = [
  "Free shipping on orders over $50",
  "New summer collection available now",
  "Limited time offer: 20% off all accessories",
  "Join our loyalty program and earn rewards",
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  // Join announcements with a separator for the ticker
  const tickerText = announcements.join(" • ")

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
              <Image className="object-contain" width={74} height={40} alt="logo" src={"/logo.png"} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-md font-medium transition-colors nav-link relative",
                  pathname === link.href ? "text-primary nav-link-active" : "text-slate-900 hover:text-primary",
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link href="/account" className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-100">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search for products..." className="pl-10 w-full" autoFocus />
              <button onClick={toggleSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors nav-link relative",
                    pathname === link.href ? "text-primary nav-link-active" : "text-gray-700 hover:text-primary",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
              <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </button>
              <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </Link>
              <Link href="/account" className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
