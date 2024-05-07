"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./spotify.css";
import { useGetTopArtistsFullList } from "@/app/spotify/hooks/spotifyHooks";
import { TopArtistTimeRangeButtonsOnChange } from "@/app/spotify/components/userTopArtist/components/topArtistTimeRangeButtons_component";
import { ArtistPaginationOnChange } from "@/app/spotify/components/userTopArtist/components/topArtistListPagination_component";
import { TopArtistListRecordsOnChange } from "@/app/spotify/components/userTopArtist/components/topArtistListRecords_component";
import { UserTopArtistCard } from "./userTopArtist/components/userTopArtistList_containerComponent";

export function CardGrid() {
  const { userTopArtistCard } = UserTopArtistCard({
    pageSize: 10,
    time_ranges: ["short_term", "medium_term", "long_term"],
    defaultTimeRange: "medium_term",
  });
  return (
    <div className="force-tocenter">
      <div className="mygrid-layout">
        <div className="nested-grid">
          <div className="mycard"></div>
          <div className="mycard"></div>
        </div>
        <div className="mycard">
          {userTopArtistCard}
          {/* <MyTopArtistCard /> */}
        </div>
        <div className="mycard"></div>
      </div>
    </div>
  );
}

// interface MyTopArtistCardProps {
//   pageSize?: number;
//   time_ranges?: string[];
//   defaultTimeRange?: string;
// }

// function MyTopArtistCard({
//   pageSize = 10,
//   time_ranges = ["short_term", "medium_term", "long_term"],
//   defaultTimeRange = "medium_term",
// }: MyTopArtistCardProps): JSX.Element {
//   const { timeRangeRadioButtonsComponent, selectedTimeRangeButton } = TopArtistTimeRangeButtonsOnChange({
//     defaultTimeRange,
//     time_ranges,
//   });

//   const topArtistsFullList = useGetTopArtistsFullList(selectedTimeRangeButton);

//   const [resetTrigger, setResetTrigger] = useState(false); // New state to act as a reset trigger...used to let child component that topartistsfulllist has changed, radio button change was too fast and made page number reset to 1 before topartistsfulllist was updated
//   // Toggle the resetTrigger flag whenever topArtistsFullList changes
//   useEffect(() => {
//     setResetTrigger((prev) => !prev);
//   }, [topArtistsFullList]);

//   // Pagination
//   const { paginationComponent, startIndex, endIndex } = ArtistPaginationOnChange({
//     totalArtistsCount: topArtistsFullList.length,
//     pageSize,
//     resetTrigger,
//   });

//   // Create current list by slicing the topArtistsFullList based on the start and end index provided by ArtistPaginationOnChange
//   const currentArtists = useMemo(
//     () => topArtistsFullList.slice(startIndex, endIndex),
//     [topArtistsFullList, startIndex, endIndex]
//   );

//   // artist list display logic
//   const { topArtistListOnChangeComponent } = TopArtistListOnChange({
//     currentArtists,
//     startIndex,
//   });

//   return (
//     <div className="top-artist-container">
//       <header className="top-artist-container-header">
//         Top Artists
//         {timeRangeRadioButtonsComponent}
//       </header>
//       <main className="top-artist-list-container">{topArtistListOnChangeComponent}</main>
//       <footer className="top-artist-container-footer">{paginationComponent}</footer>
//     </div>
//   );
// }
