import React from "react";
import "@/app/spotify/components/spotify.css";
import { UserTopArtistsAndTracks } from "../../../interfaces/getUserTopArtistsAndTracks";

/**Presentation
 * Renders a list of top artists.
 *
 * @param currentArtists - An array of current artists.
 * @param startIndex - The starting index for the list.
 * @returns The rendered list of top artists.
 */
interface TopArtistListRecordsProps {
  currentArtists: UserTopArtistsAndTracks.SpotifyItem[];
  startIndex: number;
}

export function TopArtistListRecords({ currentArtists, startIndex }: TopArtistListRecordsProps) {
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

/**Container
 * Renders the component for handling the change event of the top artist list.
 *
 * @param currentArtists - The array of current artists.
 * @param startIndex - The index of the starting artist.
 * @returns An object containing the rendered component.
 */
export function TopArtistListRecordsOnChange({ currentArtists, startIndex }: TopArtistListRecordsProps) {
  const topArtistListOnChangeComponent = (
    <TopArtistListRecords currentArtists={currentArtists} startIndex={startIndex} />
  );

  return {
    topArtistListOnChangeComponent,
  };
}
