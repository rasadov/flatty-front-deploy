import React from "react";
import { ArrowLeft, ArrowRight } from "../assets/icons";
import { Link } from "react-router-dom";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to handle page click
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page); // Trigger page change
    }
  };

  // Get page numbers with ellipses logic
  const getPageNumbers = () => {
    let pages = [];

    if (totalPages <= 5) {
      // If there are 5 or fewer pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Show ellipsis if pages are skipped
      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around the current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show ellipsis if pages are skipped
      if (currentPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show the last page
      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 my-6">
      {/* Left Arrow */}
      { totalPages > 1 && currentPage > 1 && (
        <Link
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md font-semibold text-[16px]  ${
          currentPage === 1
          ? "opacity-50 cursor-not-allowed"
          : "hover:text-[#7949FF]"
          }`}
          >
        <ArrowLeft />
      </Link>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="px-3 py-2 text-[#0F1D40] font-semibold text-[16px]"
          >
            ...
          </span>
        ) : (
          <Link
            key={index}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 text-sm ${
              page === currentPage ? " text-[#8247E5]" : " text-black"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Right Arrow */}
      {totalPages > 1 && currentPage < totalPages && (
        <Link
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md font-semibold text-[16px] ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-[#7949FF]"
          }`}
        >
          <ArrowRight />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
