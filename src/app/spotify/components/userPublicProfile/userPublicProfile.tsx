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
    <div className="user-public-data-card">
      <div className="user-public-data-card__picture-row">
        <div className="user-public-data-card__image-wrapper">
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
      <h1 className="user-public-data-card__name-row">{userInfo.display_name}</h1>
      <div className="user-public-data-card__details-row">
        <h2>{userInfo.followers.total} followers</h2>
        <span> | </span>
        <a href={userInfo.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          spotify
        </a>
      </div>
    </div>
  );
};

