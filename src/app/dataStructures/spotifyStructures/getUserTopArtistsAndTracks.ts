
export namespace UserTopArtistsAndTracks {
    export interface SpotifyResponse {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: SpotifyItem[];
    }

    export interface SpotifyItem {
        external_urls: {
            spotify: string;
        };
        followers: {
            href: string;
            total: number;
        };
        genres: string[];
        href: string;
        id: string;
        images: Image[];
        name: string;
        popularity: number;
        type: string;
        uri: string;
    }

    export interface Image {
        url: string;
        height: number;
        width: number;
    }
}
