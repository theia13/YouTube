import "./App.css";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResults from "./components/SearchResults";
import Sidebar from "./components/Sidebar";
import VideoPlayer from "./components/VideoPlayer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { LoadingProvider } from "./context/contextApi.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,

      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function App() {
  return (
    <>
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <Sidebar />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/video/:videoId" element={<VideoPlayer />} />

              {/* Explore section routes */}
              <Route path="/:category" element={<Feed />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
