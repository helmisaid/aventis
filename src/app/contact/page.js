
"use client";

import { useState } from "react";
import Navbar from "@/components/navbar"; 
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Tambahkan Select
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquareText,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Copy,
  Check,
  HelpCircle,
  Settings,
  Users,
  Newspaper,
  MoreHorizontal,
} from "lucide-react"; // Tambahkan Copy, Check
import Link from "next/link";
import { cn } from "@/lib/utils"; // Asumsi utilitas ini ada

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  subject: "", // Akan menjadi Select
  message: "",
};

const SUBJECT_OPTIONS = [
  {
    value: "pertanyaan_produk",
    label: "Pertanyaan Produk",
    icon: HelpCircle,
    description: "Tanya tentang produk dan spesifikasi",
  },
  {
    value: "dukungan_teknis",
    label: "Dukungan Teknis",
    icon: Settings,
    description: "Bantuan teknis dan troubleshooting",
  },
  {
    value: "kerja_sama",
    label: "Kerja Sama & Kemitraan",
    icon: Users,
    description: "Proposal kemitraan dan kolaborasi",
  },
  {
    value: "media_pers",
    label: "Media & Pers",
    icon: Newspaper,
    description: "Pertanyaan media dan siaran pers",
  },
  {
    value: "lainnya",
    label: "Lainnya",
    icon: MoreHorizontal,
    description: "Pertanyaan umum lainnya",
  },
];

const validateContactForm = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Nama wajib diisi.";
  if (!data.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Format email tidak valid.";
  }
  if (!data.subject) errors.subject = "Subjek wajib dipilih."; // Validasi untuk Select
  if (!data.message.trim()) errors.message = "Pesan wajib diisi.";
  else if (data.message.trim().length < 10)
    errors.message = "Pesan minimal 10 karakter.";
  return errors;
};

