export interface MusicTrack {
    name: string;
    created_at: Date;
    music_file: string;
    image: string;
    author: number;
    description: string;
    id: number;
}
export type MusicTrackList = MusicTrack[];
