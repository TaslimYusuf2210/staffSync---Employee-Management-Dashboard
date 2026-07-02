interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between p-4 border-t border-neutral-100 text-xs font-bold text-neutral-500">
      <span>
        Showing {startItem} to {endItem} of {totalItems} employees
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg disabled:opacity-50 transition-all cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg disabled:opacity-50 transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