export default function InteractiveContactPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error' or null
  const [errors, setErrors] = useState({});
  const [copiedStates, setCopiedStates] = useState({}); // Untuk feedback "klik untuk salin"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus(null);

    const formErrors = validateContactForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    console.log("Mengirim data formulir:", formData);

    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.1) resolve({ success: true });
          else reject(new Error("Simulated server error"));
        }, 1500)
      );
      setSubmitStatus("success");
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error mengirim pesan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = (textToCopy, fieldId) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedStates((prev) => ({ ...prev, [fieldId]: true }));
        setTimeout(
          () => setCopiedStates((prev) => ({ ...prev, [fieldId]: false })),
          2000
        );
      })
      .catch((err) => {
        console.error("Gagal menyalin:", err);
        alert("Gagal menyalin ke clipboard.");
      });
  };

  const renderError = (fieldName) =>
    errors[fieldName] && (
      <p className="text-red-500 text-xs mt-1 flex items-center">
        <AlertCircle size={14} className="mr-1" /> {errors[fieldName]}
      </p>
    );

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      lines: [
        { text: "info@aventisadventure.com", copyable: true, id: "emailInfo" },
        {
          text: "support@aventisadventure.com",
          copyable: true,
          id: "emailSupport",
        },
      ],
    },
    {
      icon: Phone,
      title: "Telepon",
      lines: [
        { text: "+62 812-3456-7890", copyable: true, id: "phoneMain" },
        { text: "Senin - Jumat, 09:00 - 17:00 WIB", copyable: false },
      ],
    },
    {
      icon: MapPin,
      title: "Alamat Kantor",
      lines: [
        { text: "Jl. Petualang No. 123,", copyable: false },
        { text: "Kota Surabaya, Jawa Timur, 60234", copyable: false },
        { text: "Indonesia", copyable: false },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/aventisadventure",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/aventisadventure",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/aventisadventure",
      icon: Twitter,
    },
    {
      name: "Youtube",
      href: "https://youtube.com/aventisadventure",
      icon: Youtube,
    }, // Pastikan URL benar
  ];

  const selectedSubject = SUBJECT_OPTIONS.find(
    (opt) => opt.value === formData.subject
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary/80 to-primary py-20 text-slate-900 text-center">
          <div className="container mx-auto px-4">
            <MessageSquareText className="h-16 w-16 mx-auto mb-6 opacity-80 transform transition-transform duration-500 hover:scale-110" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Punya pertanyaan, masukan, atau ingin berkolaborasi? Kami siap
              mendengarkan Anda!
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Kirim Pesan Langsung
                </h2>

                {/* Animated Success/Error Messages */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    submitStatus
                      ? "max-h-40 opacity-100 mb-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-md">
                      Pesan Anda telah berhasil dikirim! Kami akan segera
                      menghubungi Anda.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
                      Gagal mengirim pesan. Silakan coba lagi atau hubungi kami
                      melalui metode lain.
                    </div>
                  )}
                </div>

                {(!submitStatus || submitStatus === "error") && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="font-medium text-gray-700"
                      >
                        Nama Lengkap <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nama Anda"
                        className="mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        required
                      />
                      {renderError("name")}
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="font-medium text-gray-700"
                      >
                        Alamat Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        required
                      />
                      {renderError("email")}
                    </div>
                    <div>
                      <Label
                        htmlFor="subject"
                        className="font-medium text-gray-700"
                      >
                        Subjek <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        name="subject"
                        value={formData.subject}
                        onValueChange={(value) =>
                          handleSelectChange("subject", value)
                        }
                      >
                        <SelectTrigger
                          id="subject"
                          className={cn(
                            "w-full mt-1 transition-all duration-200",
                            "focus:ring-2 focus:ring-slate-900 focus:border-transparent",
                            "hover:border-slate-300",
                            errors.subject &&
                              "border-red-300 focus:ring-red-500"
                          )}
                        >
                          <SelectValue placeholder="Pilih subjek pesan" />
                        </SelectTrigger>
                        <SelectContent className="max-w-[400px]">
                          {SUBJECT_OPTIONS.map((opt) => {
                            const IconComponent = opt.icon;
                            return (
                              <SelectItem
                                key={opt.value}
                                value={opt.value}
                                className="cursor-pointer"
                              >
                                <div className="flex items-start space-x-3 py-1">
                                  <IconComponent className="h-4 w-4 mt-0.5 text-slate-600 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-slate-900">
                                      {opt.label}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                      {opt.description}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {selectedSubject && (
                        <div className="mt-2 p-2 bg-slate-50 rounded-md border">
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <selectedSubject.icon className="h-4 w-4" />
                            <span>{selectedSubject.description}</span>
                          </div>
                        </div>
                      )}
                      {renderError("subject")}
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="font-medium text-gray-700"
                      >
                        Pesan Anda <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        name="message"
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tuliskan pesan Anda di sini..."
                        className="mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        required
                      />
                      {renderError("message")}
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white transition-transform transform active:scale-95"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Mengirim...
                          </div>
                        ) : (
                          <>
                            {" "}
                            <Send className="mr-2 h-4 w-4" /> Kirim Pesan{" "}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Informasi Kontak Lainnya
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.title} className="flex items-start group">
                        <info.icon className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-medium text-gray-700 mb-0.5">
                            {info.title}
                          </h4>
                          {info.lines.map((line, index) => (
                            <div key={index} className="flex items-center">
                              <span
                                className={cn(
                                  "text-gray-600",
                                  line.copyable && "hover:text-primary"
                                )}
                              >
                                {line.text}
                              </span>
                              {line.copyable && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2 h-7 w-7 text-gray-400 hover:text-primary"
                                  onClick={() =>
                                    handleCopyToClipboard(line.text, line.id)
                                  }
                                  title="Salin"
                                >
                                  {copiedStates[line.id] ? (
                                    <Check
                                      size={16}
                                      className="text-green-500"
                                    />
                                  ) : (
                                    <Copy size={14} />
                                  )}
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Temukan Kami di Media Sosial
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 transform hover:scale-110"
                        title={link.name}
                      >
                        <link.icon className="h-5 w-5" />{" "}
                        <span className="sr-only">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Lokasi Kami
                  </h3>
                  <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                    {/* Ganti dengan iframe Google Maps yang responsif */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.25707602704!2d112.6302720394638!3d-7.275614060095628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x30158fc144b08e0!2sSurabaya%2C%20Kota%20SBY%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1717123456789!5m2!1sid!2sid" // Contoh Peta Surabaya, ganti dengan URL embed Anda
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Peta Lokasi Aventis Adventure"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
