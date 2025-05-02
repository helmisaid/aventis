"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, ShoppingCart, Heart, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Profile",
    href: "/account",
    icon: User,
  },
  {
    title: "Orders",
    href: "/account/orders",
    icon: ShoppingCart,
  },
  {
    title: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    title: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
]

export default function AccountSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
              pathname === item.href ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-300",
            )}
          >
            <item.icon className="w-4 h-4 mr-3" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/logout"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  )
}
