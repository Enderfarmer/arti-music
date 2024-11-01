import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const TopNavBar = () => {
    return (
        <nav
            className="flex bg-gray-900 absolute top-0 w-full border-b-violet-300 border-b-2"
            style={{ justifyContent: "space-between", maxHeight: "10vh" }}
        >
            <Link className="brand font-bold m-4 p-1 text-xl inline" href="/">
                <span className="text-indigo-700 font-extrabold mr-1">
                    Arti's
                </span>{" "}
                Music
            </Link>
            <span>
                <SearchBar />
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
