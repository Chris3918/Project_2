import React, { useState, useMemo, useCallback, useEffect } from "react";
import "@/app/spotify/components/spotify.css";

/**Presentation
 * Renders a pagination component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {Function} props.goToPreviousPage - The function to navigate to the previous page.
 * @param {Function} props.goToNextPage - The function to navigate to the next page.
 * @returns {JSX.Element} The pagination component.
 */
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

/**Container
 * Handles pagination for the artist list.
 * Built to manage the current page state internally.
 * Drag and drop this function into your component to use it. Easily swappable with different pagination components.
 *
 * @param totalArtistsCount - The total number of artists.
 * @param pageSize - The number of artists to display per page.
 * @param resetTrigger - A trigger to reset the current page back to 1(when overall list changes).
 * @returns An object containing the pagination component, current page, start index, and end index.
 */

interface ArtistPaginationOnChangeProps {
  totalArtistsCount: number; // Total number of artists to paginate through.
  pageSize: number; // Number of artists to display per page.
  resetTrigger: boolean; // A boolean flag used to trigger a reset of the current page.
}

// The ArtistPaginationOnChange component handles the pagination logic for the artist list.
export function ArtistPaginationOnChange({ totalArtistsCount, pageSize, resetTrigger }: ArtistPaginationOnChangeProps) {
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page number.

  // Effect hook that resets the current page to 1 whenever the resetTrigger flag changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [resetTrigger]);

  const totalPages = Math.ceil(totalArtistsCount / pageSize); // Calculate the total number of pages based on the total number of artists and page size.
  const startIndex = (currentPage - 1) * pageSize; // Calculate the index of the first artist to display on the current page.
  const endIndex = Math.min(startIndex + pageSize, totalArtistsCount); // Calculate the index of the last artist to display on the current page.

  // Callback functions to navigate to the previous and next page.
  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);
  const goToNextPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

  // Render the Pagination component with the current page number and navigation callbacks.
  const paginationComponent = (
    <Pagination currentPage={currentPage} goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage} />
  );

  // Return the pagination component and the indices for slicing the artist list.
  return {
    paginationComponent,
    currentPage,
    startIndex,
    endIndex,
  };
}
