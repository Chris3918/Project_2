"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./spotify.css";
import { UserTopArtistCard } from "./userTopArtists/userTopArtistList_containerComponent";




export function CardGrid() {
  return (
    <div className="force-tocenter">
      <div className="mygrid-layout">
        <div className="nested-grid">
          <div className="mycard"></div>
          <div className="mycard"></div>
        </div>
        <div className="mycard">
          <UserTopArtistCard
            pageSize={10}
            time_ranges={["short_term", "medium_term", "long_term"]}
            defaultTimeRange={"medium_term"}
            cardTitle="Top Artists"
            cardType="Artists"
          />
        </div>
        <div className="mycard">
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
