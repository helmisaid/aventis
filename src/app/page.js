"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  TrendingUp,
  Truck,
  Shield,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProductCard from "../components/ui/product-card";
import { featuredProducts } from "../data/products";

const heroImages = [
  {
    src: "/images/hero/carousel-1.jpg",
    alt: "Outdoor adventure scene with mountains",
  },
  {
    src: "/images/hero/carousel-2.jpg",
    alt: "Camping in the wilderness",
  },
  {
    src: "/images/hero/carousel-3.jpg",
    alt: "Hiking through forest trails",
  },
];

const categories = [
  {
    name: "Hiking",
    src: "/images/category/hiking-category.jpg",
    alt: "hiking category",
  },
  {
    name: "Camping",
    src: "/images/category/camping-category.jpg",
    alt: "camping category",
  },
  {
    name: "Clothing",
    src: "/images/category/clothing-category.jpg",
    alt: "clothing category",
  },
  {
    name: "Accessories",
    src: "/images/category/accessories-category.jpg",
    alt: "accessories category",
  },
];

export default function Home() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);

  const sectionRefs = {
    categories: useRef(null),
    products: useRef(null),
    features: useRef(null),
  };

  // Hero carousel controls
  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextHeroSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevHeroSlide();
    }
  };

  // Scroll animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextHeroSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentHeroSlide]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Carousel Section - Touch Enabled, No Text */}
        <section
          className="relative my-0 mx-0 md:my-6 md:mx-4 lg:my-14 lg:mx-20 h-[40vh] md:h- [50vh] lg:h-[70vh]"
          ref={heroRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute sm:rounded-xl inset-0 overflow-hidden">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentHeroSlide === index ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={currentHeroSlide !== index}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Carousel Controls - Arrows */}
          <button
            onClick={prevHeroSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextHeroSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Indicators - Dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentHeroSlide === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentHeroSlide === index}
              />
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section
          id="categories-section"
          ref={sectionRefs.categories}
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
                isVisible["categories-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Belanja Berdasarkan Kategori
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  href={`/products?category=${category.name.toLowerCase()}`}
                  key={index}
                  className={`group relative h-64 rounded-lg overflow-hidden shadow-lg transform transition-all duration-700 ${
                    isVisible["categories-section"]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={category.src || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-all duration-300 group-hover:from-black/80">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.name}
                      </h3>
                      <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        Jelajahi Sekarang
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section
          id="products-section"
          ref={sectionRefs.products}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <div
              className={`flex justify-between items-center mb-12 transition-all duration-700 ${
                isVisible["products-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold">Produk Unggulan</h2>
              <Link
                href="/products"
                className="text-primary flex items-center hover:underline"
              >
                Lihat Semua <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={`${
                    isVisible["products-section"]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features-section"
          ref={sectionRefs.features}
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
                isVisible["features-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Mengapa Memilih Aventis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                  isVisible["features-section"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "0ms" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Kualitas Premium</h3>
                <p className="text-gray-600">
                  Kami hanya menggunakan bahan berkualitas tinggi untuk
                  memastikan daya tahan dan performa produk.
                </p>
              </div>
              <div
                className={`bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                  isVisible["features-section"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pengiriman Cepat</h3>
                <p className="text-gray-600">
                  Dapatkan perlengkapan outdoor Anda dengan cepat melalui opsi
                  pengiriman ekspres di seluruh Indonesia.
                </p>
              </div>
              <div
                className={`bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                  isVisible["features-section"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Jaminan Kepuasan</h3>
                <p className="text-gray-600">
                  Tidak puas dengan pembelian Anda? Kembalikan dalam 30 hari
                  untuk pengembalian dana penuh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Siap untuk Petualangan Berikutnya?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan penggemar alam yang mempercayai Aventis
              untuk kebutuhan perlengkapan mereka.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white border border-gray-400 text-primary hover:text-white hover:bg-black"
            >
              Belanja Sekarang <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
