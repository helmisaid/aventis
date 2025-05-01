'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(2); // Replace with real cart data in the future
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6 md:px-8">
        {/* Logo */}
        <div className="relative">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={88}
              height={49}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-[453px] h-[37px] border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-slate-500 transition-all">
          <div className="flex items-center justify-center w-10 h-full">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search your need for great outdoor experience"
            className="flex-1 px-2 py-2 text-sm text-gray-900 outline-none font-jakarta placeholder-gray-500 bg-transparent"
            aria-label="Search bar"
          />
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-sm font-semibold text-gray-800 font-jakarta hover:text-slate-700 relative group transition-colors">
            About
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-slate-900 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/category" className="text-sm font-semibold text-gray-800 font-jakarta hover:text-slate-700 relative group transition-colors">
            Category
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-slate-900 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/blog" className="text-sm font-semibold text-gray-800 font-jakarta hover:text-slate-700 relative group transition-colors">
            Blog
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-slate-900 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Cart and Login - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={() => router.push('/cart')}
            className="relative group"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-900 group-hover:text-slate-700 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="h-6 border-l border-gray-400"></div>

          {/* Login Button */}
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-2 bg-black text-white rounded-lg text-sm font-semibold font-jakarta hover:bg-gray-800 transition-colors"
            aria-label="Log in"
          >
            Log In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-900" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4">
          {/* Mobile Search Bar */}
          <div className="flex items-center w-full h-[37px] border border-gray-300 rounded-lg overflow-hidden bg-white mb-4 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <div className="flex items-center justify-center w-10 h-full">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search your need for great outdoor experience"
              className="flex-1 px-2 py-2 text-sm text-gray-900 outline-none font-jakarta placeholder-gray-500 bg-transparent"
              aria-label="Search bar"
            />
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/about"
              className="text-sm font-semibold text-gray-800 font-jakarta hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/category"
              className="text-sm font-semibold text-gray-800 font-jakarta hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Category
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold text-gray-800 font-jakarta hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Blog
            </Link>

            {/* Mobile Cart and Login */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  router.push('/cart');
                  toggleMenu();
                }}
                className="relative group"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingCartIcon className="w-6 h-6 text-gray-900 group-hover:text-blue-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  router.push('/login');
                  toggleMenu();
                }}
                className="px-6 py-2 bg-black text-white rounded-lg text-sm font-semibold font-jakarta hover:bg-gray-800 transition-colors"
                aria-label="Log in"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}