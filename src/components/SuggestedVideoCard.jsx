import { Link } from "react-router-dom";

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
  if (!video) return null;

  const thumbnailURL = video?.thumbnails?.[0]?.url;
  const authorTitle = video?.author?.title;
  const videoTitle = video?.title;
  const views = video?.stats?.views;
  const videoTime = video?.publishedTimeText;
  const videoId = video?.videoId;

  return (
    <div className="flex h-74 mb-4">
      <Link to={`/video/${videoId}`} state={{ video }} className="flex w-full">
        {/* Thumbnail column */}
        <div className="flex-shrink-0 w-48">
          {thumbnailURL ? (
            <img
              src={thumbnailURL}
              alt={videoTitle}
              className="rounded-lg h-full w-full"
            />
          ) : (
            <p>No thumbnail available</p>
          )}
        </div>

        {/* Video details column */}
        <div className="flex flex-col justify-center ml-4">
          <p className="line-clamp-2 text-white font-medium mb-2 font-youtube-sans text-[15px]">
            {videoTitle || "No title available"}
          </p>
          <p className="text-white/[0.60] text-sm mb-1 font-youtube-sans">
            {authorTitle || "Unknown Channel"}
          </p>
          <div className="flex flex-row gap-1 text-sm font-youtube-sans">
            <p className="text-white/[0.60]">
              {views ? `${formatViews(views)} views · ` : "No Views"}
            </p>
            <p className="text-white/[0.60]">
              {videoTime || "No published time"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
