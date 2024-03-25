import { SpotifyTokenResponse } from "../../dataStructures/spotifyStructures/spotifyToken";
import { SpotifyArtist } from "../../dataStructures/spotifyStructures/getArtistInfo";
import { UserTopArtistsAndTracks } from "../../dataStructures/spotifyStructures/getUserTopArtistsAndTracks";
import { SpotifyTokenWithAuthResponse } from "../../dataStructures/spotifyStructures/spotifyTokenWithAuth";
import { RefreshTokenResponse } from "../../dataStructures/spotifyStructures/refreshTokenResponse";

export class SpotifyAPI_IS {
  private clientId: string;
  private clientSecret: string;
  private refresh_Token: string;

  constructor() {
    this.clientId = "855f5ae6d57c41bfbea2e0f013ba0f2d";
    this.clientSecret = "fa30964e8e1c4a8da297d6e06043da92";
    this.refresh_Token = "AQCNbPZe3NvxzBJRcWYaGIQduaFox0Jxz8kF-ZMRCfmgPUnMxrVZ2D4wuOAn78XrTd96QMyBsW1dsJTb1Vb7n5_6PQjQm7aptNOVP3ZZdnpaKKWhHomabcFQWjd3RWl5X7M";
  }
  /**
   * original 2 constructors(cannot get process.env method to work)
  // constructor(clientId: string, clientSecret: string) {
  //   this.clientId = clientId;
  //   this.clientSecret = clientSecret;
  // }
  

  // constructor() {
  //   if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  //     throw new Error('Missing Spotify client ID or client secret in environment variables');
  //   }

  //   this.clientId = process.env.SPOTIFY_CLIENT_ID as string;
  //   this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
  // }
  */


  /**
   * Retrieves an access token from the Spotify API using client credentials.
   * Cannot be used to access or modify a user's personal data; only public data.
   * @returns A promise that resolves to a SpotifyTokenResponse object.
   */
  public async getPublicToken(): Promise<SpotifyTokenResponse> {
    const url = "https://accounts.spotify.com/api/token";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
    };
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<SpotifyTokenResponse>;
  }



  /**
   * Retrieves information about an artist from Spotify API.
   * @param token - The access token for authentication.
   * @param artistId - The ID of the artist.
   * @returns A Promise that resolves to the artist information.
   * @throws An error if the HTTP request fails.
   */
  public async getArtistInfo(
    token: string,
    artistId: string
  ): Promise<SpotifyArtist.ArtistInfo> {
    const url = `https://api.spotify.com/v1/artists/${artistId}`;
    const headers = { Authorization: "Bearer " + token };
    const response = await fetch(url, {
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<SpotifyArtist.ArtistInfo>;
  }


  /**
   * IMPORTANT: This method is only used ONCE to get a refresh token. The refresh token is used to get a new access token for different user requests(has access to different scopes).
   * Steps to get refreshToken.accessToken:
   * 1. Go to https://developer.spotify.com/dashboard/applications and create an app
   * 2. Authorize the app to access your Spotify account:
   *   a. Go to https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-currently-playing%20user-top-read
   *      - Replace YOUR_CLIENT_ID and YOUR_REDIRECT_URI with your client ID and redirect URI from your Spotify app. Add the scopes you want to request access to.
   *      - (https://accounts.spotify.com/authorize?client_id=855f5ae6d57c41bfbea2e0f013ba0f2d&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20user-top-read)
   *        - This will give you an option to allow the app to access your Spotify account(click "Agree")
   * 3. You will be navigated back to my site, get the authorization code from the URL
   * 4. Hardcode the authorization code in the `getrefreshTokenWithAuthCode()` method for 'code'. Also make sure the `redirect_uri` is the same as the one you used in the authorization request(same value in spotify client app).
   *    - This will return a refresh_token(save it)
   *    - NOTE: A refresh token is a security credential that allows client applications to obtain new access tokens without requiring users to reauthorize the application. The access token is only valid for 1 hour. The auth code used to get this can only be used once(getrefreshTokenWithAuthCode().
   *            The same auth code WILL ONLY WORK ONCE...if you do not save the refresh token, a new auth code will be needed to get a new refresh token) Once that code has been exchanged for an access token, it cannot be used again.
   * 5. Using the 'refresh token' from getrefreshTokenWithAuthCode(), call refreshToken() with the refresh token set as the body parameter for 'refresh_token'.
   *    - This can be run an infinite amount unless we need a new auth code and will return a new access_token that can be used for other requests.
   */

  /**
   * Retrieves a Spotify token with authorization(access to different scopes).
   * Can be used only once per 'code' to get a refresh token.
   * Save the refresh token so that it can be used an infinite amount of times to get a new access token for different user requests.
   * The refresh token will be used inside of refreshToken() to get a new access token.
   * @returns A promise that resolves to a SpotifyTokenWithAuthResponse object.
   */
  public async getrefreshTokenWithAuthCode(): Promise<SpotifyTokenWithAuthResponse> {
    const url = "https://accounts.spotify.com/api/token";
    const headers = {
      Authorization:
        "Basic " +
        Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: "AQCXtmFRllYuPYgUzHaSH250afNKWQjgWNrnjBgY9sPJrHx_5LDpM_35yUxBp5dnxQeY0oT5i6M_D5mL7agv95glZAcDnMiVv95GpxyFxv_lyGaRrBNu98hyxvSUUsDM_gkWhkOaz7R0XtTKBKJ0NzNIOe9qzVlfAdAeNjc5I5hfuPG1QT0sTfllkAnSMRClzScEGm4VJpdW2-5v_EHQqiVlszeL",
      redirect_uri: "http://localhost:3000",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<SpotifyTokenWithAuthResponse>;
  }


  public async refreshToken_IS(): Promise<RefreshTokenResponse> {
    const url = "https://accounts.spotify.com/api/token";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
    };
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: this.refresh_Token,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data as RefreshTokenResponse;
    // return response.json() as Promise<RefreshTokenResponse>;
  }






  /**
   * Retrieves the user's top items from Spotify API.
   *
   * @param token - The access token for authentication.
   * @param type - The type of top items to retrieve (e.g., 'artists', 'tracks').
   * @param time_range - The time range for the top items (e.g., 'short_term'(approximately last 4 weeks), 'medium_term'(approximately last 6 months), 'long_term'(calculated from several years of data and including all new data as it becomes available)).
   * @param limit - The maximum number of items to retrieve.
   * @returns A promise that resolves to the user's top items response.
   * @throws An error if the HTTP request fails.
   */
  public async getUserTopItems_IS(
    token: string,
    type: string,
    time_range: string,
    limit: number
  ): Promise<UserTopArtistsAndTracks.SpotifyResponse> {
    const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}`;
    const headers = { Authorization: "Bearer " + token };
    const response = await fetch(url, {
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as UserTopArtistsAndTracks.SpotifyResponse;
  }
}




