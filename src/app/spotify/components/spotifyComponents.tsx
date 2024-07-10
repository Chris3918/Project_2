"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./spotify.css";
import { UserTopArtistCard } from "./userTopArtists/userTopArtistList_containerComponent";
import { UserProfileComponent } from "@/app/spotify/components/userPublicProfile/userPublicProfile";

export function CardGrid() {
  return (
    <div className="center-container">
      <div className="grid-layout">
        <div className="grid-layout__nested--horizontal">
          <div className="grid-layout__nested--vertical">
            <div className="card card--user-profile">
              <UserProfileComponent userId={1289186035} />
            </div>
            <div className="card"></div>
          </div>
          <div className="card"></div>
        </div>
        <div className="card card--top-artists">
          <UserTopArtistCard
            pageSize={10}
            time_ranges={["short_term", "medium_term", "long_term"]}
            defaultTimeRange={"medium_term"}
            cardTitle="Top Artists"
            cardType="Artists"
          />
        </div>
        <div className="card card--top-tracks">
          <UserTopArtistCard
            pageSize={10}
            time_ranges={["short_term", "medium_term", "long_term"]}
            defaultTimeRange={"medium_term"}
            cardTitle="Top Tracks"
            cardType="Tracks"
          />
        </div>
      </div>
    </div>
  );
}
