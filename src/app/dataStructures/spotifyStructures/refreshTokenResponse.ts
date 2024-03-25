export interface RefreshTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}




/**
 * Example Spotify refresh token response:
 * {
 *    "access_token": "BQBZ5tqobKMiaJWLSgA4AM6y7bOL9T9zIPcNdf9BOpqP1LvtoB6YxN0UD3TjeIS-PVrs-Wmb52eB2TQb_xjt5LNTvxv3x04GF5RZX_prGYXETsoLKJrNjBqB0CmevBrXcjh-mxd8wQZTT2fwFyajgqpwtG8cAMjglf6JZCie6D1KwB7pQAXmG1PMrdP5",
 *    "token_type": "Bearer",
 *    "expires_in": 3600,
 *    "scope": "user-read-currently-playing user-top-read"
 * }
 */