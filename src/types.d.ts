export interface MusicTrack {
    name: string;
    created_at: Date;
    music_file: string;
    image: string;
    description: string;
    id: number;
    channel: string;
}
export type MusicTrackList = MusicTrack[];
