import React, { useState, useMemo, useCallback, useEffect } from "react";
import { TimeRangeRadioButtons } from "@/app/spotify/components/paginationList/TimeRangeRadioButtons";
import { TopArtistList } from "./paginationList/topArtistList";
import { UserTopArtistsAndTracks } from "@/app/spotify/interfaces/getUserTopArtistsAndTracks";
import { Pagination } from "./paginationList/topArtistListPagination";


/**
 * Shows the time range selector.
 * 
 * @param time_range - The current time range.
 * @param setTimeRange - The function to set the time range.
 * @returns The component that displays the time range selector.
 */
interface TimeRangeSelectorProps {
  time_range: string;
  setTimeRange: (value: string) => void;
}

export function TimeRangeSelector({ time_range, setTimeRange }: TimeRangeSelectorProps) {
  const time_ranges = ["short_term", "medium_term", "long_term"];
  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(event.target.value);
  };

  return (
    <TimeRangeRadioButtons
      time_ranges={time_ranges}
      selectedTimeRange={time_range}
      onTimeRangeChange={handleTimeRangeChange}
    />
  );
}



/**
 * Shows the top artists for the current page.
 * 
 * @param topArtistsFullList - The full list of top artists.
 * @param currentPage - The current page number.
 * @param pageSize - The number of items per page.
 * @returns The component that displays the top artists for the current page.
 */
interface TopArtistsProps {
  topArtistsFullList: UserTopArtistsAndTracks.SpotifyItem[];
  currentPage: number;
  pageSize: number;
}

export function TopArtists({ topArtistsFullList, currentPage, pageSize }: TopArtistsProps) {
  const currentArtists = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return topArtistsFullList.slice(startIndex, endIndex);
  }, [topArtistsFullList, currentPage, pageSize]);
  const startIndex = (currentPage - 1) * pageSize;

  return <TopArtistList currentArtists={currentArtists} startIndex={startIndex} />;
}



/**
 * Shows the pagination controls.
 * 
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @param goToPreviousPage - The function to go to the previous page.
 * @param goToNextPage - The function to go to the next page.
 * @returns The component that displays the pagination controls.
 */
interface ArtistPaginationProps {
  currentPage: number;
  totalPages: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;

}

export function ArtistPagination({ currentPage, totalPages, goToPreviousPage, goToNextPage }: ArtistPaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      goToPreviousPage={goToPreviousPage}
      goToNextPage={goToNextPage}
    />
  );
}