"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingCart, Star, TrendingUp, Truck, Shield, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Hero carousel images
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
]

const categories = [
  {
    category: "Hiking",
    src: "/images/category/hiking-category.jpg",
    alt: "hiking category",
  },
  {
    category: "Camping",
    src: "/images/category/camping-category.jpg",
    alt: "camping category",
  },
  {
    category: "Clothing",
    src: "/images/category/clothing-category.jpg",
    alt: "clothing category",
  },
  {
    category: "Accessories",
    src: "/images/category/accessories-category.jpg",
    alt: "accessories category",
  },
]

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Aventis Hiking Backpack",
    description: "Lightweight and durable for all your adventures",
    price: 1250000,
    image: "/images/products/hiking-backpack-product.jpg",
    rating: 5,
    reviews: 24,
    isNew: true,
  },
  {
    id: 2,
    name: "Pro Trekking Poles",
    description: "Adjustable carbon fiber poles for stability",
    price: 850000,
    image: "/images/products/tracking-pole-product.jpg",
    rating: 4,
    reviews: 18,
    isNew: false,
  },
  {
    id: 3,
    name: "Waterproof Tent 2-Person",
    description: "Easy setup and weather resistant design",
    price: 2100000,
    image: "/images/products/2p-tent-product.jpg",
    rating: 5,
    reviews: 32,
    isNew: true,
  },
  {
    id: 4,
    name: "Insulated Water Bottle",
    description: "Keeps drinks hot or cold for 24 hours",
    price: 350000,
    image: "/images/products/insulated-water-bottle-product.jpg",
    rating: 4,
    reviews: 41,
    isNew: false,
  },
]

// Format price to IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function Home() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const heroRef = useRef(null)

  const sectionRefs = {
    categories: useRef(null),
    products: useRef(null),
    features: useRef(null),
  }

  // Hero carousel controls
  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
  }

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextHeroSlide()
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevHeroSlide()
    }
  }

  // Scroll animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextHeroSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentHeroSlide])

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
                  currentHeroSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentHeroSlide === index}
              />
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section id="categories-section" ref={sectionRefs.categories} className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
                isVisible["categories-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Shop By Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  href={`/products?category=${category.category.toLowerCase()}`}
                  key={index}
                  className={`group relative h-64 rounded-lg overflow-hidden shadow-lg transform transition-all duration-700 ${
                    isVisible["categories-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={category.src}
                    alt={category.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-all duration-300 group-hover:from-black/80">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{category.category}</h3>
                      <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        Explore Now
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="products-section" ref={sectionRefs.products} className="py-16">
          <div className="container mx-auto px-4">
            <div
              className={`flex justify-between items-center mb-12 transition-all duration-700 ${
                isVisible["products-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link href="/products" className="text-primary flex items-center hover:underline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-700 ${
                    isVisible["products-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        New
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
                    </div>
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{formatPrice(product.price)}</span>
                      <Button size="sm" className="rounded-full p-2 bg-primary hover:bg-primary/90 text-white">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features-section" ref={sectionRefs.features} className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
                isVisible["features-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Why Choose Aventis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                  isVisible["features-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "0ms" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  We source only the highest quality materials for our products to ensure durability and performance.
                </p>
              </div>
              <div
                className={`bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                  isVisible["features-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Get your outdoor gear quickly with our expedited shipping options throughout Indonesia.
                </p>
              </div>
              <div
                className={`bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                  isVisible["features-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Satisfaction Guarantee</h3>
                <p className="text-gray-600">
                  Not satisfied with your purchase? Return it within 30 days for a full refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready For Your Next Adventure?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of outdoor enthusiasts who trust Aventis for their gear needs.
            </p>
            <Button size="lg" variant="secondary" className="bg-white border border-gray-400 text-primary hover:text-white hover:bg-black">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
