"use client"

import { ShoppingBag, CreditCard, CheckCircle } from "lucide-react"

export function CheckoutSteps({ currentStep }) {
  const steps = [
    { id: 1, name: "Pengiriman", icon: ShoppingBag },
    { id: 2, name: "Pembayaran", icon: CreditCard },
    { id: 3, name: "Konfirmasi", icon: CheckCircle },
  ]

  return (
    <div className="hidden md:flex w-full max-w-3xl mx-auto">
      {steps.map((step, index) => (
        <div key={step.id} className="w-1/3 text-center">
          {index > 0 && (
            <div
              className={`absolute top-5 left-0 right-0 h-0.5 transition-colors duration-300 ${
                currentStep >= step.id ? "bg-black" : "bg-gray-200"
              }`}
              style={{ zIndex: 0 }}
            ></div>
          )}
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto relative z-10 transition-all duration-300 ${
              currentStep >= step.id ? "bg-black text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            <step.icon className="h-5 w-5" />
          </div>
          <span
            className={`text-sm font-medium mt-2 block transition-colors duration-300 ${
              currentStep >= step.id ? "text-black" : "text-gray-500"
            }`}
          >
            {step.name}
          </span>
        </div>
      ))}
    </div>
  )
}
