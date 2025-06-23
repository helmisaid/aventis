"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  Package,
  Tag,
  DollarSign,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PRODUCT_CATEGORIES = [
  "Tas & Carrier",
  "Sepatu",
  "Tenda",
  "Jaket & Pakaian",
  "Aksesoris",
  "Peralatan Masak",
];

export default function CreateProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    stockQuantity: "",
    sku: "",
    status: "Draft",
    isNew: false,
    isBestSeller: false,
    metaTitle: "",
    metaDescription: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Auto-generate SKU when name or category changes
    if (field === "name" || field === "category") {
      const name = field === "name" ? value : formData.name;
      const category = field === "category" ? value : formData.category;
      if (name && category) {
        const sku = `AVN-${category.toUpperCase().slice(0, 3)}-${name
          .toUpperCase()
          .slice(0, 3)}-${Date.now().toString().slice(-4)}`;
        setFormData((prev) => ({ ...prev, sku }));
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Ukuran file maksimal 5MB" }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama produk wajib diisi";
    if (!formData.description.trim())
      newErrors.description = "Deskripsi produk wajib diisi";
    if (!formData.category) newErrors.category = "Kategori wajib dipilih";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Harga jual wajib diisi dan harus lebih dari 0";
    if (!formData.stockQuantity || formData.stockQuantity < 0)
      newErrors.stockQuantity = "Stok wajib diisi dan tidak boleh negatif";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status = "Draft") => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Product data:", {
        ...formData,
        status,
        tags,
        image: previewImage,
      });
      setIsLoading(false);
      alert(
        `Produk berhasil ${
          status === "Published" ? "dipublikasi" : "disimpan sebagai draft"
        }!`
      );
      router.push("/admin/products");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <Link href="/admin/products">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tambah Produk Baru
              </h1>
              <p className="text-gray-600">
                Lengkapi informasi produk di bawah ini
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Package className="h-5 w-5" />
                  Informasi Dasar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nama Produk *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama produk"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors ${
                      errors.name ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Deskripsi Produk *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsikan produk Anda secara detail"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className={`mt-2 min-h-[120px] border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors ${
                      errors.description
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700"
                    >
                      Kategori *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger
                        className={`mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors ${
                          errors.category ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="sku"
                      className="text-sm font-medium text-gray-700"
                    >
                      SKU
                    </Label>
                    <Input
                      id="sku"
                      placeholder="Auto-generated"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      className="mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors font-mono text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Inventory */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <DollarSign className="h-5 w-5" />
                  Harga & Stok
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label
                      htmlFor="price"
                      className="text-sm font-medium text-gray-700"
                    >
                      Harga Jual *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className={`mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors ${
                        errors.price
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                    />
                    {errors.price && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="originalPrice"
                      className="text-sm font-medium text-gray-700"
                    >
                      Harga Asli
                    </Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="0"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        handleInputChange("originalPrice", e.target.value)
                      }
                      className="mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="stock"
                      className="text-sm font-medium text-gray-700"
                    >
                      Stok *
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        handleInputChange("stockQuantity", e.target.value)
                      }
                      className={`mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors ${
                        errors.stockQuantity
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                    />
                    {errors.stockQuantity && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.stockQuantity}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Tag className="h-5 w-5" />
                  Tags Produk
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Tambah tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-md font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah
                  </button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200 px-3 py-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <ImageIcon className="h-5 w-5" />
                  Gambar Produk
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
                    {previewImage ? (
                      <div className="relative">
                        <Image
                          src={previewImage || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg object-cover border border-gray-200"
                        />
                        <button
                          onClick={() => setPreviewImage(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2 font-medium">
                          Klik untuk upload gambar
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG hingga 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {errors.image && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.image}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product Status */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-gray-900">Status Produk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700"
                  >
                    Status Publikasi
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger className="mt-2 border-gray-200 focus:border-gray-900 hover:border-gray-300 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) =>
                        handleInputChange("isNew", e.target.checked)
                      }
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        Produk Baru
                      </span>
                      <p className="text-xs text-gray-500">
                        Tampilkan badge Baru pada produk
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) =>
                        handleInputChange("isBestSeller", e.target.checked)
                      }
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        Best Seller
                      </span>
                      <p className="text-xs text-gray-500">
                        Tampilkan badge Terlaris pada produk
                      </p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6 p-6">
                <div className="space-y-3">
                  <button
                    onClick={() => handleSubmit("Published")}
                    disabled={isLoading}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 hover:shadow-lg transform hover:scale-105 font-medium"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    Publikasi Produk
                  </button>

                  <button
                    onClick={() => handleSubmit("Draft")}
                    disabled={isLoading}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 hover:shadow-md font-medium"
                  >
                    <Save className="h-4 w-4" />
                    Simpan Draft
                  </button>

                  <Link href="/admin/products">
                    <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors border border-gray-300 hover:border-gray-400 font-medium">
                      Batal
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
