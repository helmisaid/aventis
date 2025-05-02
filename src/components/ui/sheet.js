"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Sheet = ({ children, open, onOpenChange }) => {
  return (
    <div className={cn("fixed inset-0 z-50", open ? "block" : "hidden")}>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  )
}

const SheetTrigger = ({ children, asChild = false, ...props }) => {
  const Comp = asChild ? React.Fragment : "button"
  return <Comp {...props}>{children}</Comp>
}

const SheetContent = ({ children, side = "right", className, ...props }) => {
  return (
    <div
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
        side === "top" && "inset-x-0 top-0 border-b",
        side === "bottom" && "inset-x-0 bottom-0 border-t",
        side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const SheetHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)

const SheetTitle = ({ className, ...props }) => (
  <h3 className={cn("text-lg font-semibold text-foreground", className)} {...props} />
)

const SheetDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription }
