import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-900">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-700">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-r-none bg-slate-100 border-gray-700 text-slate-900"
              />
              <Button className="rounded-l-none bg-slate-900 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">About Aventis</h4>
            <p className="text-slate-600 mb-4">
              Premium outdoor gear and equipment for your adventures. Built for durability, designed for performance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-slate-900">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-slate-900">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-slate-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-slate-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-slate-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-slate-900">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-slate-900">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-slate-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-600 hover:text-slate-900">
                  Warranty Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <span>Jl. Outdoor Adventure No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>info@aventis.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Aventis. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-600 hover:text-slate-900 text-sm">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-slate-900 text-sm">
                Privacy
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-slate-900 text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
