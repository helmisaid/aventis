import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

export default function ArticleCard({ article }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {article.date}
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {article.readTime}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{article.excerpt}</p>
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          <Image
            src={article.author.avatar || "/placeholder.svg"}
            alt={article.author.name}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <span className="text-xs font-medium">{article.author.name}</span>
        </div>
      </div>
    </Link>
  )
}
