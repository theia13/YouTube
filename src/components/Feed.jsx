import Sidebar from "./Sidebar";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { BASE_URL, options } from "../config/apiConfig";
import { useState, useContext } from "react";
import { LoadingContext } from "../context/contextApi";
import { useParams } from "react-router-dom";

const fetchContent = async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/?q=${category}&hl=en&gl=US`,
      options
    );

    const result = await response.json();
    console.log("API Result:", result);
    return result;
  } catch (e) {
    console.log("error:", e);
  }
};

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const { category } = useParams();

  const { setLoading } = useContext(LoadingContext);
  const { data, error } = useQuery({
    queryKey: ["videos", selectedCategory],
    queryFn: async () => {
      setLoading(true);
      return fetchContent(selectedCategory).finally(() => {
        setLoading(false);
      });
    },
  });

  if (error) return <p className="text-white"> Error : {error.message} </p>;

  const videoList = data?.contents || [];

  return (
    <div className="flex flex-row h-full  mt-4">
      <div className="flex">
        <Sidebar setCategory={setSelectedCategory} />
      </div>

      <div className="flex-grow  p-5 sm:ml-60 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {videoList.length > 0 ? (
            videoList.map((videoItem, index) => (
              <VideoCard key={index} video={videoItem.video} />
            ))
          ) : (
            <p className="text-white"> No videos found </p>
          )}
        </div>
      </div>
    </div>
  );
}
