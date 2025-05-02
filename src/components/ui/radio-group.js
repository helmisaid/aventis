"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, defaultValue, value, onValueChange, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue)

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <div ref={ref} className={cn("grid gap-2", className)} {...props} data-selected-value={selectedValue}>
      {React.Children.map(props.children, (child) => {
        if (child.type === RadioGroupItem) {
          return React.cloneElement(child, {
            checked: selectedValue === child.props.value,
            onChange: () => handleValueChange(child.props.value),
          })
        }
        return child
      })}
    </div>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className, checked, onChange, value, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="radio"
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="peer absolute h-4 w-4 opacity-0"
        value={value}
        {...props}
      />
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full border border-primary ring-offset-background",
          "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          checked && "border-primary",
          className,
        )}
      >
        {checked && <div className="h-2 w-2 rounded-full bg-primary" />}
      </div>
    </div>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
