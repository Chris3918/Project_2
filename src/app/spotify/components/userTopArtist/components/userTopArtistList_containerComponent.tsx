"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
// import "./spotify.css";
import "@/app/spotify/components/spotify.css";
import { useGetTopArtistsFullList } from "@/app/spotify/hooks/spotifyHooks";
import { TimeRangeRadioButtonsOnChange } from "@/app/spotify/components/userTopArtist/components/timeRangeRadioButtons_component";
import { ArtistPaginationOnChange } from "@/app/spotify/components/userTopArtist/components/topArtistListPagination_component";
import { TopArtistListOnChange } from "@/app/spotify/components/userTopArtist/components/topArtistListRecords_component";

interface UserTopArtistService {
  pageSize: number;
  defaultTimeRange: string;
  time_ranges: string[];
}

export function UserTopArtistService({ pageSize, time_ranges, defaultTimeRange }: UserTopArtistService) {
  const [resetTrigger, setResetTrigger] = useState(false); // New state to act as a reset trigger...used to let child component that topartistsfulllist has changed, radio button change was too fast and made page number reset to 1 before topartistsfulllist was updated


  const { timeRangeRadioButtonsComponent, selectedTimeRangeButton } = TimeRangeRadioButtonsOnChange({
    defaultTimeRange,
    time_ranges,
  });

  // const { timeRangeRadioButtonsComponent, selectedTimeRangeButton } = TimeRangeRadioButtonsOnChange({
  //   defaultTimeRange,
  //   time_ranges,
  // });

  const topArtistsFullList = useGetTopArtistsFullList(selectedTimeRangeButton);

  // Toggle the resetTrigger flag whenever topArtistsFullList changes
  useEffect(() => {
    setResetTrigger((prev) => !prev);
  }, [topArtistsFullList]);

  // Pagination
  const { paginationComponent, startIndex, endIndex } = ArtistPaginationOnChange({
    totalArtistsCount: topArtistsFullList.length,
    pageSize,
    resetTrigger,
  });

  // Create current list by slicing the topArtistsFullList based on the start and end index provided by ArtistPaginationOnChange
  const currentArtists = useMemo(
    () => topArtistsFullList.slice(startIndex, endIndex),
    [topArtistsFullList, startIndex, endIndex]
  );

  // artist list display logic
  const { topArtistListOnChangeComponent } = TopArtistListOnChange({
    currentArtists,
    startIndex,
  });

  return {
    timeRangeRadioButtonsComponent,
    topArtistListOnChangeComponent,
    paginationComponent,
  };
}
////////////////////////////
// Presentation Component //
////////////////////////////
interface UserTopArtistPresentationProps {
  pageSize: number;
  defaultTimeRange: string;
  time_ranges: string[];
}

export function UserTopArtistPresentation({ pageSize, time_ranges, defaultTimeRange }: UserTopArtistPresentationProps) {
  const { timeRangeRadioButtonsComponent, topArtistListOnChangeComponent, paginationComponent } = UserTopArtistService({
    pageSize,
    time_ranges,
    defaultTimeRange,
  });
  const userTopArtist = (
    <div className="top-artist-container">
      <header className="top-artist-container-header">
        Top Artists
        {timeRangeRadioButtonsComponent}
      </header>
      <main className="top-artist-list-container">{topArtistListOnChangeComponent}</main>
      <footer className="top-artist-container-footer">{paginationComponent}</footer>
    </div>
  );

  return { userTopArtist };
}

interface UserTopArtistProps {
  pageSize: number;
  defaultTimeRange: string;
  time_ranges: string[];
}
export function UserTopArtist({ pageSize, time_ranges, defaultTimeRange }: UserTopArtistProps) {
  const { userTopArtist } = UserTopArtistPresentation({ pageSize, time_ranges, defaultTimeRange });
  return {userTopArtist} ;
}
