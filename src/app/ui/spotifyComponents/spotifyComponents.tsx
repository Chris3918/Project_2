"use client";
import { useMemo } from "react";
import React, { useState, useEffect } from "react";
import "./spotify.css";
import { SpotifyAPI_CS } from "@/app/Connections/Connections_CS/spotifyApi_CS";
import { UserTopArtistsAndTracks } from "@/app/dataStructures/spotifyStructures/getUserTopArtistsAndTracks";

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
  const [topArtists, setTopArtists] = useState<
    UserTopArtistsAndTracks.SpotifyItem[]
  >([]);

  const spotifyApi = useMemo(() => new SpotifyAPI_CS(), []); //    const spotifyApi = new SpotifyAPI_CS();

  useEffect(() => {
    const fetchTopArtists = async () => {
      const time_range = "short_term";
      const limit = 10;
      try {
        const response = await spotifyApi.getUserTopArtists(time_range, limit);
        setTopArtists(response.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopArtists();
  }, [spotifyApi]);

  return (
    <div className="top-artist-container">
      <header className="top-artist-container-header">Top Artists</header>
      <main className="top-artist-list-container">
        <ol className="top-artist-list">
          {topArtists.map((artist, index) => (
            <li className="top-artist-list-record" key={index}>
              <h2 className="top-artist-list-record-text">
                {index + 1}. {artist.name}
              </h2>
            </li>
          ))}
        </ol>
      </main>
      <footer className="top-artist-container-footer">
        <div className="pagination">
          <button className="pagination-button">&lt;</button>
          <span className="pagination-page-number">1</span>
          <button className="pagination-button">&gt;</button>
        </div>
      </footer>
    </div>
  );
}
