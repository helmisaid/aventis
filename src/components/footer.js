import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t border-gray-200">
      {/* Newsletter */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Berlangganan Newsletter Kami
              </h3>
              <p className="text-slate-600">
                Dapatkan informasi terbaru tentang produk baru dan penawaran
                menarik
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Alamat email Anda"
                className="rounded-r-none bg-gray-50 border-gray-300 text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:ring-slate-900"
              />
              <Button className="rounded-l-none bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-300">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">
              Tentang Aventis
            </h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Perlengkapan outdoor premium untuk petualangan Anda. Dibuat untuk
              ketahanan, dirancang untuk performa terbaik. Temani setiap langkah
              petualangan Anda dengan produk berkualitas tinggi.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-slate-500 hover:text-blue-600 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-pink-600 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-blue-500 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-red-600 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Artikel
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Tanya Jawab
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">
              Layanan Pelanggan
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shipping"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Kebijakan Pengiriman
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Pengembalian & Tukar Barang
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-900 transition-colors duration-300"></span>
                  Informasi Garansi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-slate-200 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-slate-700" />
                </div>
                <span className="text-slate-600 text-sm leading-relaxed">
                  Jl. Petualangan Outdoor No. 123, Jakarta Selatan, Indonesia
                  12560
                </span>
              </li>
              <li className="flex items-center group">
                <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-green-100 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-slate-700 group-hover:text-green-700" />
                </div>
                <span className="text-slate-600">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center group">
                <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-blue-100 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-slate-700 group-hover:text-blue-700" />
                </div>
                <span className="text-slate-600">info@aventis.com</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-slate-600">
                <strong className="text-slate-900">Jam Operasional:</strong>
                <br />
                <span className="block mt-1">
                  Senin - Jumat: 08:00 - 17:00 WIB
                </span>
                <span className="block">Sabtu: 08:00 - 15:00 WIB</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600">
              &copy; {new Date().getFullYear()} Aventis. Seluruh hak cipta
              dilindungi.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-300"
              >
                Syarat
              </Link>
              <span className="text-slate-400">•</span>
              <Link
                href="/privacy"
                className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-300"
              >
                Privasi
              </Link>
              <span className="text-slate-400">•</span>
              <Link
                href="/cookies"
                className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
