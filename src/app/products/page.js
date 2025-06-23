"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Filter,
  Grid3x3,
  List,
  Search,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Pagination from "../../components/Pagination";
import ProductGridCard from "../../components/ui/product-grid-card";
import PriceRangeSlider from "../../components/ui/price-range-slider";
import ActiveFilters from "../../components/ui/active-filters";
import {
  allProducts,
  categories,
  brands,
  formatPrice,
} from "../../data/products";

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([200000, 3000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([200000, 3000000]);
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Sort products based on selected option
  const getSortedProducts = () => {
    const sortedProducts = [...allProducts];

    switch (sortBy) {
      case "newest":
        return sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "rating":
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      default:
        return sortedProducts; // featured or default
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
                Produk Kami
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
                Temukan perlengkapan outdoor premium untuk petualangan Anda
                selanjutnya
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari produk..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              {/* Filters - Desktop */}
              <div
                className={`lg:w-1/4 space-y-5 ${
                  filtersVisible ? "block" : "hidden"
                } lg:block bg-white p-5 rounded-xl shadow-sm h-fit sticky top-20 border border-gray-100`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Filter</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-sm text-primary hover:text-primary/80"
                  >
                    Hapus Semua
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFiltersVisible(false)}
                    className="lg:hidden h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Price Range */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-4 text-gray-800">
                    Rentang Harga
                  </h3>
                  <PriceRangeSlider
                    min={0}
                    max={5000000}
                    step={100000}
                    initialMin={priceRange[0]}
                    initialMax={priceRange[1]}
                    formatPrice={formatPrice}
                    onChange={handlePriceRangeChange}
                  />
                </div>

                <Separator className="bg-gray-100" />

                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">Kategori</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center space-x-2 group"
                      >
                        <Checkbox
                          id={`category-${category.name}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => toggleCategory(category.name)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor={`category-${category.name}`}
                          className="text-sm flex items-center justify-between w-full cursor-pointer group-hover:text-primary transition-colors"
                        >
                          <span>{category.name}</span>
                          <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {category.count}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-100" />

                {/* Brands */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">Merek</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {brands.map((brand) => (
                      <div
                        key={brand.name}
                        className="flex items-center space-x-2 group"
                      >
                        <Checkbox
                          id={`brand-${brand.name}`}
                          checked={selectedBrands.includes(brand.name)}
                          onCheckedChange={() => toggleBrand(brand.name)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor={`brand-${brand.name}`}
                          className="text-sm flex items-center justify-between w-full cursor-pointer group-hover:text-primary transition-colors"
                        >
                          <span>{brand.name}</span>
                          <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {brand.count}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-100" />

                {/* Ratings */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">Rating</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center space-x-2 group"
                      >
                        <Checkbox
                          id={`rating-${rating}`}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="text-sm flex items-center justify-between w-full cursor-pointer group-hover:text-primary transition-colors"
                        >
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-gray-700">
                              {rating === 5 ? "& up" : ""}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-100" />

                {/* Apply Filters Button (Mobile) */}
                <Button className="w-full lg:hidden bg-primary hover:bg-primary/90">
                  Terapkan Filter
                </Button>
              </div>

              {/* Products */}
              <div className="lg:w-3/4">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="lg:hidden flex items-center"
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="left"
                        className="w-[300px] sm:w-[400px] overflow-y-auto"
                      >
                        <SheetHeader>
                          <SheetTitle>Filter</SheetTitle>
                          <SheetDescription>
                            Perbaiki pencarian produk Anda
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4 space-y-6">
                          {/* Price Range */}
                          <div>
                            <h3 className="font-semibold mb-4">
                              Rentang Harga
                            </h3>
                            <PriceRangeSlider
                              min={0}
                              max={5000000}
                              step={100000}
                              initialMin={priceRange[0]}
                              initialMax={priceRange[1]}
                              formatPrice={formatPrice}
                              onChange={handlePriceRangeChange}
                            />
                          </div>

                          <Separator />

                          {/* Categories */}
                          <div>
                            <h3 className="font-semibold mb-4">Kategori</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                              {categories.map((category) => (
                                <div
                                  key={category.name}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`mobile-category-${category.name}`}
                                    checked={selectedCategories.includes(
                                      category.name
                                    )}
                                    onCheckedChange={() =>
                                      toggleCategory(category.name)
                                    }
                                  />
                                  <label
                                    htmlFor={`mobile-category-${category.name}`}
                                    className="text-sm flex items-center justify-between w-full cursor-pointer"
                                  >
                                    <span>{category.name}</span>
                                    <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                      {category.count}
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Brands */}
                          <div>
                            <h3 className="font-semibold mb-4">Merek</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                              {brands.map((brand) => (
                                <div
                                  key={brand.name}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`mobile-brand-${brand.name}`}
                                    checked={selectedBrands.includes(
                                      brand.name
                                    )}
                                    onCheckedChange={() =>
                                      toggleBrand(brand.name)
                                    }
                                  />
                                  <label
                                    htmlFor={`mobile-brand-${brand.name}`}
                                    className="text-sm flex items-center justify-between w-full cursor-pointer"
                                  >
                                    <span>{brand.name}</span>
                                    <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                      {brand.count}
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Ratings */}
                          <div>
                            <h3 className="font-semibold mb-4">Rating</h3>
                            <div className="space-y-2">
                              {[5, 4, 3, 2, 1].map((rating) => (
                                <div
                                  key={rating}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox id={`mobile-rating-${rating}`} />
                                  <label
                                    htmlFor={`mobile-rating-${rating}`}
                                    className="text-sm flex items-center justify-between w-full cursor-pointer"
                                  >
                                    <div className="flex items-center">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < rating
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1">
                                        {rating === 5 ? "& up" : ""}
                                      </span>
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-6">
                          <Button variant="outline" onClick={clearFilters}>
                            Hapus Semua
                          </Button>
                          <Button>Terapkan Filter</Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Active Filters */}
                    <ActiveFilters
                      selectedCategories={selectedCategories}
                      selectedBrands={selectedBrands}
                      toggleCategory={toggleCategory}
                      toggleBrand={toggleBrand}
                      clearFilters={clearFilters}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sort - Using native select for more native appearance */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="appearance-none bg-white border border-gray-200 rounded-md pl-4 pr-10 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer min-w-[180px]"
                      >
                        <option value="featured">Unggulan</option>
                        <option value="newest">Terbaru</option>
                        <option value="price-low">
                          Harga: Rendah ke Tinggi
                        </option>
                        <option value="price-high">
                          Harga: Tinggi ke Rendah
                        </option>
                        <option value="rating">Rating Tertinggi</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* View Mode */}
                    <div className="flex border rounded-md overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-10 w-10 rounded-none ${
                          viewMode === "grid" ? "bg-primary text-slate-400" : ""
                        }`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-10 w-10 rounded-none ${
                          viewMode === "list" ? "bg-primary text-slate-400" : ""
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product Count */}
                <div className="mb-4 text-sm text-gray-600">
                  Menampilkan{" "}
                  <span className="font-medium">{sortedProducts.length}</span>{" "}
                  produk
                </div>

                {/* Product Grid/List */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {sortedProducts.map((product) => (
                      <ProductGridCard
                        key={product.id}
                        product={product}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row h-full"
                      >
                        <div className="relative h-48 sm:h-auto sm:w-48 md:w-56 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 200px"
                          />
                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              -{product.discount}%
                            </div>
                          )}
                          {product.isNew && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              New
                            </div>
                          )}
                          {product.isBestSeller && (
                            <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Best Seller
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-current"
                                      : i < product.rating
                                      ? "fill-current opacity-50"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">
                              ({product.reviewCount})
                            </span>
                          </div>
                          <h3 className="font-medium text-base mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-gray-500">
                              {product.brand}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">
                              {product.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2 md:line-clamp-none">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div>
                              {product.discount > 0 ? (
                                <div className="flex items-center">
                                  <span className="font-bold">
                                    {formatPrice(product.price)}
                                  </span>
                                  <span className="text-sm text-gray-500 line-through ml-2">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-bold">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 text-white"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Tambah ke Keranjang
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination totalPages={5} currentPage={1} />
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
