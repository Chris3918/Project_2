import React from "react";
// import "../spotify.css";
import "@/app/spotify/components/spotify.css";
import { UserTopArtistsAndTracks } from "../../../interfaces/getUserTopArtistsAndTracks";

interface TopArtistListProps {
  currentArtists: UserTopArtistsAndTracks.SpotifyItem[];
  startIndex: number;
}

export function TopArtistList({ currentArtists, startIndex }: TopArtistListProps) {
  return (
    <ol className="top-artist-list">
      {currentArtists.map((artist, index) => (
        <li className="top-artist-list-record" key={index}>
          <h2 className="top-artist-list-record-text">
            {startIndex + index + 1}. {artist.name}
          </h2>
        </li>
      ))}
    </ol>
  );
}

interface TopArtistListOnChangeProps {
  currentArtists: UserTopArtistsAndTracks.SpotifyItem[];
  startIndex: number;
}

export function TopArtistListOnChange({ currentArtists, startIndex }: TopArtistListOnChangeProps) {
  const topArtistListOnChangeComponent = <TopArtistList currentArtists={currentArtists} startIndex={startIndex} />;

  return {
    topArtistListOnChangeComponent,
  };
}
