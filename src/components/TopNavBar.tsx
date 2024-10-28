import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { MusicTrackList } from "@/types";

const TopNavBar = ({ tracks }: { tracks?: MusicTrackList }) => {
    return (
        <nav
            className="flex bg-gray-900 absolute top-0 w-full"
            style={{ justifyContent: "space-between" }}
        >
            <Link className="brand font-bold m-4 p-1 text-xl inline" href="/">
                <span className="text-indigo-700 font-extrabold mr-1">
                    Arti's
                </span>{" "}
                Music
            </Link>
            <span>
                <SearchBar tracks={tracks} />
                <Image
                    src={"/user-icon.svg"}
                    alt=""
                    width={30}
                    height={30}
                    className="inline m-4 ml-2"
                />
            </span>
        </nav>
    );
};

export default TopNavBar;
