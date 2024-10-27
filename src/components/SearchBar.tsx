import { MusicTrackList } from "@/types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { CgClose } from "react-icons/cg";

const SearchBar = ({ tracks }: { tracks?: MusicTrackList }) => {
    const [barHidden, setBarHidden] = useState(true);
    const [searchFor, setSearchFor] = useState("name");
    return (
        <span>
            {!barHidden && (
                <>
                    Search for:{" "}
                    <select
                        id="search-for"
                        className="bg-black"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setSearchFor(e.currentTarget.value);
                        }}
                    >
                        <option value="name" defaultChecked>
                            Name
                        </option>
                        <option value="author">Author</option>
                        <option value="year">Year of publishing</option>
                    </select>
                    <input
                        type={searchFor !== "date" ? "text" : "number"}
                        list="trackdatalist"
                        className="bg-black"
                    />
                    {tracks && searchFor !== "year" ? (
                        <datalist id="trackdatalist">
                            {tracks.map((track) => {
                                return (
                                    <option
                                        value={
                                            searchFor == "name"
                                                ? track.name
                                                : track.author
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
            )}
            {barHidden ? (
                <Image
                    src={"/search.svg"}
                    alt={"Search"}
                    width="30"
                    height="30"
                    className="inline m-3"
                    onClick={function () {
                        setBarHidden(!barHidden);
                    }}
                />
            ) : (
                <CgClose
                    onClick={function () {
                        setBarHidden(!barHidden);
                    }}
                    className="inline"
                    size={"2em"}
                />
            )}
        </span>
    );
};

export default SearchBar;
