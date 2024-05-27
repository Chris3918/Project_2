import React from 'react';

import { SpotifyUser } from "@/app/spotify/interfaces/userPublicProfileStructure";
import { useUserPublicProfile } from "@/app/spotify/hooks/spotifyHooks";


  
  
export const UserProfileComponent = ({ userId }: { userId: number }): JSX.Element => {  
    const { userInfo, loading, error } = useUserPublicProfile(userId);  
    
    if (loading) {  
      return <div>Loading...</div>;  
    }  
    if (error) {  
      return <div>Error: {error}</div>;  
    }  
    if (!userInfo) {  
      return <div>No user information available.</div>;  
    }  
    
    return (  
      <div>  
        <h1>{userInfo.display_name}</h1>  
        {/* Render additional user info here */}  
      </div>  
    );  
  };