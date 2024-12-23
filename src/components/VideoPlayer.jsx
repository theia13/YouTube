import { useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import SuggestedSection from "./SuggestedSection";
import { BASE_URL, options } from "../config/apiConfig";
import { LoadingContext } from "../context/contextApi";

export default function VideoPlayer() {
  const location = useLocation();
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(location.state?.video || null);

  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/video/details/?id=${videoId}&hl=en&gl=US`,
          options
        );
        const result = await response.json();

        if (response.ok) {
          setVideoData(result);
        } else {
          console.error("Failed to fetch video details:", result);
        }
      } catch (error) {
        console.error("Error fetching video detials", error);
      } finally {
        setLoading(false);
      }
    };

    if (!videoData) {
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, [videoData, videoId, setLoading]);

  if (!videoData) {
    return <p className="text-white">Video not found.</p>;
  }

  console.log(videoData);
  const authorAvatar = videoData?.author?.avatar?.[0]?.url;

  const authorTitle = videoData?.author?.title || "Unknown channel";

  return (
    <div className="flex justify-start h-screen ml-6 sm:ml-64 ">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col">
          {" "}
          <div className="w-[100vh] h-[50vh] mr-6">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
              width="100%"
              height="100%"
              playing={true}
              onError={() => alert("Video couldn't be loaded")}
            />
          </div>
          <div className="w-[100vh] h-40   mt-5">
            <p className="text-white font-bold text-xl">{videoData?.title}</p>
            <div className="flex items-center mt-4">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorTitle}
                  width={videoData?.author?.avatar[1]?.width}
                  height={videoData?.author?.avatar[1]?.height}
                  className="rounded-full"
                />
              ) : (
                <p> No author avatar available</p>
              )}
              <p className="text-white ml-4 text-base font-semibold">
                {authorTitle}
              </p>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <SuggestedSection />
        </div>
      </div>
    </div>
  );
}
