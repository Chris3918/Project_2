"use client";
import { SpotifyTokenResponse } from "../interfaces/spotifyToken";
import { SpotifyTokenWithAuthResponse } from "../interfaces/spotifyTokenWithAuth";
import { RefreshTokenResponse } from "../interfaces/refreshTokenResponse";
import { SpotifyAPI_IS } from "../../Connections/Connections_IS/spotifyApi_IS";
import React, { useState, useMemo, useCallback, useEffect } from "react";

import { SpotifyArtist } from "@/app/spotify/interfaces/getArtistInfo";
import { UserTopArtistsAndTracks } from "@/app/spotify/interfaces/getUserTopArtistsAndTracks";
import { SpotifyAPI_CS } from "@/app/Connections/Connections_CS/spotifyApi_CS";
import "./spotify.css";
import { useGetTopArtistsFullList } from "@/app/spotify/hooks/spotifyHooks";
import { TimeRangeRadioButtons } from "@/app/spotify/components/userTopArtist/components/timeRangeRadioButtons_component";
import { Pagination } from "@/app/spotify/components/userTopArtist/components/topArtistListPagination_component";
import { TopArtistList } from "@/app/spotify/components/userTopArtist/components/topArtistListRecords_component";


export function GetShowSpotifyPublicToken() {
  const [token, setToken] = useState<SpotifyTokenResponse | null>(null); //This line uses the useState hook from React to create a new state variable named token and a function to update it named setToken. The initial value of token is null, and its type is either SpotifyTokenResponse or null.

  useEffect(() => {
    const fetchToken = async () => {
      const spotifyAPI = new SpotifyAPI_IS();
      const response = await spotifyAPI.getPublicToken();
      setToken(response);
    };

    fetchToken();
  }, []);

  return (
    <div>
      <div>My Spotify token info</div>
      {token && <div>Token: {token.access_token}</div>}{" "}
      {/*if token is truthy (i.e., exists and is not null, undefined, false, 0, NaN, or an empty string), then render the <div> element. Otherwise, render nothing.This line uses the && operator to conditionally render the token.access_token value. If token is not null, the token.access_token value is rendered.*/}
      {token && <div>Token type: {token.token_type}</div>}
      {token && <div>Expires in: {token.expires_in}</div>}
    </div>
  );
}

//todo:
// 1. add token as a parameter to GetShowSpotifyArtistInfo
export function GetShowSpotifyArtistInfo() {
  const [artistInfo, setArtistInfo] = useState<SpotifyArtist.ArtistInfo | null>(
    null
  );
  const [token, setToken] = useState<SpotifyTokenResponse | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const spotifyAPI = new SpotifyAPI_IS();
      const response = await spotifyAPI.getPublicToken();
      setToken(response);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchArtistInfo = async () => {
        const spotifyAPI = new SpotifyAPI_IS();
        const response = await spotifyAPI.getArtistInfo(
          token.access_token,
          "4Z8W4fKeB5YxbusRsdQVPb"
        );
        setArtistInfo(response);
      };

      fetchArtistInfo();
    }
  }, [token]);

  return (
    <div>
      <div>My Spotify artist info</div>
      {artistInfo && <div>Artist name: {artistInfo.name}</div>}
      {artistInfo && <div>Followers: {artistInfo.followers.total}</div>}
      {artistInfo && <div>Popularity: {artistInfo.popularity}</div>}
      {artistInfo && (
        <div>Response json string: {JSON.stringify(artistInfo)} </div>
      )}
      {artistInfo && <div>link: {artistInfo.external_urls.spotify}</div>}
    </div>
  );
}

export function GetShowSpotifyTokenWithAuth() {
  const [token, setToken] = useState<SpotifyTokenWithAuthResponse | null>(null); //This line uses the useState hook from React to create a new state variable named token and a function to update it named setToken. The initial value of token is null, and its type is either SpotifyTokenResponse or null.

  useEffect(() => {
    const fetchToken = async () => {
      const spotifyAPI = new SpotifyAPI_IS();
      const response = await spotifyAPI.getrefreshTokenWithAuthCode();
      setToken(response);
    };

    fetchToken();
  }, []);

  return (
    <div>
      <div>My Spotify token info</div>
      {token && <div>Token: {token.access_token}</div>}{" "}
      {/*if token is truthy (i.e., exists and is not null, undefined, false, 0, NaN, or an empty string), then render the <div> element. Otherwise, render nothing.This line uses the && operator to conditionally render the token.access_token value. If token is not null, the token.access_token value is rendered.*/}
      {token && <div>Token type: {token.token_type}</div>}
      {token && <div>Scope: {token.scope}</div>}
      {token && <div>Expires in: {token.expires_in}</div>}
      {token && <div>Refresh token: {token.refresh_token}</div>}
    </div>
  );
}

export function GetShowRefreshToken() {
  const [token, setToken] = useState<RefreshTokenResponse | null>(null); //This line uses the useState hook from React to create a new state variable named token and a function to update it named setToken. The initial value of token is null, and its type is either SpotifyTokenResponse or null.

  useEffect(() => {
    const fetchToken = async () => {
      const spotifyAPI = new SpotifyAPI_IS();
      const response = await spotifyAPI.refreshToken_IS();
      setToken(response);
    };

    fetchToken();
  }, []);
  // console.log(process.env.SPOTIFY_CLIENT_ID)
  // console.log(process.env.SPOTIFY_CLIENT_SECRET)

  return (
    <div>
      <div>My Spotify refresh token info</div>
      {token && <div>Token: {token.access_token}</div>}{" "}
      {/*if token is truthy (i.e., exists and is not null, undefined, false, 0, NaN, or an empty string), then render the <div> element. Otherwise, render nothing.This line uses the && operator to conditionally render the token.access_token value. If token is not null, the token.access_token value is rendered.*/}
      {token && <div>Token type: {token.token_type}</div>}
      {token && <div>Expires in: {token.expires_in}</div>}
      {token && <div>Scope: {token.scope}</div>}
    </div>
  );
}

export function GetUserTopArtistsAndTracks() {
  const [topArtists, setTopArtists] =
    useState<UserTopArtistsAndTracks.SpotifyResponse | null>(null);
  const [token, setToken] = useState<RefreshTokenResponse | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const spotifyAPI = new SpotifyAPI_IS();
      const response = await spotifyAPI.refreshToken_IS();
      setToken(response);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchTopArtists = async () => {
        const spotifyAPI = new SpotifyAPI_IS();
        const response = await spotifyAPI.getUserTopItems_IS(
          token.access_token,
          "tracks",
          "long_term",
          10
        );
        setTopArtists(response);
      };

      fetchTopArtists();
    }
  }, [token]);

  return (
    <div>
      <div>My top artists</div>
      {topArtists &&
        topArtists.items.map((artist, index) => (
          <div key={index}>{artist.name}</div>
        ))}
    </div>
  );
}



export function TestgetRefreshToken_cs2() {
  const [token, setToken] = useState<RefreshTokenResponse | null>(null);

  useEffect(() => {
    const spotifyAPI = new SpotifyAPI_CS();
    spotifyAPI.getRefreshToken().then((token) => {
      setToken(token);
      console.log(token);

    });
  }, []);

  return (
    <div>
      <div>
        {token ? token.access_token : "Loading..."}
        {token ? token.scope : "Loading..."}

      </div>
    </div>
  );
}


export function MyTopArtistCard_OLD() {
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

