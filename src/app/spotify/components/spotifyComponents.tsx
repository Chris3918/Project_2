"use client";
import React, { useState, useMemo, useCallback } from "react";
import "./spotify.css";
import { useGetTopArtistsFullList } from "@/app/spotify/hooks/spotifyHooks";

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
  let time_range = "short_term";
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
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArtists = topArtistsFullList.slice(startIndex, endIndex);

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

  return (
    <div className="top-artist-container">
      <header className="top-artist-container-header">
        Top Artists
        <div className="radio-button-container"></div>
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

// export function MyTopArtistCard() {
//   let time_range = "short_term";
//   const topArtistsFullList = useGetTopArtistsFullList(time_range);
//   const pageSize = 10;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(topArtistsFullList.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentArtists = topArtistsFullList.slice(startIndex, endIndex);

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="top-artist-container">
//       <header className="top-artist-container-header">Top Artists</header>
//       <main className="top-artist-list-container">
//         <ol className="top-artist-list">
//           {currentArtists.map((artist, index) => (
//             <li className="top-artist-list-record" key={index}>
//               <h2 className="top-artist-list-record-text">
//                 {startIndex + index + 1}. {artist.name}
//               </h2>
//             </li>
//           ))}
//         </ol>
//       </main>
//       <footer className="top-artist-container-footer">
//         <div className="pagination">
//           <button className="pagination-button" onClick={goToPreviousPage}>
//             &lt;
//           </button>
//           <span className="pagination-page-number">{currentPage}</span>
//           <button className="pagination-button" onClick={goToNextPage}>
//             &gt;
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export function MyTopArtistCard() {
//   const [topArtists, setTopArtists] = useState<
//     UserTopArtistsAndTracks.SpotifyItem[]
//   >([]);

//   const spotifyApi = useMemo(() => new SpotifyAPI_CS(), []); //    const spotifyApi = new SpotifyAPI_CS();

//   useEffect(() => {
//     const fetchTopArtists = async () => {
//       const time_range = "short_term";
//       const limit = 10;
//       try {
//         const response = await spotifyApi.getUserTopArtists(time_range, limit);
//         setTopArtists(response.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTopArtists();
//   }, [spotifyApi]);

//   return (
//     <div className="top-artist-container">
//       <header className="top-artist-container-header">Top Artists</header>
//       <main className="top-artist-list-container">
//         <ol className="top-artist-list">
//           {topArtists.map((artist, index) => (
//             <li className="top-artist-list-record" key={index}>
//               <h2 className="top-artist-list-record-text">
//                 {index + 1}. {artist.name}
//               </h2>
//             </li>
//           ))}
//         </ol>
//       </main>
//       <footer className="top-artist-container-footer">
//         <div className="pagination">
//           <button className="pagination-button">&lt;</button>
//           <span className="pagination-page-number">1</span>
//           <button className="pagination-button">&gt;</button>
//         </div>
//       </footer>
//     </div>
//   );
// }
