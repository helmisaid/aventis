// app/admin/articles/create/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowLeft,
  UploadCloud,
  InfoIcon,
  SettingsIcon,
  CheckCircle,
  Save,
  UserCircle,
  BookOpen,
  ClockIcon,
  XCircle,
  AlertCircle,
} from "lucide-react";

// Mock data (replace with API calls)
const MOCK_CATEGORIES = [
  { id: "pendakian", name: "Pendakian" },
  { id: "review-alat", name: "Review Alat" },
  { id: "tips", name: "Tips & Trik" },
  { id: "destinasi", name: "Destinasi" },
];

const MOCK_AUTHORS = [
  {
    id: "helmi_said",
    name: "Helmi Said",
    avatar: "/images/article/helmi_avatar.jpg",
    bio: "Pendaki dan penggemar alam yang sudah menjelajahi gunung-gunung di Indonesia selama 3 tahun.",
  },
  {
    id: "aventis_team",
    name: "Aventis Team",
    avatar: "/images/logo_aventis.png",
    bio: "Tim redaksi Aventis Adventure. Menyajikan informasi terbaru seputar petualangan.",
  },
];

const INITIAL_FORM_STATE = {
  title: "",
  slug: "",
  content: "",
  imageFile: null,
  category: "",
  date: new Date().toISOString().split("T")[0],
  readTime: "",
  authorId: MOCK_AUTHORS[0]?.id || "",
  tags: "",
  status: "Draft",
  excerpt: "",
  metaTitle: "",
  metaDescription: "",
};

const validateForm = (data) => {
  const newErrors = {};
  if (!data.title.trim()) newErrors.title = "Judul artikel wajib diisi.";
  if (!data.slug.trim()) newErrors.slug = "Slug wajib diisi.";
  if (!data.content.trim()) newErrors.content = "Isi artikel wajib diisi.";
  if (!data.excerpt.trim()) newErrors.excerpt = "Ringkasan wajib diisi.";
  if (!data.category) newErrors.category = "Kategori wajib dipilih.";
  if (!data.date) newErrors.date = "Tanggal publikasi wajib diisi.";
  if (!data.readTime.trim())
    newErrors.readTime = "Estimasi waktu baca wajib diisi.";
  if (!data.authorId) newErrors.authorId = "Penulis wajib dipilih.";
  if (!data.imageFile && !data.imageUrl)
    newErrors.imageFile = "Gambar unggulan wajib diunggah.";
  return newErrors;
};

