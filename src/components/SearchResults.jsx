import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SearchVideoCard from "./SearchVideoCard";
import { BASE_URL, options } from "../config/apiConfig";
import { LoadingContext } from "../context/contextApi";

export default function SearchResults() {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async (query) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/search/?q=${query}&hl=en&gl=US`,
          options
        );

        const result = await response.json();
        const videoItems = result?.contents?.map((item) => item.video) || [];
        setVideos(videoItems);
      } catch (e) {
        console.log("Error fetching the search results", e);
      } finally {
        setLoading(false);
      }
    };

    if (location.state && location.state.contents) {
      setLoading(true);
      const videoItems = location.state.contents.map((item) => item.video);

      setVideos(videoItems);
      setLoading(false);
    } else {
      fetchSearchResults(query);
    }
  }, [location.state, query, setLoading]);

  return (
    <div className="mt-10 ml-6 sm:ml-64 ">
      <h1 className="text-white ">
        {" "}
        Search Results for <strong>&quot;{query}&quot; </strong>
      </h1>

      <div className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <SearchVideoCard key={video?.videoId} video={video} />
          ))
        ) : (
          <p> No results found. </p>
        )}
      </div>
    </div>
  );
}
