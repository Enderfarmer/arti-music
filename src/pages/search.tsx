import api from "@/api";
import SearchBar from "@/components/SearchBar";
import { MusicTrackList } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = ({}) => {
    const params = useSearchParams();
    const [data, setData] = useState<MusicTrackList | null>(null);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<React.ReactNode | null>(null);
    useEffect(() => {
        const type = params.get("type");
        const query = params.get("q");

        if (type && query) {
            const url = `search-${type}/`;
            console.log("Searching with params:", type, query);
            api.get(url, { params: { q: query } }) // `params` statt `data` verwenden
                .then((res) => {
                    setData(JSON.parse(res.data));
                })
                .catch((err) => {
                    console.error(err instanceof Error ? err.message : err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [params.toString()]); // `params.toString()` als Abhängigkeit verwenden
    useEffect(() => {
        if (data)
            setContent(
                <main>
                    <SearchBar
                        shownMode
                        values={[
                            params.get("type") as "channel" | "name" | "year",
                            params.get("q") as string,
                        ]}
                    />
                    {data && data.length ? data[0].name : "no results"}
                </main>
            );
    }, [data]);
    if (loading) return <>Loading...</>;
    if (data != null) return content ? content : <>Loading...</>;
};

export default Search;
