"use client";
import api from "@/api";
import MediaElement from "@/components/MediaElement";
import TopNavBar from "@/components/TopNavBar";
import { useTracks } from "@/context";
import { MusicTrack, MusicTrackList } from "@/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
const Id: NextPage = () => {
    const [data, setData] = useState<MusicTrack | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            api.get(`music-tracks/${router.query.id}`)
                .then((res) => {
                    const trackData = JSON.parse(res.data);
                    setData(trackData);
                    // Erst wenn Daten erfolgreich geladen wurden
                })
                .catch((err) => {
                    console.error(err);
                    setError("Error fetching data");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [router.query.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <main className="flex items-center justify-center pt-5">
            <TopNavBar />
            <button className="absolute right-10 top-20">
                <CgClose className="text-red-600" />
            </button>
            {data ? (
                <MediaElement track={data} />
            ) : (
                <div>No data available</div>
            )}
        </main>
    );
};

export default Id;
