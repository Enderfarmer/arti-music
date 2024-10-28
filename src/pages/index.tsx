import Image from "next/image";
import localFont from "next/font/local";
import api from "@/api";
import { MusicTrackList } from "@/types";
import { extname } from "path";
import TopNavBar from "@/components/TopNavBar";
import Link from "next/link";
import { Metadata } from "next";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const getServerSideProps = async () => {
    const res = await api.get("music-tracks/");
    if (res.status !== 200) {
        return {
            props: { data: [] },
        };
    }
    const data = JSON.parse(res.data);
    return {
        props: { data: data },
    };
};

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

export default function Home({ data }: { data: MusicTrackList }) {
    console.log(extname(data[0].music_file));

    return (
        <main>
            <TopNavBar tracks={data} />
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
