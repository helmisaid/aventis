"use client";

import { X } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";

const ActiveFilters = ({
  selectedCategories,
  selectedBrands,
  toggleCategory,
  toggleBrand,
  clearFilters,
}) => {
  const hasActiveFilters =
    selectedCategories.length > 0 || selectedBrands.length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Filter Aktif</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Hapus Semua
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {selectedCategories.map((category) => (
          <Badge
            key={`cat-${category}`}
            variant="outline"
            className="flex items-center gap-1 bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 transition-colors px-3 py-1.5 rounded-full"
          >
            <span className="text-xs">Kategori:</span>
            <span className="font-medium">{category}</span>
            <X
              className="h-3 w-3 cursor-pointer hover:text-blue-900"
              onClick={() => toggleCategory(category)}
            />
          </Badge>
        ))}

        {selectedBrands.map((brand) => (
          <Badge
            key={`brand-${brand}`}
            variant="outline"
            className="flex items-center gap-1 bg-green-50 border-green-200 text-green-800 hover:bg-green-100 transition-colors px-3 py-1.5 rounded-full"
          >
            <span className="text-xs">Merek:</span>
            <span className="font-medium">{brand}</span>
            <X
              className="h-3 w-3 cursor-pointer hover:text-green-900"
              onClick={() => toggleBrand(brand)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
