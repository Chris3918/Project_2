import { useState, useEffect, useMemo } from "react";
import { SpotifyAPI_CS } from "@/app/Connections/Connections_CS/spotifyApi_CS";
import { UserTopArtistsAndTracks } from "@/app/spotify/interfaces/getUserTopArtistsAndTracks";

/**
 * Custom hook to fetch the user's top artists from the Spotify API.
 * @param time_range - The time range for which to fetch the top artists.
 * @returns An array of UserTopArtistsAndTracks.SpotifyItem representing the user's top artists.
 */
export const useGetTopArtistsFullList = (time_range: string) => {
  const limit = 50;
  const spotifyApi = useMemo(() => new SpotifyAPI_CS(), []);
  const [topArtistsFullList, setTopArtistsFullList] = useState<UserTopArtistsAndTracks.SpotifyItem[]>([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await spotifyApi.getUserTopArtists(time_range, limit);
        setTopArtistsFullList(response.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopArtists();
  }, [spotifyApi, limit, time_range]);

  return topArtistsFullList;
};


