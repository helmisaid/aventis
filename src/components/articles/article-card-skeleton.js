import { Skeleton } from "../articles/article-card"

export default function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full mx-2" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100 ">
          <Skeleton className="h-6 w-6 rounded-full mr-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}
