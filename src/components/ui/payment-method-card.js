"use client"

import { useState } from "react"
import Image from "next/image"

export function PaymentMethodCard({ children, value, name, checked, onChange, className, icon }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <label
      className={`relative flex items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
        checked
          ? "border-black bg-gray-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      } ${isFocused ? "ring-2 ring-gray-200" : ""} ${className || ""}`}
    >
      <div className="flex items-center gap-3 w-full">
        <div
          className={`flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-200 ${
            checked ? "border-black bg-black" : "border-gray-300 bg-white"
          }`}
        >
          <div className={`w-2 h-2 rounded-full bg-white ${checked ? "opacity-100" : "opacity-0"}`}></div>
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
        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <div className="flex-shrink-0 w-10 h-6 relative">
              <Image src={icon || "/placeholder.svg"} alt={children} fill className="object-contain" />
            </div>
          )}
          <div className="font-medium">{children}</div>
        </div>
      </div>
    </label>
  )
}
