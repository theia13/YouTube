import { Link } from "react-router-dom";

const defaultThumbnail = "../public/images/default-thumbnail.png";
const defaultAvatar = "../public/images/default-avatar.png";

const formatViews = (count) => {
  if (typeof count !== "number") return "No Views";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(count);
};

export default function VideoCard({ video }) {
  if (!video) return null;

  const thumbnailURL = video?.thumbnails?.[0]?.url;
  const authorAvatar = video?.author?.avatar?.[0]?.url;
  const authorTitle = video?.author?.title;
  const videoTitle = video?.title;
  const views = video?.stats?.views;
  const videoTime = video?.publishedTimeText;
  const videoId = video?.videoId;

  return (
    <Link
      to={`/video/${videoId}`}
      state={{ video }}
      className="video-card flex flex-col mb-4 "
      aria-label={`Watch ${videoTitle} by ${authorTitle}`}
    >
      <div className="relative h-48 md:h-40 rounded-xl overflow-hidden">
        {thumbnailURL ? (
          <img
            src={thumbnailURL || defaultThumbnail}
            alt={`Thumbnail for ${videoTitle}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <p> No thumbnail available</p>
        )}
      </div>

      {/* Video details */}
      <div className="video-details grid grid-cols-[50px_1fr] gap-x-2.5 flex-auto mt-3">
        {/* Author avatar */}
        <div>
          {authorAvatar ? (
            <img
              src={authorAvatar || defaultAvatar}
              alt={`AVatar of ${authorTitle}`}
              width={video?.author?.avatar[0]?.width}
              height={video?.author?.avatar[0]?.height}
              className="rounded-full "
              loading="lazy"
            />
          ) : (
            <p> No author avatar available</p>
          )}
        </div>

        {/* Title, channel name, views */}
        <div>
          <p className="line-clamp-2 text-white font-medium mb-2 font-youtube-sans text-[15px]">
            {videoTitle || "No title available"}
          </p>
          <p className="text-white/[0.60] text-sm mb-1 font-youtube-sans">
            {authorTitle || "Unknown Channel"}
          </p>
          <div className="flex flex-row gap-1 text-sm font-youtube-sans">
            {" "}
            <p className="text-white/[0.60]">
              {views ? `${formatViews(views)} views • ` : "No Views"}
            </p>
            <p className="text-white/[0.60]">
              {videoTime || "No published time "}
            </p>{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}
