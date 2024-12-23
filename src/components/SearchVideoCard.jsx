import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const formatViews = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(0) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(0) + "K";
  } else {
    return count;
  }
};

export default function VideoCard({ video }) {
  // console.log("Video", video);
  if (!video) return null;

  const thumbnailURL = video?.thumbnails?.[0]?.url;
  const authorAvatar = video?.author?.avatar?.[0]?.url;
  const authorTitle = video?.author?.title;
  const videoTitle = video?.title;
  const views = video?.stats?.views;
  const videoTime = video?.publishedTimeText;
  const videoDesc = video?.descriptionSnippet;
  const videoId = video?.videoId;

  return (
    <div className="video-card flex sm:flex-row flex-col mt-5">
      <Link to={`/video/${videoId}`} state={{ video }}>
        <div className="mr-10 w-96 mb-5">
          {thumbnailURL ? (
            <img
              src={thumbnailURL}
              alt={videoTitle}
              className="rounded-lg  w-full"
            />
          ) : (
            <p> No thumbnail available</p>
          )}
        </div>
      </Link>

      <div className="video-details flex flex-col gap-x-2.5 flex-auto">
        {/* Title, channel name, views */}
        <div>
          <Link to={`/video/${videoId}`}>
            <p className="line-clamp-2 text-white font-medium mb-2 font-youtube-sans text-lg sm:text-sm md:text-lg">
              {videoTitle || "No title available"}
            </p>
          </Link>
          <div className="flex flex-row gap-1 text-sm font-youtube-sans">
            {" "}
            <p className="text-white/[0.60]">
              {views ? `${formatViews(views)} views · ` : "No Views"}
            </p>
            <p className="text-white/[0.60]">
              {videoTime || "No published time "}
            </p>{" "}
          </div>

          <div className="flex items-center mt-3">
            <div>
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorTitle}
                  className="rounded-full w-8 h-8 mr-2"
                />
              ) : (
                <p> No author avatar available</p>
              )}
            </div>
            <p className="text-white/[0.60] text-sm mb-1 font-youtube-sans">
              {authorTitle || "Unknown Channel"}
            </p>
          </div>
          <p className="text-white/[0.60] text-sm mt-3 ">{videoDesc}</p>
        </div>
      </div>
      <BsThreeDotsVertical className="text-white mr-4 mt-2 text-lg hidden md:block" />
    </div>
  );
}
