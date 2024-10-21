import Image from "next/image";

const TopNavBar = ({}) => {
    return (
        <nav>
            <span className="brand">
                <span className="text-indigo-700">Arti's</span> Music
            </span>
            <span>
                <Image
                    src={"/search.svg"}
                    alt={"Search"}
                    width="50"
                    height="50"
                />
                <Image src={"/user-icon.svg"} alt="" />
            </span>
        </nav>
    );
};

export default TopNavBar;
