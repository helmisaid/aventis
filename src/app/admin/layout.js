import AdminSidebar from "@/components/admin/sidebar"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 ">
      <AdminSidebar />
      <div className="flex-1 md:ml-64">
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
