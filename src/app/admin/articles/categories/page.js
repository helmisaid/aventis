"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  BookOpen,
  Save,
  X,
  AlertCircle,
  FileText,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Sample article categories data
const initialArticleCategories = [
  {
    id: 1,
    name: "Pendakian",
    slug: "pendakian",
    description: "Tips, panduan, dan cerita tentang pendakian gunung",
    articleCount: 15,
    isActive: true,
    isFeatured: true,
    color: "#10B981",
    createdAt: "2024-01-15",
    lastArticle: "2024-06-20",
  },
  {
    id: 2,
    name: "Review Alat",
    slug: "review-alat",
    description: "Review dan ulasan peralatan outdoor terbaru",
    articleCount: 12,
    isActive: true,
    isFeatured: true,
    color: "#3B82F6",
    createdAt: "2024-01-10",
    lastArticle: "2024-06-18",
  },
  {
    id: 3,
    name: "Tips & Trik",
    slug: "tips-trik",
    description: "Tips dan trik untuk aktivitas outdoor",
    articleCount: 8,
    isActive: true,
    isFeatured: false,
    color: "#F59E0B",
    createdAt: "2024-01-08",
    lastArticle: "2024-06-15",
  },
  {
    id: 4,
    name: "Destinasi",
    slug: "destinasi",
    description: "Rekomendasi destinasi wisata alam dan adventure",
    articleCount: 20,
    isActive: true,
    isFeatured: true,
    color: "#EF4444",
    createdAt: "2024-01-05",
    lastArticle: "2024-06-22",
  },
  {
    id: 5,
    name: "Keselamatan",
    slug: "keselamatan",
    description: "Panduan keselamatan untuk aktivitas outdoor",
    articleCount: 6,
    isActive: true,
    isFeatured: false,
    color: "#8B5CF6",
    createdAt: "2024-01-03",
    lastArticle: "2024-06-10",
  },
  {
    id: 6,
    name: "Berita",
    slug: "berita",
    description: "Berita terkini seputar dunia outdoor dan adventure",
    articleCount: 3,
    isActive: false,
    isFeatured: false,
    color: "#6B7280",
    createdAt: "2024-01-01",
    lastArticle: "2024-05-20",
  },
];

const colorOptions = [
  { value: "#10B981", name: "Hijau" },
  { value: "#3B82F6", name: "Biru" },
  { value: "#F59E0B", name: "Kuning" },
  { value: "#EF4444", name: "Merah" },
  { value: "#8B5CF6", name: "Ungu" },
  { value: "#6B7280", name: "Abu-abu" },
  { value: "#EC4899", name: "Pink" },
  { value: "#14B8A6", name: "Teal" },
];