export default function CreateArticleAdminPageBetter() {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [selectedAuthorDetails, setSelectedAuthorDetails] = useState(
    MOCK_AUTHORS.find((author) => author.id === INITIAL_FORM_STATE.authorId) ||
      null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const author = MOCK_AUTHORS.find((auth) => auth.id === formData.authorId);
    setSelectedAuthorDetails(author || null);
  }, [formData.authorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));

    if (name === "title") {
      generateSlug(value);
      if (!formData.metaTitle) {
        setFormData((prev) => ({ ...prev, metaTitle: value }));
      }
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      if (errors.imageFile) setErrors((prev) => ({ ...prev, imageFile: null }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageFile: null }));
    setImagePreview("");
    const fileInput = document.getElementById("imageFile");
    if (fileInput) fileInput.value = "";
  };

  const generateSlug = (title) => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = async (publishStatus = "Draft") => {
    setErrors({});
    const currentFormData = { ...formData, status: publishStatus };
    const formErrors = validateForm(currentFormData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      alert("Harap perbaiki error pada form sebelum melanjutkan.");
      return;
    }

    setIsSubmitting(true);
    const submissionPayload = new FormData();
    // ... (submissionPayload logic remains the same) ...
    Object.entries(currentFormData).forEach(([key, value]) => {
      if (key === "imageFile" && value instanceof File) {
        submissionPayload.append(key, value, value.name);
      } else if (key === "tags" && typeof value === "string") {
        submissionPayload.append(
          key,
          JSON.stringify(
            value
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          )
        );
      } else {
        submissionPayload.append(key, value);
      }
    });
    if (selectedAuthorDetails) {
      submissionPayload.append("authorFullName", selectedAuthorDetails.name);
      submissionPayload.append("authorAvatarUrl", selectedAuthorDetails.avatar);
      submissionPayload.append("authorFullBio", selectedAuthorDetails.bio);
    }

    console.log("Submitting article data (FormData):");
    for (let [key, value] of submissionPayload.entries()) {
      console.log(`${key}:`, value);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert(
      `Artikel "${currentFormData.title}" ${
        publishStatus === "Published"
          ? "berhasil diterbitkan"
          : "disimpan sebagai draft"
      }!`
    );
    setIsSubmitting(false);
    setFormData(INITIAL_FORM_STATE);
    setSelectedAuthorDetails(
      MOCK_AUTHORS.find(
        (author) => author.id === INITIAL_FORM_STATE.authorId
      ) || null
    );
    setImagePreview("");
    const fileInput = document.getElementById("imageFile");
    if (fileInput) fileInput.value = "";
    router.push("/admin/articles");
  };

  const renderError = (fieldName) =>
    errors[fieldName] && (
      <p className="text-red-500 text-xs mt-1 flex items-center">
        <AlertCircle size={14} className="mr-1" /> {errors[fieldName]}
      </p>
    );

  return (
    // Applied exact styling from the list page to this main container
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
      {/* Header section for title and back button */}
      <div className="flex items-center justify-between mb-6">
        {" "}
        {/* Added mb-6 for spacing, similar to list page */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
            Tambah Artikel Baru
          </h1>
          <p className="text-gray-500">
            Lengkapi semua informasi artikel dengan cermat.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/articles">
            {" "}
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali{" "}
          </Link>
        </Button>
      </div>

      {/* Form starts here */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Form content grid. Added pb-24 here for sticky footer visibility */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-24">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar Artikel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">
                    Judul Artikel <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {renderError("title")}
                </div>
                <div>
                  <Label htmlFor="slug">
                    Slug URL <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => generateSlug(formData.title)}
                    >
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Slug unik untuk URL. Biasanya dibuat otomatis dari judul.
                  </p>
                  {renderError("slug")}
                </div>
                <div>
                  <Label htmlFor="excerpt">
                    Ringkasan/Kutipan <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1"
                    placeholder="Max 200 karakter direkomendasikan untuk SEO & preview."
                  />
                  {renderError("excerpt")}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Isi Konten Artikel <span className="text-red-500">*</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 mb-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                  <h4 className="font-semibold">Perhatian Penting!</h4>
                  <p className="text-sm">
                    Field di bawah ini adalah placeholder. Untuk pengalaman
                    menulis artikel yang sebenarnya, Anda **WAJIB**
                    mengintegrasikan **Rich Text Editor (RTE)** di sini.
                    Beberapa pilihan populer: React Quill, Tiptap, CKEditor 5,
                    TinyMCE, Lexical. RTE akan menghasilkan output HTML yang
                    bisa Anda simpan dan render di halaman detail.
                  </p>
                </div>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={25}
                  className="mt-1"
                  placeholder="Masukkan konten artikel dalam format HTML atau teks biasa (jika RTE belum terintegrasi)."
                />
                {renderError("content")}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="mr-2 h-5 w-5 text-primary" />
                  Pengaturan Publikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">
                    Status <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="status"
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger id="status" className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">
                    Tanggal Publikasi <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {renderError("date")}
                </div>
                <div>
                  <Label htmlFor="readTime">
                    Estimasi Waktu Baca <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    placeholder="cth: 7 menit baca"
                    className="mt-1"
                  />
                  {renderError("readTime")}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCircle className="mr-2 h-5 w-5 text-primary" />
                  Informasi Penulis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="authorId">
                    Pilih Penulis <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="authorId"
                    value={formData.authorId}
                    onValueChange={(value) =>
                      handleSelectChange("authorId", value)
                    }
                  >
                    <SelectTrigger id="authorId" className="w-full mt-1">
                      <SelectValue placeholder="Pilih Penulis" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_AUTHORS.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {renderError("authorId")}
                </div>
                {selectedAuthorDetails && (
                  <div className="mt-3 p-3 border rounded-md bg-gray-50 space-y-2">
                    <div className="flex items-center gap-2">
                      {selectedAuthorDetails.avatar && (
                        <Image
                          src={selectedAuthorDetails.avatar}
                          alt={selectedAuthorDetails.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                      <p className="font-medium text-sm">
                        {selectedAuthorDetails.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600">
                      {selectedAuthorDetails.bio}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  Organisasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">
                    Kategori <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger id="category" className="w-full mt-1">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {renderError("category")}
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Pisahkan dengan koma, cth: gunung, tips"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Contoh: pendakian, carrier, tips-pemula
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UploadCloud className="mr-2 h-5 w-5 text-primary" />
                  Gambar Unggulan <span className="text-red-500">*</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor="imageFile"
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center hover:border-primary transition-colors"
                >
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                  <span>
                    {formData.imageFile
                      ? formData.imageFile.name
                      : "Klik untuk unggah gambar"}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG, WEBP. Max 2MB.
                  </span>
                </Label>
                <Input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                {imagePreview && (
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium mb-1">Preview:</p>
                    <Image
                      src={imagePreview}
                      alt="Preview Gambar Unggulan"
                      width={200}
                      height={120}
                      className="rounded-md object-contain mx-auto border"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeImage}
                      className="mt-2 text-red-600 hover:text-red-700"
                    >
                      <XCircle size={14} className="mr-1" /> Hapus Gambar
                    </Button>
                  </div>
                )}
                {renderError("imageFile")}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <InfoIcon className="mr-2 h-5 w-5 text-primary" />
                  Pengaturan SEO (Opsional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="Judul SEO (optimal 50-60 karakter)"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Deskripsi SEO (optimal 120-150 karakter)"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>{" "}
        {/* End of form content grid */}
        {/* Sticky Footer for action buttons */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white py-4 px-6 border-t shadow-top-md z-20">
          <div className="max-w-screen-xl mx-auto flex justify-end gap-3">
            {" "}
            {/* Adjust max-w if needed */}
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/articles")}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleSubmit("Draft")}
              disabled={isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting && formData.status === "Draft"
                ? "Menyimpan..."
                : "Simpan Draft"}
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit("Published")}
              disabled={isSubmitting}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {isSubmitting && formData.status === "Published"
                ? "Menerbitkan..."
                : "Terbitkan"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
