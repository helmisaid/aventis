"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const Accordion = ({
  type = "single",
  collapsible = false,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = React.useState(
    value || defaultValue || (type === "multiple" ? [] : undefined),
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (itemValue) => {
    let newValue
    if (type === "single") {
      newValue = selectedValue === itemValue && collapsible ? undefined : itemValue
    } else {
      newValue = selectedValue.includes(itemValue)
        ? selectedValue.filter((v) => v !== itemValue)
        : [...selectedValue, itemValue]
    }

    setSelectedValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <div className={cn("", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === AccordionItem) {
          return React.cloneElement(child, {
            isOpen:
              type === "single" ? selectedValue === child.props.value : selectedValue?.includes(child.props.value),
            onToggle: () => handleValueChange(child.props.value),
          })
        }
        return child
      })}
    </div>
  )
}

const AccordionItem = ({ className, value, isOpen, onToggle, children, ...props }) => {
  return (
    <div className={cn("border-b", className)} data-state={isOpen ? "open" : "closed"} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === AccordionTrigger || child.type === AccordionContent) {
          return React.cloneElement(child, {
            isOpen,
            onToggle,
          })
        }
        return child
      })}
    </div>
  )
}

const AccordionTrigger = ({ className, children, isOpen, onToggle, ...props }) => {
  return (
    <h3 className="flex" data-state={isOpen ? "open" : "closed"}>
      <button
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        onClick={onToggle}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </h3>
  )
}

const AccordionContent = ({ className, children, isOpen, ...props }) => {
  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up",
        className,
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
