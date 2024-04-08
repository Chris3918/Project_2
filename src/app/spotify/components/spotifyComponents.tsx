"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./spotify.css";
import { useGetTopArtistsFullList } from "@/app/spotify/hooks/spotifyHooks";
import { TimeRangeRadioButtons } from "@/app/spotify/components/TimeRangeRadioButtons";

export function CardGrid() {
  return (
    <div className="force-tocenter">
      <div className="mygrid-layout">
        <div className="nested-grid">
          <div className="mycard"></div>
          <div className="mycard"></div>
        </div>
        <div className="mycard">
          <MyTopArtistCard />
        </div>
        <div className="mycard"></div>
      </div>
    </div>
  );
}

export function MyTopArtistCard() {
  const time_ranges = ["short_term", "medium_term", "long_term"];
  const [time_range, setTimeRange] = useState("medium_term");
  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(event.target.value);
  };
  const topArtistsFullList = useGetTopArtistsFullList(time_range);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(topArtistsFullList.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const currentArtists = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return topArtistsFullList.slice(startIndex, endIndex);
  }, [topArtistsFullList, currentPage, pageSize]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [topArtistsFullList]);

  return (
    <div className="top-artist-container">
      <header className="top-artist-container-header">
        Top Artists
        <TimeRangeRadioButtons
          time_ranges={time_ranges}
          selectedTimeRange={time_range}
          onTimeRangeChange={handleTimeRangeChange}
        />
      </header>
      <main className="top-artist-list-container">
        <ol className="top-artist-list">
          {currentArtists.map((artist, index) => (
            <li className="top-artist-list-record" key={index}>
              <h2 className="top-artist-list-record-text">
                {startIndex + index + 1}. {artist.name}
              </h2>
            </li>
          ))}
        </ol>
      </main>
      <footer className="top-artist-container-footer">
        <div className="pagination">
          <button className="pagination-button" onClick={goToPreviousPage}>
            &lt;
          </button>
          <span className="pagination-page-number">{currentPage}</span>
          <button className="pagination-button" onClick={goToNextPage}>
            &gt;
          </button>
        </div>
      </footer>
    </div>
  );
}