export default function AdminArticleCategoriesPage() {
  const [categories, setCategories] = useState(initialArticleCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isActive: true,
    isFeatured: false,
    color: "#10B981",
  });
  const [errors, setErrors] = useState({});

  const filteredCategories = useMemo(() => {
    return categories
      .filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        // Featured categories first, then by article count
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.articleCount - a.articleCount;
      });
  }, [categories, searchTerm]);

  const validateCategory = (category) => {
    const newErrors = {};
    if (!category.name.trim()) {
      newErrors.name = "Nama kategori wajib diisi";
    }
    if (category.name.length > 50) {
      newErrors.name = "Nama kategori maksimal 50 karakter";
    }
    if (category.description.length > 200) {
      newErrors.description = "Deskripsi maksimal 200 karakter";
    }
    return newErrors;
  };

  const handleAddCategory = () => {
    const validationErrors = validateCategory(newCategory);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const slug = newCategory.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const category = {
      id: Date.now(),
      ...newCategory,
      slug,
      articleCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      lastArticle: null,
    };

    setCategories([category, ...categories]);
    setNewCategory({
      name: "",
      description: "",
      isActive: true,
      isFeatured: false,
      color: "#10B981",
    });
    setIsAddingCategory(false);
    setErrors({});
  };

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
  };

  const handleSaveEdit = () => {
    const validationErrors = validateCategory(editingCategory);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const slug = editingCategory.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? { ...editingCategory, slug } : cat
      )
    );
    setEditingCategory(null);
    setErrors({});
  };

  const handleDeleteCategory = (categoryId, categoryName) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus kategori "${categoryName}"?`
      )
    ) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const handleToggleStatus = (categoryId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  const handleToggleFeatured = (categoryId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, isFeatured: !cat.isFeatured } : cat
      )
    );
  };

  const totalArticles = categories.reduce(
    (sum, cat) => sum + cat.articleCount,
    0
  );
  const activeCategories = categories.filter((cat) => cat.isActive).length;
  const featuredCategories = categories.filter((cat) => cat.isFeatured).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Kelola Kategori Artikel
          </h1>
          <p className="text-gray-600 mt-1">
            Atur dan kelola kategori artikel blog Anda
          </p>
        </div>
        <Button
          onClick={() => setIsAddingCategory(true)}
          className="bg-gray-900 hover:bg-gray-800 text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kategori
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Kategori
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Kategori Aktif
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeCategories}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Kategori Unggulan
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {featuredCategories}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Artikel
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalArticles}
                </p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari kategori artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Category Form */}
      {isAddingCategory && (
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Tambah Kategori Artikel Baru
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="categoryName"
                  className="text-gray-700 font-medium"
                >
                  Nama Kategori *
                </Label>
                <Input
                  id="categoryName"
                  type="text"
                  placeholder="Masukkan nama kategori"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className={`mt-1 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="categoryColor"
                  className="text-gray-700 font-medium"
                >
                  Warna Kategori
                </Label>
                <div className="flex gap-2 mt-1">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() =>
                        setNewCategory({ ...newCategory, color: color.value })
                      }
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                        newCategory.color === color.value
                          ? "border-gray-900 shadow-lg"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label
                htmlFor="categoryDescription"
                className="text-gray-700 font-medium"
              >
                Deskripsi
              </Label>
              <Textarea
                id="categoryDescription"
                placeholder="Masukkan deskripsi kategori (opsional)"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className={`mt-1 ${
                  errors.description
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                }`}
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="categoryActive"
                  checked={newCategory.isActive}
                  onCheckedChange={(checked) =>
                    setNewCategory({ ...newCategory, isActive: checked })
                  }
                />
                <Label htmlFor="categoryActive" className="text-gray-700">
                  Kategori Aktif
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="categoryFeatured"
                  checked={newCategory.isFeatured}
                  onCheckedChange={(checked) =>
                    setNewCategory({ ...newCategory, isFeatured: checked })
                  }
                />
                <Label htmlFor="categoryFeatured" className="text-gray-700">
                  Kategori Unggulan
                </Label>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleAddCategory}
                className="bg-gray-900 hover:bg-gray-800 text-white hover:scale-105 transition-all duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan Kategori
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategory({
                    name: "",
                    description: "",
                    isActive: true,
                    isFeatured: false,
                    color: "#10B981",
                  });
                  setErrors({});
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
              >
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Card
              key={category.id}
              className="border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-gray-300"
            >
              {editingCategory?.id === category.id ? (
                // Edit Mode
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label
                      htmlFor={`editName-${category.id}`}
                      className="text-gray-700 font-medium"
                    >
                      Nama Kategori *
                    </Label>
                    <Input
                      id={`editName-${category.id}`}
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          name: e.target.value,
                        })
                      }
                      className={`mt-1 ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor={`editColor-${category.id}`}
                      className="text-gray-700 font-medium"
                    >
                      Warna Kategori
                    </Label>
                    <div className="flex gap-2 mt-1">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() =>
                            setEditingCategory({
                              ...editingCategory,
                              color: color.value,
                            })
                          }
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                            editingCategory.color === color.value
                              ? "border-gray-900 shadow-lg"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor={`editDescription-${category.id}`}
                      className="text-gray-700 font-medium"
                    >
                      Deskripsi
                    </Label>
                    <Textarea
                      id={`editDescription-${category.id}`}
                      value={editingCategory.description}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          description: e.target.value,
                        })
                      }
                      className={`mt-1 ${
                        errors.description
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      }`}
                      rows={3}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`editActive-${category.id}`}
                        checked={editingCategory.isActive}
                        onCheckedChange={(checked) =>
                          setEditingCategory({
                            ...editingCategory,
                            isActive: checked,
                          })
                        }
                      />
                      <Label
                        htmlFor={`editActive-${category.id}`}
                        className="text-gray-700"
                      >
                        Kategori Aktif
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`editFeatured-${category.id}`}
                        checked={editingCategory.isFeatured}
                        onCheckedChange={(checked) =>
                          setEditingCategory({
                            ...editingCategory,
                            isFeatured: checked,
                          })
                        }
                      />
                      <Label
                        htmlFor={`editFeatured-${category.id}`}
                        className="text-gray-700"
                      >
                        Kategori Unggulan
                      </Label>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleSaveEdit}
                      className="bg-gray-900 hover:bg-gray-800 text-white hover:scale-105 transition-all duration-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingCategory(null);
                        setErrors({});
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </CardContent>
              ) : (
                // View Mode
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {category.name}
                          </h3>
                          {category.isFeatured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={
                              category.isActive ? "default" : "secondary"
                            }
                          >
                            {category.isActive ? "Aktif" : "Nonaktif"}
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            {category.articleCount} artikel
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Kategori
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(category.id)}
                        >
                          {category.isActive ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Nonaktifkan
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Aktifkan
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleFeatured(category.id)}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          {category.isFeatured
                            ? "Hapus dari Unggulan"
                            : "Jadikan Unggulan"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteCategory(category.id, category.name)
                          }
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Kategori
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>
                      Dibuat:{" "}
                      {new Date(category.createdAt).toLocaleDateString("id-ID")}
                    </p>
                    <p>Slug: {category.slug}</p>
                    {category.lastArticle && (
                      <p>
                        Artikel terakhir:{" "}
                        {new Date(category.lastArticle).toLocaleDateString(
                          "id-ID"
                        )}
                      </p>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada kategori ditemukan
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? "Coba ubah kata kunci pencarian Anda."
                    : "Mulai dengan menambahkan kategori artikel pertama."}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setIsAddingCategory(true)}
                    className="bg-gray-900 hover:bg-gray-800 text-white hover:scale-105 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Kategori
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
