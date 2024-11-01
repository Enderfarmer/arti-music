import { useTracks } from "@/context";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";

const SearchBar = ({
    shownMode,
    values,
}: {
    shownMode?: boolean;
    values?: ["name" | "year" | "channel", string];
}) => {
    const [barHidden, setBarHidden] = useState(true);
    const [searchFor, setSearchFor] = useState("name");
    const tracks = useTracks();
    useEffect(() => {
        if (values) {
            setSearchFor(values[0]);
        }
    }, [values]);

    return (
        <span>
            {!barHidden || shownMode ? (
                <>
                    Search for:{" "}
                    <form action="/search" method="get" className="inline">
                        <select
                            id="search-for"
                            className="bg-black outline outline-1 outline-white p-1 rounded-sm"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setSearchFor(e.currentTarget.value);
                            }}
                            name="type"
                            value={searchFor} // Direktes Binden des Wertes
                        >
                            {shownMode && values ? (
                                <>
                                    <option value="name">Name</option>
                                    <option value="channel">
                                        Author channel
                                    </option>
                                    <option value="year">
                                        Year of publishing
                                    </option>
                                </>
                            ) : (
                                <>
                                    <option value="name">Name</option>
                                    <option value="channel">
                                        Author channel
                                    </option>
                                    <option value="year">
                                        Year of publishing
                                    </option>
                                </>
                            )}
                        </select>
                        <input
                            type={searchFor !== "year" ? "text" : "number"}
                            list="trackdatalist"
                            className="bg-black outline-1 outline-gray-100 outline w-80 m-1 rounded-lg p-1"
                            placeholder="Search..."
                            name="q"
                            defaultValue={values && values[1]}
                        />
                    </form>
                    {tracks && searchFor !== "year" ? (
                        <datalist id="trackdatalist">
                            {tracks.map((track, index) => {
                                if (index < 7)
                                    return (
                                        <option
                                            value={
                                                searchFor === "name"
                                                    ? track.name
                                                    : track.channel
                                            }
                                            key={track.id}
                                        ></option>
                                    );
                            })}
                        </datalist>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
            {!shownMode &&
                (barHidden ? (
                    <Image
                        src={"/search.svg"}
                        alt={"Search"}
                        width="30"
                        height="30"
                        className="inline m-3"
                        onClick={() => setBarHidden(!barHidden)}
                    />
                ) : (
                    <CgClose
                        onClick={() => setBarHidden(!barHidden)}
                        className="inline"
                        size={"2em"}
                    />
                ))}
        </span>
    );
};

export default SearchBar;
