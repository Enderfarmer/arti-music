import { createContext, useContext } from "react";
import { MusicTrackList } from "./types";

export const TracksContext = createContext<MusicTrackList | null>(null);
export const useTracks = () => {
    const tracks = useContext(TracksContext);
    if (tracks === null) throw new Error("useTracks is being used incorrectly");
    return tracks;
};
