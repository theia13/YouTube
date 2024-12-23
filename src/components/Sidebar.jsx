import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions, MdPhotoLibrary, MdWatchLater } from "react-icons/md";
import { FaHistory, FaAngleDown } from "react-icons/fa";
import { RiVideoFill, RiScissorsFill } from "react-icons/ri";
import { FaFire } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
import { BiSolidMovie } from "react-icons/bi";
import { SiYoutubegaming } from "react-icons/si";
import { RiNewsFill } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdFlag } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { RiFeedbackFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

const mainItems = [
  {
    icon: <GoHomeFill className="w-5 h-5" />,
    label: "Home",
    category: "New",
    route: "/",
  },
  {
    icon: <SiYoutubeshorts className="w-5 h-5" />,
    label: "Shorts",
    category: "Shorts",
    route: "/shorts",
  },
  {
    icon: <MdSubscriptions className="w-5 h-5" />,
    label: "Subscriptions",
  },
];

const youSection = [
  {
    icon: <MdPhotoLibrary className="w-5 h-5" />,
    label: "Library",
  },
  {
    icon: <FaHistory className="w-5 h-5" />,
    label: "History",
  },
  {
    icon: <RiVideoFill className="w-5 h-5" />,
    label: "Your Videos",
  },
  {
    icon: <MdWatchLater className="w-5 h-5" />,
    label: "Watch Later",
  },
  {
    icon: <RiScissorsFill className="w-5 h-5" />,
    label: "Your Clips",
  },
  {
    icon: <FaAngleDown className="w-5 h-5" />,
    label: "Show More",
  },
];

const exploreSection = [
  {
    icon: <FaFire className="w-5 h-5"></FaFire>,
    label: "Trending",
    route: "/trending",
  },

  {
    icon: <IoMdMusicalNote className="w-5 h-5"></IoMdMusicalNote>,
    label: "Music",
    route: "/music",
  },
  {
    icon: <BiSolidMovie className="w-5 h-5"></BiSolidMovie>,
    label: "Movies",
    route: "/movies",
  },
  {
    icon: <SiYoutubegaming className="w-5 h-5"></SiYoutubegaming>,
    label: "Gaming",
    route: "/gaming",
  },
  {
    icon: <RiNewsFill className="w-5 h-5"></RiNewsFill>,
    label: "News",
    route: "/news",
  },
  {
    icon: <FaTrophy className="w-5 h-5"></FaTrophy>,
    label: "Sports",
    route: "/sports",
  },
];

const extraSection = [
  {
    icon: <IoMdSettings className="w-5 h-5"></IoMdSettings>,
    label: "Settings",
  },
  {
    icon: <MdFlag className="w-5 h-5"></MdFlag>,
    label: "Report history",
  },
  {
    icon: <IoIosHelpCircle className="w-5 h-5"></IoIosHelpCircle>,
    label: "Help",
  },
  {
    icon: <RiFeedbackFill className="w-5 h-5"></RiFeedbackFill>,
    label: "Send feedback",
  },
];

export default function Sidebar({ setCategory }) {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 bottom-0 top-16 w-60 border-r-2 border-white border-opacity-25 overflow-y-auto bg-black hidden sm:block ">
      <div className="m-2  border-b-2 border-white border-opacity-25">
        {" "}
        {mainItems.map((item) => (
          <Link
            to={item.route}
            key={item.label}
            className="flex items-center p-2.5 text-white h-10 rounded-lg hover:bg-white/[0.15] cursor-pointer"
            onClick={() => {
              if (item.category == "New" || item.category == "Shorts") {
                setCategory(item.category);
              }
            }}
          >
            {item.icon}
            <p className="pl-4">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="m-2 border-b-2 border-white border-opacity-25">
        <div className="flex items-center h-10 rounded-lg hover:bg-white/[0.15]">
          <h2 className="text-white m-2 text-lg font-medium">You </h2>
          <MdOutlineKeyboardArrowRight className="text-white mt-1" />
        </div>
        {youSection.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-2.5 text-white h-10 rounded-lg hover:bg-white/[0.15] cursor-pointer"
          >
            {item.icon}
            <p className="pl-4">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="m-2 border-b-2 border-white border-opacity-25">
        <div className="flex items-center h-10 rounded-lg hover:bg-white/[0.15]">
          <h2 className="text-white m-2 text-lg font-medium">Explore </h2>
          <MdOutlineKeyboardArrowRight className="text-white  mt-1" />
        </div>
        {exploreSection.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-2.5 text-white h-10 rounded-lg hover:bg-white/[0.15] cursor-pointer"
            onClick={() => {
              setCategory(item.label);
              const path = item.label.toLowerCase();
              navigate(`/${path}`);
            }}
          >
            {item.icon}
            <p className="pl-4">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="m-2 ">
        {extraSection.map((item) => (
          <div
            key={item.label}
            className="flex items-center p-2.5 text-white h-10 rounded-lg hover:bg-white/[0.15] cursor-pointer"
          >
            {item.icon}
            <p className="pl-4">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
