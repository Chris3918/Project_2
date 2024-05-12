"use client";
import React, { useState, useMemo, useEffect } from "react";
import "@/app/spotify/components/spotify.css";
import { useGetTopArtistsFullList } from "@/app/spotify/hooks/spotifyHooks";
import { TopArtistTimeRangeButtonsOnChange } from "@/app/spotify/components/userTopArtists/topArtistTimeRangeButtons_component";
import { ArtistPaginationOnChange } from "@/app/spotify/components/userTopArtists/topArtistListPagination_component";
import { TopArtistListRecordsOnChange } from "@/app/spotify/components/userTopArtists/topArtistListRecords_component";
import { useGetTopTracksFullList } from "@/app/spotify/hooks/spotifyHooks";

interface UserTopArtistCardProps {
  pageSize: number;
  defaultTimeRange: string;
  time_ranges: string[];
  
}


export function UserTopTracksCard({ pageSize, time_ranges, defaultTimeRange }: UserTopArtistCardProps): JSX.Element {
  return (
    <UserTopArtistPresentation pageSize={pageSize} time_ranges={time_ranges} defaultTimeRange={defaultTimeRange} />
  );
}


////////////////////////////
// Wrapper Component ///////
////////////////////////////
export function UserTopArtistCard({ pageSize, time_ranges, defaultTimeRange }: UserTopArtistCardProps): JSX.Element {
  return (
    <UserTopArtistPresentation pageSize={pageSize} time_ranges={time_ranges} defaultTimeRange={defaultTimeRange} />
  );
}

////////////////////////////
// Presentation Component //
////////////////////////////
function UserTopArtistPresentation({ pageSize, time_ranges, defaultTimeRange }: UserTopArtistCardProps) {
  const { timeRangeRadioButtonsComponent, topArtistListOnChangeComponent, paginationComponent } =
    UserTopArtistContainer({
      pageSize,
      time_ranges,
      defaultTimeRange,
    });
  return (
    <div className="top-artist-container">
      <header className="top-artist-container-header">
        Top Artists
        {timeRangeRadioButtonsComponent}
      </header>
      <main className="top-artist-list-container">{topArtistListOnChangeComponent}</main>
      <footer className="top-artist-container-footer">{paginationComponent}</footer>
    </div>
  );
}

////////////////////////////
// Container Component /////
////////////////////////////
function UserTopArtistContainer({ pageSize, time_ranges, defaultTimeRange }: UserTopArtistCardProps) {
  const [resetTrigger, setResetTrigger] = useState(false); // New state to act as a reset trigger...used to let child component that topartistsfulllist has changed, radio button change was too fast and made page number reset to 1 before topartistsfulllist was updated

  const { timeRangeRadioButtonsComponent, selectedTimeRangeButton } = TopArtistTimeRangeButtonsOnChange({
    defaultTimeRange,
    time_ranges,
  });

  // const topArtistsFullList = useGetTopArtistsFullList(selectedTimeRangeButton);
  const topArtistsFullList = useGetTopTracksFullList(selectedTimeRangeButton);

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
  const { topArtistListOnChangeComponent } = TopArtistListRecordsOnChange({
    currentArtists,
    startIndex,
  });

  return {
    timeRangeRadioButtonsComponent,
    topArtistListOnChangeComponent,
    paginationComponent,
  };
}
