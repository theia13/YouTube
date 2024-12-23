import { Link } from "react-router-dom";
import { TbVideoPlus } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import SearchBar from "./SearchBar";
import LoadingBar from "./LoadingBar";
import { useContext } from "react";
import { LoadingContext } from "../context/contextApi";

export default function Header() {
  const { loading } = useContext(LoadingContext);

  return (
    <>
      {" "}
      {loading && <LoadingBar />}
      <div className="fixed top-0 left-0 flex flex-row justify-between items-center  w-full h-16  bg-black z-50">
        <div className="flex items-center justify-around w-44 ml-5">
          <RxHamburgerMenu className="text-white text-xl" />

          <Link
            to="/"
            className="cursor-pointer z-999"
            onClick={() => console.log("Clcicked!")}
          >
            {" "}
            <img
              className="h-6 sm:hidden"
              src="/images/yt-logo-mobile.png"
              alt="youtube logo"
            ></img>
            <img
              className="h-5 hidden sm:block"
              src="/images/yt-logo.png"
              alt="youtube logo"
            ></img>{" "}
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className="flex items-center justify-evenly  h-8 w-40">
          <TbVideoPlus className="w-6 h-6 grey-34 text-white hidden md:block" />
          <MdNotificationsNone className="w-6 h-6 text-white hidden md:block" />

          <FaUser className=" w-7 h-7 bg-white rounded-full p-1 " />
        </div>
      </div>
    </>
  );
}
