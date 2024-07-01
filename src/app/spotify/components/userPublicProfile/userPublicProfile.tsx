import React from "react";
import Image from "next/image";
import "@/app/spotify/components/spotify.css";
import { useUserPublicProfile } from "@/app/spotify/hooks/spotifyHooks";

export const UserProfileComponent = ({ userId }: { userId: number }): JSX.Element => {
  const { userInfo, loading, error } = useUserPublicProfile(userId);

  // Ensure that you have a fallback for when userInfo.images[1] is not available
  const imageUrl = userInfo?.images?.[1]?.url || "/default-profile.png"; // Fallback to a default image if necessary

  return (
    // prettier-ignore
    loading ? <div>Loading...</div> :  
    error ? <div>Error: {error}</div> :  
    !userInfo ? <div>No user information available.</div> :  
    <div className="userPublicData-container">
      <div className="userPublicData-container-userPictureRow">
        <div className="userPictureRow-imageWrapper">
          <Image
            src={imageUrl}
            layout="fill"//"responsive"
            objectFit="cover" // This will maintain the aspect ratio and cover the area  
            alt={userInfo.display_name}
            // className="userPictureRow-imageWrapper-profileImage"
          />
        </div>
      </div>
      {/* Image is a component from Next.js...had to create next.config.js file and add image domain */}
      <h1 className="userPublicData-container-userNameRow">{userInfo.display_name}</h1>
      <div className="userPublicData-container-userDetailsRow">
        <h2>{userInfo.followers.total} followers</h2>
        <span> | </span>
        <a href={userInfo.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          spotify
        </a>
      </div>
    </div>
  );
};

