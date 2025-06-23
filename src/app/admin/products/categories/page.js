"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Tag,
  ChevronDown,
  ChevronRight,
  Save,
  X,
  AlertCircle,
  Package,
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

// Sample categories data
const initialCategories = [
  {
    id: 1,
    name: "Tas & Carrier",
    slug: "tas-carrier",
    description: "Berbagai jenis tas dan carrier untuk kebutuhan outdoor",
    productCount: 15,
    isActive: true,
    createdAt: "2024-01-15",
    subcategories: [
      { id: 11, name: "Tas Gunung", slug: "tas-gunung", productCount: 8 },
      { id: 12, name: "Carrier", slug: "carrier", productCount: 7 },
    ],
  },
  {
    id: 2,
    name: "Sepatu",
    slug: "sepatu",
    description: "Sepatu hiking dan outdoor berkualitas tinggi",
    productCount: 12,
    isActive: true,
    createdAt: "2024-01-10",
    subcategories: [
      { id: 21, name: "Sepatu Hiking", slug: "sepatu-hiking", productCount: 8 },
      { id: 22, name: "Sepatu Trail", slug: "sepatu-trail", productCount: 4 },
    ],
  },
  {
    id: 3,
    name: "Tenda",
    slug: "tenda",
    description: "Tenda camping dan hiking untuk berbagai kondisi",
    productCount: 8,
    isActive: true,
    createdAt: "2024-01-08",
    subcategories: [
      { id: 31, name: "Tenda Dome", slug: "tenda-dome", productCount: 5 },
      { id: 32, name: "Tenda Tunnel", slug: "tenda-tunnel", productCount: 3 },
    ],
  },
  {
    id: 4,
    name: "Jaket & Pakaian",
    slug: "jaket-pakaian",
    description: "Pakaian outdoor dan jaket untuk berbagai cuaca",
    productCount: 20,
    isActive: true,
    createdAt: "2024-01-05",
    subcategories: [
      { id: 41, name: "Jaket Gunung", slug: "jaket-gunung", productCount: 12 },
      {
        id: 42,
        name: "Celana Outdoor",
        slug: "celana-outdoor",
        productCount: 8,
      },
    ],
  },
  {
    id: 5,
    name: "Aksesoris",
    slug: "aksesoris",
    description: "Aksesoris pendukung aktivitas outdoor",
    productCount: 25,
    isActive: false,
    createdAt: "2024-01-03",
    subcategories: [
      { id: 51, name: "Headlamp", slug: "headlamp", productCount: 10 },
      { id: 52, name: "Kompas", slug: "kompas", productCount: 5 },
      { id: 53, name: "Carabiner", slug: "carabiner", productCount: 10 },
    ],
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState(new Set([1, 2]));
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const toggleExpanded = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

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
      productCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      subcategories: [],
    };

    setCategories([category, ...categories]);
    setNewCategory({ name: "", description: "", isActive: true });
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

  const totalProducts = categories.reduce(
    (sum, cat) => sum + cat.productCount,
    0
  );
  const activeCategories = categories.filter((cat) => cat.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Kelola Kategori
          </h1>
          <p className="text-gray-600 mt-1">
            Atur dan kelola kategori produk 
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Tag className="h-8 w-8 text-gray-400" />
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
                  Total Produk
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
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
              placeholder="Cari kategori..."
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
              Tambah Kategori Baru
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
              <div className="flex items-center space-x-2 mt-6">
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
                  setNewCategory({ name: "", description: "", isActive: true });
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
      <div className="space-y-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Card
              key={category.id}
              className="border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-gray-300"
            >
              {editingCategory?.id === category.id ? (
                // Edit Mode
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="flex items-center space-x-2 mt-6">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleExpanded(category.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                      >
                        {expandedCategories.has(category.id) ? (
                          <ChevronDown className="h-4 w-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {category.name}
                          </h3>
                          <Badge
                            variant={
                              category.isActive ? "default" : "secondary"
                            }
                          >
                            {category.isActive ? "Aktif" : "Nonaktif"}
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            {category.productCount} produk
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {category.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Dibuat:{" "}
                          {new Date(category.createdAt).toLocaleDateString(
                            "id-ID"
                          )}{" "}
                          • Slug: {category.slug}
                        </p>
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
                          {category.isActive ? "Nonaktifkan" : "Aktifkan"}
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

                  {/* Subcategories */}
                  {expandedCategories.has(category.id) &&
                    category.subcategories.length > 0 && (
                      <div className="mt-4 pl-8 border-l-2 border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Subkategori:
                        </h4>
                        <div className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                              <div>
                                <span className="text-sm font-medium text-gray-800">
                                  {sub.name}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({sub.productCount} produk)
                                </span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {sub.slug}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada kategori ditemukan
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Coba ubah kata kunci pencarian Anda."
                  : "Mulai dengan menambahkan kategori pertama."}
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
        )}
      </div>
    </div>
  );
}
