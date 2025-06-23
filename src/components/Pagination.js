import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Pagination({ totalPages, currentPage, baseUrl = "" }) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = 4;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed at the beginning
      if (start > 2) {
        pages.push("...");
      }

      // Add page range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed at the end
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Page Info */}
        <div className="text-sm text-gray-600">
          Halaman{" "}
          <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
          dari{" "}
          <span className="font-semibold text-slate-900">{totalPages}</span>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            asChild={currentPage !== 1}
            className={cn(
              "h-9 px-3 border-gray-200 hover:bg-gray-50",
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            )}
          >
            {currentPage === 1 ? (
              <span className="flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Sebelumnya
              </span>
            ) : (
              <Link
                href={`${baseUrl}?page=${currentPage - 1}`}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Sebelumnya
              </Link>
            )}
          </Button>

          {/* Page Numbers */}
          <div className="hidden sm:flex items-center space-x-1">
            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <div
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-sm text-gray-400"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                );
              }

              return (
                <Button
                  key={`page-${page}`}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-9 w-9 border-gray-200",
                    currentPage === page
                      ? "bg-slate-900 text-white hover:bg-slate-800 border-slate-900"
                      : "hover:bg-gray-50",
                    currentPage === page && "pointer-events-none"
                  )}
                  asChild={currentPage !== page}
                >
                  {currentPage === page ? (
                    <span>{page}</span>
                  ) : (
                    <Link href={`${baseUrl}?page=${page}`}>{page}</Link>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            asChild={currentPage !== totalPages}
            className={cn(
              "h-9 px-3 border-gray-200 hover:bg-gray-50",
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            )}
          >
            {currentPage === totalPages ? (
              <span className="flex items-center">
                Selanjutnya
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            ) : (
              <Link
                href={`${baseUrl}?page=${currentPage + 1}`}
                className="flex items-center"
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Page Numbers */}
      <div className="sm:hidden mt-4 flex justify-center">
        <div className="flex items-center space-x-1">
          {pageNumbers.slice(0, 5).map((page, index) => {
            if (page === "...") {
              return (
                <div
                  key={`mobile-ellipsis-${index}`}
                  className="px-2 py-1 text-sm text-gray-400"
                >
                  ...
                </div>
              );
            }

            return (
              <Button
                key={`mobile-page-${page}`}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 w-8 text-xs border-gray-200",
                  currentPage === page
                    ? "bg-slate-900 text-white hover:bg-slate-800 border-slate-900"
                    : "hover:bg-gray-50",
                  currentPage === page && "pointer-events-none"
                )}
                asChild={currentPage !== page}
              >
                {currentPage === page ? (
                  <span>{page}</span>
                ) : (
                  <Link href={`${baseUrl}?page=${page}`}>{page}</Link>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
