import React, { useState, useMemo, useCallback, useEffect } from "react";
import { TimeRangeRadioButtons } from "@/app/spotify/components/userTopArtist/components/timeRangeRadioButtons_component";
import { TopArtistList } from "./userTopArtist/components/topArtistListRecords_component";
import { UserTopArtistsAndTracks } from "@/app/spotify/interfaces/getUserTopArtistsAndTracks";
import { Pagination } from "./userTopArtist/components/topArtistListPagination_component";


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
  currentArtists: UserTopArtistsAndTracks.SpotifyItem[];
  startIndex: number;
}

export function TopArtists({ currentArtists, startIndex }: TopArtistsProps) {
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