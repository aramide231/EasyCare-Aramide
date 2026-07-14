import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "@/constant/pagination";
import { getTotalPages } from "@/pages/nurse/lib/pagination";

export function usePaginatedList<T>(items: T[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = getTotalPages(items.length, PAGE_SIZE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, currentPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  };
}
