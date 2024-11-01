import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TracksContext } from "@/context";
import { MusicTrackList } from "@/types";
import { useEffect, useState } from "react";
import api from "@/api";

export default function App({ Component, pageProps }: AppProps) {
    const [data, setData] = useState<null | MusicTrackList>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (data === null)
            api.get("music-tracks")
                .then((res) => {
                    setData(JSON.parse(res.data));
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
    }, []);
    if (loading || data == null) return <main>Loading...</main>;
    return (
        <TracksContext.Provider value={data}>
            <Component {...pageProps} />
        </TracksContext.Provider>
    );
}
