export namespace SpotifyUser {
  export interface UserInfo {
    display_name: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
  }

  export interface ExternalUrls {
    spotify: string;
  }

  export interface Followers {
    href: null | string;
    total: number;
  }

  export interface Image {
    url: string;
    height: number;
    width: number;
  }
}