import Image from "next/image";
import api from "@/api";
import { MusicTrackList } from "@/types";
import TopNavBar from "@/components/TopNavBar";
import Link from "next/link";
import { Metadata } from "next";
import { useTracks } from "@/context";

export const generateMetadata = async ({
    params,
}: {
    params: MusicTrackList;
}): Promise<Metadata> => {
    return {
        title: "Home",
        description: "Arti's Music Player home page",
    };
};

export default function Home() {
    const data = useTracks();
    return (
        <main>
            <TopNavBar />
            <section className="flex justify-center">
                <div
                // style={{ maxWidth: "60%" }}
                >
                    <span className="font-bold mt-10">Neue Ideen</span>
                    <div className="columns-2" style={{ columnGap: "150px" }}>
                        {data.map((track, index) => {
                            if (index < 17) {
                                return (
                                    <div key={track.id}>
                                        <Link
                                            href={`/tracks/${track.id}`}
                                            className="text-lg"
                                        >
                                            <Image
                                                src={track.image}
                                                alt="Music Track image"
                                                loading="lazy"
                                                width={60}
                                                height={60}
                                                className="inline mx-2 my-2"
                                            />
                                            {track.name}
                                        </Link>
                                    </div>
                                );
                            } else {
                            }
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
