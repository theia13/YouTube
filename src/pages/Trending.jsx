import { useQuery } from "@tanstack/react-query";
import { BASE_URL, options } from "../config/apiConfig";
import VideoCard from "../components/VideoCard";

const fetchTrendingVideos = async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/?q=${category}&hl=en&gl=US`,
      options
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

export default function Trending({ category = "Trending" }) {
  const { data, error } = useQuery({
    queryKey: ["fetchTrendingVideos", category],
    queryFn: () => fetchTrendingVideos(category),
  });

  if (error) return <p className="text-white"> Error : {error.message} </p>;

  const videoList = data?.contents || [];
  return (
    <div className="grow overflow-y-auto ml-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {videoList.length > 0 ? (
          videoList.map((videoItem, index) => (
            <VideoCard key={index} video={videoItem.video} />
          ))
        ) : (
          <p className="text-white"> No videos found </p>
        )}
      </div>
    </div>
  );
}
