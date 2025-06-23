// app/register/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Jika Anda punya logo berupa gambar
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react"; // AlertCircle dihapus
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // State error dan fieldErrors dihapus karena validasi dinonaktifkan

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi proses registrasi singkat
    console.log("Register attempt with:", { fullName, email, password, agreeToTerms });
    await new Promise(resolve => setTimeout(resolve, 500));

    // Langsung redirect ke halaman login karena validasi dinonaktifkan
    router.push("/login");

    // setIsLoading(false); // Tidak perlu karena sudah redirect
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block group">
            <span className="text-4xl font-bold text-primary tracking-tight group-hover:text-primary/80 transition-colors">
              Aventis
            </span>
            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Adventure</p>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Buat Akun Baru</h1>
            <p className="text-sm text-gray-500">Bergabunglah dengan komunitas petualang kami!</p>
          </div>

          {/* Bagian error umum dihapus */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Masukkan nama lengkap Anda"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 focus:ring-primary/50 focus:border-primary/50"
                  disabled={isLoading}
                />
              </div>
              {/* Error field fullName dihapus */}
            </div>

            <div>
              <Label htmlFor="email">Alamat Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="anda@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 focus:ring-primary/50 focus:border-primary/50"
                  disabled={isLoading}
                />
              </div>
              {/* Error field email dihapus */}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 focus:ring-primary/50 focus:border-primary/50"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {/* Error field password dihapus */}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Ulangi password Anda"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 focus:ring-primary/50 focus:border-primary/50"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                  aria-label={showConfirmPassword ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {/* Error field confirmPassword dihapus */}
            </div>

            <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onCheckedChange={setAgreeToTerms} // Langsung set state
                  disabled={isLoading}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="agreeToTerms" className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Saya setuju dengan{' '}
                        {/* PERBAIKAN ERROR legacyBehavior DI SINI */}
                        <Link href="/terms-and-conditions" className="font-medium text-primary hover:underline">
                            Syarat & Ketentuan
                        </Link>
                        {' '}yang berlaku.
                    </Label>
                    {/* Error field agreeToTerms dihapus */}
                </div>
            </div>

            <div>
              {/* Tombol disesuaikan dengan gaya tombol login */}
              <Button type="submit" className="w-full rounded-lg bg-black hover:bg-slate-500 text-white" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </div>
                ) : (
                  <> <UserPlus className="mr-2 h-5 w-5" /> Buat Akun </>
                )}
              </Button>
            </div>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Atau daftar dengan</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" disabled={isLoading}>
              <FcGoogle className="mr-2 h-5 w-5" /> Google
            </Button>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              <FaFacebook className="mr-2 h-5 w-5 text-[#1877F2]" /> Facebook
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}