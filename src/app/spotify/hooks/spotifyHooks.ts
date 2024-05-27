import { useState, useEffect, useMemo } from "react";
import { SpotifyAPI_CS } from "@/app/Connections/Connections_CS/spotifyApi_CS";
import { UserTopArtistsAndTracks } from "@/app/spotify/interfaces/getUserTopArtistsAndTracks";
import { SpotifyUser } from '@/app/spotify/interfaces/userPublicProfileStructure';
//notes: custom hooks must start with "use"

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

// Inefficiencies Found:
// The useMemo hook is used to instantiate a new SpotifyAPI_CS object, but since the dependencies array is empty, this object will be created only once, and the memoization is not necessary. However, if the SpotifyAPI_CS constructor had side effects or was computationally expensive, memoization would be justified.
// The useEffect hook within useGetTopArtistsFullList does not have any cleanup function for ongoing requests. If the component unmounts before the request completes, this could lead to a memory leak or state updates on an unmounted component.

export const useGetTopTracksFullList = (time_range: string) => {
  const limit = 50;
  const spotifyApi = useMemo(() => new SpotifyAPI_CS(), []);
  const [topArtistsFullList, setTopArtistsFullList] = useState<UserTopArtistsAndTracks.SpotifyItem[]>([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await spotifyApi.getUserTopTracks(time_range, limit);
        setTopArtistsFullList(response.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopArtists();
  }, [spotifyApi, limit, time_range]);

  return topArtistsFullList;
};

export const useGetTop50FullList = (time_range: string, cardType: "Artists" | "Tracks") => {
  const limit = 50;
  const spotifyApi = useMemo(() => new SpotifyAPI_CS(), []);
  const [topArtistsFullList, setTopArtistsFullList] = useState<UserTopArtistsAndTracks.SpotifyItem[]>([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        // Use a ternary operator to decide which API method to call
        const response =
          cardType === "Artists"
            ? await spotifyApi.getUserTopArtists(time_range, limit)
            : await spotifyApi.getUserTopTracks(time_range, limit);
        setTopArtistsFullList(response.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopArtists();
  }, [spotifyApi, limit, time_range, cardType]);

  return topArtistsFullList;
};

  
// Define the hook  
export const useUserPublicProfile = (userId: number) => {  
  const [userInfo, setUserInfo] = useState<SpotifyUser.UserInfo | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {  
    // Create an instance of SpotifyAPI_CS  
    const spotifyApi = new SpotifyAPI_CS();  
  
    // Define an async function to fetch the user's public profile  
    const fetchUserPublicProfile = async () => {  
      try {  
        // Attempt to fetch the user's public profile using the provided method  
        const userProfile = await spotifyApi.getUserPublicProfile(userId);  
        // If successful, update the userInfo state  
        setUserInfo(userProfile);  
      } catch (err) {  
        // If an error occurs, set the error state  
        setError(err instanceof Error ? err.message : String(err));  
      } finally {  
        // Once the request is complete, set loading to false  
        setLoading(false);  
      }  
    };  
  
    // Call the function to fetch the user's public profile  
    fetchUserPublicProfile();  
  }, [userId]); // The effect depends on userId and will re-run if userId changes  
  
  // Return the user info, loading status, and any error from the hook  
  return { userInfo, loading, error };  
};  
  



// export const useUserPublicProfile = (user_Id: number) => {

// }



















// import { useState, useEffect } from 'react';
// import { SpotifyUser } from './spotifyApi_CS';

// export function useUserPublicProfile(user_Id: number) {
//   const [data, setData] = useState<SpotifyUser.UserInfo | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchUserPublicProfile = async () => {
//       setLoading(true);
//       try {
//         const profile = await SpotifyUser.getUserPublicProfile(user_Id);
//         setData(profile);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserPublicProfile();
//   }, [user_Id]);

//   return { data, error, loading };
// }