//This is a wrapper module, customizations can be made here to the original _IS file. This is the file that will be imported into the rest of the application.
import { RefreshTokenResponse } from '../../dataStructures/spotifyStructures/refreshTokenResponse';
import { UserTopArtistsAndTracks } from '../../dataStructures/spotifyStructures/getUserTopArtistsAndTracks';
import { SpotifyAPI_IS } from '../Connections_IS/spotifyApi_IS';
import NodeCache from 'node-cache';


//Todo: build out caching and expiration time
const tokenCache = new NodeCache({ stdTTL: 3500, checkperiod: 600 });//Starts the refresh process 3500 seconds after the token was created, and checks every 600 seconds(10 mins) to see if the token needs to be refreshed.
export class SpotifyAPI_CS {
    private spotifyApi_IS: SpotifyAPI_IS;
    private tokenExpiration: number | null = null;

    constructor() {
        this.spotifyApi_IS = new SpotifyAPI_IS();
    }

    /**
    * Gives back a private token.
    * Current scope set to read-currently-playing & user-top-read.
    */
    public getRefreshToken(): Promise<RefreshTokenResponse> {
        return this.spotifyApi_IS.refreshToken_IS();
    }



    public async getUserTopTracks( time_range: string, limit: number): Promise<UserTopArtistsAndTracks.SpotifyResponse> {
        const tokenResponse = await this.getRefreshToken();
        return this.spotifyApi_IS.getUserTopItems_IS( tokenResponse.access_token , 'tracks', time_range, limit);
    }

    public async getUserTopArtists( time_range: string, limit: number): Promise<UserTopArtistsAndTracks.SpotifyResponse> {
        const tokenResponse = await this.getRefreshToken();
        return this.spotifyApi_IS.getUserTopItems_IS( tokenResponse.access_token , 'artists', time_range, limit);
    }



}








    // //first tries to get the token from the cache. If the token is not in the cache, it makes an API call to get a new token, stores the new token in the cache, and then returns the new token.
    // public async getRefreshTokenCache(): Promise<RefreshTokenResponse> {
    //     const key = 'spotifyRefreshToken';
    //     const cachedToken = tokenCache.get<RefreshTokenResponse>(key);//The cachedToken constant is set to the result of calling tokenCache.get<RefreshTokenResponse>(key). This attempts to get the token from the cache. If the token is in the cache, cachedToken will be an object of type RefreshTokenResponse. If the token is not in the cache, cachedToken will be undefined.

    //     if (cachedToken) {
    //         // console.log('Returning cached token');
    //         return cachedToken;
    //     } else {
    //         // console.log('Fetching new token');
    //         const newToken = await this.spotifyApi_IS.refreshToken_IS();
    //         tokenCache.set(key, newToken);
    //         return newToken;
    //     }
    // }


    // private token: string | null = null;
    // //just expieration time
    // public async getRefreshToken3(): Promise<string> {
    //     const now = Date.now();
    //     if (this.token && this.tokenExpiration && now < this.tokenExpiration) {    //This is a conditional statement that checks if a token exists (this.token), if an expiration time for the token exists (this.tokenExpiration), and if the current time is less than the expiration time. If all these conditions are met, it means the token is still valid, so the method returns
    //         return this.token;
    //     }

    //     const response = await this.spotifyApi_IS.refreshToken_IS();
    //     this.token = response.access_token;
    //     this.tokenExpiration = now + response.expires_in * 1000;
    //     return this.token
    // }





    // public async getRefreshToken4(): Promise<RefreshTokenResponse> {// Cache and expiration time This method is similar to getRefreshToken, but it also checks if the token has expired. If the token has expired, it makes an API call to get a new token, stores the new token in the cache, and then returns the new token.
    //     const key = 'spotifyRefreshToken';
    //     const now = Date.now();
    //     const cachedToken = tokenCache.get<RefreshTokenResponse>(key);

    //     if (cachedToken && this.tokenExpiration && now < this.tokenExpiration) {
    //         return cachedToken;
    //     } else {
    //         const newToken = await this.spotifyApi_IS.refreshToken_IS();
    //         this.tokenExpiration = now + newToken.expires_in * 1000;
    //         tokenCache.set(key, newToken);
    //         return newToken;
    //     }
    // }






// public async getRefreshToken(): Promise<RefreshTokenResponse> {
//     const key = 'spotifyRefreshToken';
//     const now = Date.now();
//     const cachedToken = tokenCache.get<RefreshTokenResponse>(key);

//     if (cachedToken && this.tokenExpiration && now < this.tokenExpiration) {
//       return cachedToken;
//     } else {
//       const newToken = await this.spotifyApi_IS.refreshToken();
//       this.tokenExpiration = now + newToken.expires_in * 1000;
//       tokenCache.set(key, newToken);
//       return newToken;
//     }
//   }
