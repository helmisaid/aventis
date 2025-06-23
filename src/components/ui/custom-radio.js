"use client"

import { useState } from "react"

export function CustomRadio({ children, value, name, checked, onChange, className, price }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <label
      className={`relative flex items-center justify-between p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
        checked
          ? "border-black bg-gray-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      } ${isFocused ? "ring-2 ring-gray-200" : ""} ${className || ""}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-200 ${
            checked ? "border-black bg-black" : "border-gray-300 bg-white"
          }`}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-white"></div>}
        </div>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex-1">{children}</div>
      </div>
      {price && <div className="text-sm font-medium">{price}</div>}
    </label>
  )
}
