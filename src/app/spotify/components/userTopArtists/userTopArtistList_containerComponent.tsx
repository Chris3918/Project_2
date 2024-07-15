"use client";
import React, { useState, useMemo, useEffect } from "react";
import "@/app/spotify/components/spotify.css";
import { TopArtistTimeRangeButtonsOnChange } from "@/app/spotify/components/userTopArtists/topArtistTimeRangeButtons_component";
import { ArtistPaginationOnChange } from "@/app/spotify/components/userTopArtists/topArtistListPagination_component";
import { TopArtistListRecordsOnChange } from "@/app/spotify/components/userTopArtists/topArtistListRecords_component";
import { useGetTop50FullList } from "@/app/spotify/hooks/spotifyHooks";

interface UserTopArtistCardProps {
  pageSize: number;
  defaultTimeRange: string;
  time_ranges: string[];
  cardTitle?: string;
  cardType: "Artists" | "Tracks"; //used to determine which api to call in the getTop50FullList hook
}

////////////////////////////
// Wrapper Component ///////
////////////////////////////
export function UserTopArtistCard({
  pageSize,
  time_ranges,
  defaultTimeRange,
  cardTitle,
  cardType,
}: UserTopArtistCardProps): JSX.Element {
  return (
    <UserTopArtistPresentation
      pageSize={pageSize}
      time_ranges={time_ranges}
      defaultTimeRange={defaultTimeRange}
      cardTitle={cardTitle}
      cardType={cardType}
    />
  );
}

////////////////////////////
// Presentation Component //
////////////////////////////
function UserTopArtistPresentation({
  pageSize,
  time_ranges,
  defaultTimeRange,
  cardTitle,
  cardType,
}: UserTopArtistCardProps) {
  const { timeRangeRadioButtonsComponent, topArtistListOnChangeComponent, paginationComponent } =
    UserTopArtistContainer({
      pageSize,
      time_ranges,
      defaultTimeRange,
      cardType,
    });
  return (
    <div className="user-top-artist-card">
      <header className="user-top-artist-card__header">
        {cardTitle}
        {timeRangeRadioButtonsComponent}
      </header>
      <main className="user-top-artist-card__list-container">{topArtistListOnChangeComponent}</main>
      <footer className="user-top-artist-card__footer">{paginationComponent}</footer>
    </div>
  );
}

////////////////////////////
// Container Component /////
////////////////////////////
function UserTopArtistContainer({ pageSize, time_ranges, defaultTimeRange, cardType }: UserTopArtistCardProps) {
  const [resetTrigger, setResetTrigger] = useState(false); // New state to act as a reset trigger...used to let child component that topartistsfulllist has changed, radio button change was too fast and made page number reset to 1 before topartistsfulllist was updated

  const { timeRangeRadioButtonsComponent, selectedTimeRangeButton } = TopArtistTimeRangeButtonsOnChange({
    defaultTimeRange,
    time_ranges,
  });

  const topArtistsFullList = useGetTop50FullList(selectedTimeRangeButton, cardType);

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
