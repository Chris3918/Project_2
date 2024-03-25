"use client";
import { SpotifyTokenResponse } from "../../dataStructures/spotifyStructures/spotifyToken";
import { SpotifyTokenWithAuthResponse } from "../../dataStructures/spotifyStructures/spotifyTokenWithAuth";
import { RefreshTokenResponse } from "../../dataStructures/spotifyStructures/refreshTokenResponse";
import { SpotifyAPI_IS } from "../../Connections/Connections_IS/spotifyApi_IS";
import React, { useState, useEffect } from "react";
import { SpotifyArtist } from "@/app/dataStructures/spotifyStructures/getArtistInfo";
import { UserTopArtistsAndTracks } from "@/app/dataStructures/spotifyStructures/getUserTopArtistsAndTracks";
import { SpotifyAPI_CS } from "@/app/Connections/Connections_CS/spotifyApi_CS";


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




