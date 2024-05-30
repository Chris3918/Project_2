import React from "react";
import Image from "next/image";
import "@/app/spotify/components/spotify.css";
import { useUserPublicProfile } from "@/app/spotify/hooks/spotifyHooks";

export const UserProfileComponent = ({ userId }: { userId: number }): JSX.Element => {
  const { userInfo, loading, error } = useUserPublicProfile(userId);

  return (
    // prettier-ignore
    loading ? <div>Loading...</div> :  
    error ? <div>Error: {error}</div> :  
    !userInfo ? <div>No user information available.</div> :  
    <div className="userPublicData-container">
      <div className="userPublicData-container-userPictureRow">
        <Image
          src={userInfo.images[1].url}
          width={userInfo.images[0].width}
          height={userInfo.images[0].height}
          alt={userInfo.display_name}
        />{" "}
      </div>
      {/* Image is a component from Next.js...had to create next.config.js file and add image domain */}
      <h1 className="userPublicData-container-userNameRow">{userInfo.display_name}</h1>
      <h2>{userInfo.followers.total} followers |</h2>
      <a href={userInfo.external_urls.spotify} target="_blank" rel="noopener noreferrer">
        Open in Spotify
      </a>
    </div>
  );
};

// return loading ? (
//   <div>Loading...</div>
// ) : error ? (
//   <div>Error: {error}</div>
// ) : !userInfo ? (
//   <div>No user information available.</div>
// ) : (
//   <div className="userPublicData-container">
//     <Image
//       src={userInfo.images[1].url}
//       width={userInfo.images[0].width}
//       height={userInfo.images[0].height}
//       alt={userInfo.display_name}
//     />{" "}
//     {/* Image is a component from Next.js...had to create next.config.js file and add image domain */}
//     <h1>{userInfo.display_name}</h1>
//     <h2>{userInfo.followers.total} followers</h2>
//     <a href={userInfo.external_urls.spotify} target="_blank" rel="noopener noreferrer">
//       Open in Spotify
//     </a>
//   </div>
// );
// };
