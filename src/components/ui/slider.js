"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(
  ({ className, min = 0, max = 100, step = 1, defaultValue, value, onValueChange, ...props }, ref) => {
    const [values, setValues] = React.useState(value || defaultValue || [min, max])

    React.useEffect(() => {
      if (value !== undefined) {
        setValues(value)
      }
    }, [value])

    const handleChange = (index, newValue) => {
      const newValues = [...values]
      newValues[index] = newValue
      setValues(newValues)
      if (onValueChange) {
        onValueChange(newValues)
      }
    }

    return (
      <div ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
        <div className="relative w-full h-2 bg-secondary rounded-full">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{
              left: `${((values[0] - min) / (max - min)) * 100}%`,
              right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
            }}
          />
          {values.map((value, index) => (
            <React.Fragment key={index}>
              <input
                type="range"
                value={value}
                min={min}
                max={max}
                step={step}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleChange(index, Number(e.target.value))}
              />
              <div
                className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                style={{
                  left: `${((value - min) / (max - min)) * 100}%`,
                  top: "50%",
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }
