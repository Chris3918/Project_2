import React from "react";
import "./spotify.css";

interface PaginationProps {
  currentPage: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export function Pagination({ currentPage, goToPreviousPage, goToNextPage }: PaginationProps) {
  return (
    <div className="pagination">
      <button className="pagination-button" onClick={goToPreviousPage}>
        &lt;
      </button>
      <span className="pagination-page-number">{currentPage}</span>
      <button className="pagination-button" onClick={goToNextPage}>
        &gt;
      </button>
    </div>
  );
}
