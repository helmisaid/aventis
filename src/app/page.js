"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Shield,
  Play,
  ChevronRight,
  ChevronLeft,
  Heart,
  Eye,
  Clock,
  MapPin,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Hero carousel images
const heroImages = [
  {
    src: "/images/carousel-1.jpg",
    title: "Explore The Outdoors With Confidence",
    subtitle:
      "Premium outdoor gear and equipment for your next adventure. Built for durability, designed for performance.",
  },
  {
    src: "/images/carousel-2.jpg",
    title: "Gear Up For Your Next Adventure",
    subtitle: "Discover our new collection of hiking and camping equipment designed for the modern explorer.",
  },
  {
    src: "/images/carousel-3.jpg",
    title: "Experience Nature Like Never Before",
    subtitle: "Our premium equipment helps you connect with nature while staying comfortable and safe.",
  },
]

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Aventis Hiking Backpack",
    description: "Lightweight and durable for all your adventures",
    price: 1250000,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 24,
    isNew: true,
    discount: 0,
  },
  {
    id: 2,
    name: "Pro Trekking Poles",
    description: "Adjustable carbon fiber poles for stability",
    price: 850000,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 18,
    isNew: false,
    discount: 15,
  },
  {
    id: 3,
    name: "Waterproof Tent 2-Person",
    description: "Easy setup and weather resistant design",
    price: 2100000,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 32,
    isNew: true,
    discount: 0,
  },
  {
    id: 4,
    name: "Insulated Water Bottle",
    description: "Keeps drinks hot or cold for 24 hours",
    price: 350000,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 41,
    isNew: false,
    discount: 10,
  },
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Hiking Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    text: "The quality of Aventis products is unmatched. My backpack has survived countless trails and still looks brand new!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Professional Guide",
    image: "/placeholder.svg?height=100&width=100",
    text: "As someone who leads expeditions for a living, I trust Aventis gear with my life. Their attention to detail and durability is exceptional.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Weekend Explorer",
    image: "/placeholder.svg?height=100&width=100",
    text: "From customer service to product quality, Aventis has exceeded my expectations. I recommend them to all my friends who love the outdoors.",
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

// Calculate discounted price
const calculateDiscountedPrice = (price, discount) => {
  if (!discount) return price
  return price - (price * discount) / 100
}

export default function Home() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30,
  })

  const sectionRefs = {
    categories: useRef(null),
    products: useRef(null),
    features: useRef(null),
    testimonials: useRef(null),
  }

  // Hero carousel controls
  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
  }

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
  }

  // Testimonial carousel controls
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Handle newsletter signup
  const handleNewsletterSignup = (e) => {
    e.preventDefault()

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setEmailError("")
    alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`)
    setEmail("")
  }

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
    }, 8000)

    return () => clearInterval(interval)
  }, [currentHeroSlide])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Carousel Section */}
        <section className="relative h-[80vh] text-white">
          <div className="absolute inset-0 overflow-hidden">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentHeroSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={`Hero slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}
          </div>

          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-2xl transition-all duration-700 transform translate-y-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroImages[currentHeroSlide].title}</h1>
              <p className="text-lg md:text-xl mb-8">{heroImages[currentHeroSlide].subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  Explore Articles
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentHeroSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevHeroSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextHeroSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>

        {/* Sale Countdown */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
              <h3 className="text-xl font-bold">Summer Sale Ends In:</h3>
              <div className="flex gap-4">
                <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                  <div className="text-2xl font-bold">{countdown.days}</div>
                  <div className="text-xs">Days</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                  <div className="text-2xl font-bold">{countdown.hours}</div>
                  <div className="text-xs">Hours</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                  <div className="text-2xl font-bold">{countdown.minutes}</div>
                  <div className="text-xs">Minutes</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                  <div className="text-2xl font-bold">{countdown.seconds}</div>
                  <div className="text-xs">Seconds</div>
                </div>
              </div>
              <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Shop the Sale
              </Button>
            </div>
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
              {["Hiking", "Camping", "Climbing", "Clothing"].map((category, index) => (
                <Link
                  href={`/products?category=${category.toLowerCase()}`}
                  key={category}
                  className={`group relative h-64 rounded-lg overflow-hidden shadow-lg transform transition-all duration-700 ${
                    isVisible["categories-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt={category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-all duration-300 group-hover:from-black/80">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
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
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Eye className="h-4 w-4" />
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
                      <div>
                        {product.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                            </span>
                            <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                          </div>
                        ) : (
                          <span className="font-bold">{formatPrice(product.price)}</span>
                        )}
                      </div>
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
              {[
                {
                  icon: <TrendingUp className="h-8 w-8 text-primary" />,
                  title: "Premium Quality",
                  description:
                    "We source only the highest quality materials for our products to ensure durability and performance.",
                },
                {
                  icon: <Truck className="h-8 w-8 text-primary" />,
                  title: "Fast Delivery",
                  description:
                    "Get your outdoor gear quickly with our expedited shipping options throughout Indonesia.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Satisfaction Guarantee",
                  description: "Not satisfied with your purchase? Return it within 30 days for a full refund.",
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className={`bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                    isVisible["features-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Banner */}
        <section className="relative h-[50vh] bg-gray-900 flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Video thumbnail"
              fill
              className="object-cover opacity-50"
            />
          </div>
          <div className="relative text-center text-white z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Products in Action</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Watch how our gear performs in the most challenging environments
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 transition-transform hover:scale-110">
              <Play className="h-8 w-8" />
            </button>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials-section" ref={sectionRefs.testimonials} className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
                isVisible["testimonials-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              What Our Customers Say
            </h2>

            <div className="relative max-w-3xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="w-20 h-20 mx-auto mb-4 relative">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-md hover:bg-gray-100 p-2 rounded-full transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-md hover:bg-gray-100 p-2 rounded-full transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentTestimonial === index ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                {
                  value: "10K+",
                  label: "Happy Customers",
                  icon: <Users className="h-6 w-6 mx-auto mb-2 text-primary" />,
                },
                {
                  value: "500+",
                  label: "Products",
                  icon: <ShoppingCart className="h-6 w-6 mx-auto mb-2 text-primary" />,
                },
                {
                  value: "15+",
                  label: "Years Experience",
                  icon: <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />,
                },
                {
                  value: "25+",
                  label: "Store Locations",
                  icon: <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />,
                },
              ].map((stat) => (
                <div key={stat.label} className="p-4">
                  {stat.icon}
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for exclusive deals, outdoor tips, and new product announcements.
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1 text-left">{emailError}</p>}
                </div>
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready For Your Next Adventure?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of outdoor enthusiasts who trust Aventis for their gear needs.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
