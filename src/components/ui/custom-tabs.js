"use client"

export function CustomTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.value ? "bg-white text-black shadow-sm rounded-md" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab.icon && <tab.icon className="h-4 w-4" />}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
