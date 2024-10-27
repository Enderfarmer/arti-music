import Image from "next/image";

const TopNavBar = () => {
    return (
        <nav
            className="flex bg-gray-900 absolute top-0 w-full"
            style={{ justifyContent: "space-between" }}
        >
            <span className="brand font-bold m-4 p-1 text-xl">
                <span className="text-indigo-700 font-extrabold mr-1">
                    Arti's
                </span>{" "}
                Music
            </span>
            <span>
                <Image
                    src={"/search.svg"}
                    alt={"Search"}
                    width="30"
                    height="30"
                    className="inline m-3"
                />
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
