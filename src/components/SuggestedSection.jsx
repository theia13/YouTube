import { BASE_URL, options } from "../config/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SuggestedVideoCard from "./SuggestedVideoCard";

const fetchVideos = async (videoId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/video/related-contents/?id=${videoId}&hl=en&gl=US`,
      options
    );

    const result = await response.json();
    // console.log("suggested videos", result);
    return result;
  } catch (e) {
    console.log("error:", e);
  }
};

export default function SuggestedSection() {
  const { videoId } = useParams();
  // console.log("Video ID passed to API:", videoId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestedVideos", videoId],
    queryFn: () => fetchVideos(videoId),
  });

  if (isLoading) return <p> Loading Videos ...</p>;
  if (error) return <p> Error : {error.message} </p>;

  const suggestedVideos = data?.contents || [];

  return (
    <div>
      <h1 className="text-white font-bold text-2xl mb-2">Suggested Videos</h1>
      <div>
        {suggestedVideos.length > 0 ? (
          suggestedVideos.map((item) => (
            <SuggestedVideoCard key={item.video.videoId} video={item.video} />
          ))
        ) : (
          <p> No results found. </p>
        )}
      </div>
    </div>
  );
}
