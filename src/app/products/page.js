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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Pagination from "../../components/Pagination";

// Mock categories
const categories = [
  { name: "Hiking", count: 42 },
  { name: "Camping", count: 38 },
  { name: "Climbing", count: 24 },
  { name: "Clothing", count: 56 },
  { name: "Footwear", count: 31 },
  { name: "Accessories", count: 45 },
];

// Mock brands
const brands = [
  { name: "Aventis", count: 28 },
  { name: "Mountain Pro", count: 24 },
  { name: "OutdoorElite", count: 19 },
  { name: "TrailMaster", count: 16 },
  { name: "WildernessGear", count: 14 },
  { name: "SummitClimb", count: 12 },
];

// Mock products
const products = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: [
    "Aventis Hiking Backpack 45L",
    "TrailMaster Trekking Poles",
    "OutdoorElite Camping Tent 2-Person",
    "WildernessGear Sleeping Bag",
    "Mountain Pro Climbing Harness",
    "Aventis Waterproof Jacket",
    "TrailMaster Hiking Boots",
    "SummitClimb Carabiners Set",
    "OutdoorElite Camping Stove",
    "WildernessGear Headlamp",
    "Mountain Pro Trekking Pants",
    "Aventis Insulated Water Bottle",
  ][i % 12],
  price: Math.floor(Math.random() * 2000000) + 200000,
  originalPrice: Math.floor(Math.random() * 3000000) + 500000,
  discount: Math.floor(Math.random() * 40) + 10,
  rating: (Math.floor(Math.random() * 15) + 35) / 10,
  reviewCount: Math.floor(Math.random() * 100) + 10,
  image: `/placeholder.svg?height=400&width=400&text=Product+${i + 1}`,
  isNew: i % 5 === 0,
  isBestSeller: i % 7 === 0,
  category: categories[Math.floor(Math.random() * categories.length)].name,
  brand: brands[Math.floor(Math.random() * brands.length)].name,
}));

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([200000, 3000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Our Products
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Discover premium outdoor gear for your next adventure
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <div
                className={`lg:w-1/4 space-y-6 ${
                  filtersVisible ? "block" : "hidden"
                } lg:block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-fit sticky top-20`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-sm text-primary hover:text-primary/80"
                  >
                    Clear All
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
                <div>
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[200000, 3000000]}
                      min={0}
                      max={5000000}
                      step={100000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {formatPrice(priceRange[0])}
                      </span>
                      <span className="text-sm">
                        {formatPrice(priceRange[1])}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.name}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => toggleCategory(category.name)}
                        />
                        <label
                          htmlFor={`category-${category.name}`}
                          className="text-sm flex items-center justify-between w-full cursor-pointer"
                        >
                          <span>{category.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs">
                            ({category.count})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Brands */}
                <div>
                  <h3 className="font-semibold mb-4">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div
                        key={brand.name}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`brand-${brand.name}`}
                          checked={selectedBrands.includes(brand.name)}
                          onCheckedChange={() => toggleBrand(brand.name)}
                        />
                        <label
                          htmlFor={`brand-${brand.name}`}
                          className="text-sm flex items-center justify-between w-full cursor-pointer"
                        >
                          <span>{brand.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs">
                            ({brand.count})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Ratings */}
                <div>
                  <h3 className="font-semibold mb-4">Ratings</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label
                          htmlFor={`rating-${rating}`}
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

                <Separator />

                {/* Apply Filters Button (Mobile) */}
                <Button className="w-full lg:hidden">Apply Filters</Button>
              </div>

              {/* Products */}
              <div className="lg:w-3/4">
                {/* Toolbar */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="lg:hidden"
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="left"
                        className="w-[300px] sm:w-[400px] overflow-y-auto"
                      >
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                          <SheetDescription>
                            Refine your product search
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4 space-y-6">
                          {/* Price Range */}
                          <div>
                            <h3 className="font-semibold mb-4">Price Range</h3>
                            <div className="space-y-4">
                              <Slider
                                defaultValue={[200000, 3000000]}
                                min={0}
                                max={5000000}
                                step={100000}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="my-6"
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-sm">
                                  {formatPrice(priceRange[0])}
                                </span>
                                <span className="text-sm">
                                  {formatPrice(priceRange[1])}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Categories */}
                          <div>
                            <h3 className="font-semibold mb-4">Categories</h3>
                            <div className="space-y-2">
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
                                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                                      ({category.count})
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Brands */}
                          <div>
                            <h3 className="font-semibold mb-4">Brands</h3>
                            <div className="space-y-2">
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
                                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                                      ({brand.count})
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Ratings */}
                          <div>
                            <h3 className="font-semibold mb-4">Ratings</h3>
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
                            Clear All
                          </Button>
                          <Button>Apply Filters</Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Active Filters */}
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category) => (
                        <Badge
                          key={`cat-${category}`}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {category}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => toggleCategory(category)}
                          />
                        </Badge>
                      ))}
                      {selectedBrands.map((brand) => (
                        <Badge
                          key={`brand-${brand}`}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {brand}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => toggleBrand(brand)}
                          />
                        </Badge>
                      ))}
                      {(selectedCategories.length > 0 ||
                        selectedBrands.length > 0) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-6 text-xs text-primary hover:text-primary/80"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-auto">
                    {/* Sort */}
                    <Select defaultValue="featured">
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Mode */}
                    <div className="flex border rounded-md overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-none ${
                          viewMode === "grid" ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-none ${
                          viewMode === "list" ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product Grid/List */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              -{product.discount}%
                            </div>
                          )}
                          {product.isNew && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                              New
                            </div>
                          )}
                          {product.isBestSeller && (
                            <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Best Seller
                            </div>
                          )}
                          <Button
                            size="icon"
                            className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
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
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              ({product.reviewCount})
                            </span>
                          </div>
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {product.brand}
                          </p>
                          <div className="mt-auto">
                            {product.discount > 0 ? (
                              <div className="flex items-center">
                                <span className="font-bold">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row h-full"
                      >
                        <div className="relative h-64 sm:h-auto sm:w-48 md:w-64 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              -{product.discount}%
                            </div>
                          )}
                          {product.isNew && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                              New
                            </div>
                          )}
                          {product.isBestSeller && (
                            <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
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
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              ({product.reviewCount})
                            </span>
                          </div>
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {product.brand}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {product.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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
                                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
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
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <Pagination totalPages={5} currentPage={1} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
