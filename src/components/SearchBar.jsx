import { FaMicrophone } from "react-icons/fa";
import { BASE_URL, options } from "../config/apiConfig";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function SearchBar({ className }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    if (!searchQuery) return;
    console.log("Fetching from API for search query:", searchQuery);

    try {
      const response = await fetch(
        `${BASE_URL}/search/?q=${searchQuery}&hl=en&gl=US`,
        options
      );
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("error", e);
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["searchResults", searchQuery],
    queryFn: fetchSearchResults,
    enabled: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const handleSearch = async () => {
    if (!searchQuery) return;

    if (data) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
        state: data,
      });
    } else {
      const { data: fetchedData } = await refetch();
      if (fetchedData) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
          state: fetchedData,
        });
      } else {
        console.error("no data avaiable after fetching");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex justify-evenly items-center w-70 md:w-80 relative">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="rounded-3xl pr-5 pl-10 border-2 text-white border-white border-opacity-25 h-10 outline-none bg-black w-full sm:w-[250px] md:w-[400px]"
        type="search"
        placeholder="Search"
        onKeyDown={handleKeyDown}
      ></input>
      <FaMicrophone className=" w-7 h-7 rounded-full p-1.5 absolute left-3   text-white " />
    </div>
  );
}
