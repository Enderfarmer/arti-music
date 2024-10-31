import api from "@/api";
import { MusicTrackList } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = ({}) => {
    const params = useSearchParams();
    const [data, setData] = useState<MusicTrackList | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const type = params.get("type");
        const query = params.get("q");

        if (type && query) {
            const url = `search-${type}`;
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

    if (loading) return <>Loading...</>;
    if (data != null)
        return <main>{data.length ? data[0].name : "no results"}</main>;
};

export default Search;
