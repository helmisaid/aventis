"use client"

import { X } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"

const ActiveFilters = ({ selectedCategories, selectedBrands, toggleCategory, toggleBrand, clearFilters }) => {
  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0

  if (!hasActiveFilters) return null

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {selectedCategories.map((category) => (
        <Badge
          key={`cat-${category}`}
          variant="outline"
          className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-1.5 rounded-full"
        >
          {category}
          <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(category)} />
        </Badge>
      ))}
      {selectedBrands.map((brand) => (
        <Badge
          key={`brand-${brand}`}
          variant="outline"
          className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-1.5 rounded-full"
        >
          {brand}
          <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
        </Badge>
      ))}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-7 text-xs text-primary hover:text-primary/80 hover:bg-gray-50"
        >
          Clear All
        </Button>
      )}
    </div>
  )
}

export default ActiveFilters
