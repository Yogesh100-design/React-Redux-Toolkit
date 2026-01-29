import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResult, setLoading, setError } from "../redux/features/SearchSlice";
import { fetchPhotos, fetchVideos, fetchGifs } from "../api/Api";
import { motion } from "framer-motion";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector((state) => state.search);
  
  console.log("ResultGrid State:", { query, activeTab, results, loading, error });
  
  useEffect(() => {
    let isActive = true;
    
    const getData = async () => {
      if (!query || !query.trim()) {
        dispatch(setResult([]));
        dispatch(setLoading(false))
        return;
      }

      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        let normalizedData = [];

        if (activeTab === "Photos") {
          const response = await fetchPhotos(query);
          console.log("Photos API Response:", response);
          const photos = Array.isArray(response?.results) ? response.results : [];
          console.log("Extracted photos array:", photos);
          
          normalizedData = photos.map((item) => ({
            id: item.id,
            type: 'photo',
            title: item.alt_description || item.description || 'Untitled',
            thumbnail: item.urls?.small,
            src: item.urls?.regular || item.urls?.full || item.urls?.small,
            author: item.user?.name || 'Unknown',
            color: item.color || '#f3f4f6'
          }));
          console.log("Normalized photos data:", normalizedData);
        } 
        else if (activeTab === "Videos") {
          const response = await fetchVideos(query);
          const videos = Array.isArray(response?.videos) ? response.videos : [];
          
          normalizedData = videos.map((item) => {
            const videoFiles = item.video_files || [];
            const sortedFiles = videoFiles.length > 0 
              ? [...videoFiles].sort((a, b) => (b.height || 0) - (a.height || 0))
              : [];
            
            const bestFile = sortedFiles[0] || videoFiles[0];
            
            return {
              id: item.id,
              type: 'video',
              title: item.user?.name || 'Video',
              thumbnail: item.image,
              src: bestFile?.link || '',
              duration: item.duration
            };
          }).filter(item => item.src);
        } 
        else if (activeTab === "GIF") {
          const response = await fetchGifs(query);
          const gifs = Array.isArray(response?.data) ? response.data : [];
          
          normalizedData = gifs.map((item) => ({
            id: item.id,
            type: 'gif',
            title: item.title || 'GIF',
            thumbnail: item.images?.fixed_height_downsampled?.url || 
                       item.images?.fixed_height?.url || 
                       item.images?.downsized?.url,
            src: item.images?.original?.url || 
                 item.images?.downsized_large?.url || 
                 item.images?.downsized?.url,
            user: item.user?.display_name || item.username || 'Unknown'
          })).filter(item => item.src);
        }

        if (isActive) {
          console.log("Setting results:", normalizedData);
          dispatch(setResult(normalizedData));
        }

      } catch (err) {
        console.error("Fetch Error in Component:", err);
        if (isActive) {
          dispatch(setError("Failed to fetch data. Please check your API keys or connection."));
          dispatch(setResult([]));
        }
      } finally {
        if (isActive) {
          dispatch(setLoading(false));
        }
      }
    };

    getData();

    // Cleanup: mark this effect as inactive
    return () => {
      isActive = false;
    };
  }, [query, activeTab, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 bg-red-50 rounded-lg m-4">
        <p className="font-semibold mb-2">Error Loading Content</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        {query ? (
          <p>No results found for "{query}"</p>
        ) : (
          <p>Enter a search term to find media</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {results.map((item, index) => (
        <motion.div 
          key={`${item.type}-${item.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
          className="relative group overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-[4/3]"
        >
          {/* Overlay Title */}
          {item.title && item.title !== 'Untitled' && item.title !== 'Video' && (
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 via-black/20 to-transparent p-3 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium truncate leading-tight">
                {item.title}
              </p>
            </div>
          )}

          {/* PHOTO */}
          {item.type === "photo" && (
            <div className="w-full h-full">
              <img 
                src={item.src} 
                alt={item.title || 'Photo'} 
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundColor: item.color }}
              />
            </div>
          )}

          {/* VIDEO */}
          {item.type === "video" && (
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              {item.src ? (
                <video 
                  src={item.src} 
                  poster={item.thumbnail}
                  controls 
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-white text-xs text-center p-4">Video unavailable</div>
              )}
              
              {item.duration > 0 && (
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded z-10 pointer-events-none">
                  {Math.round(item.duration)}s
                </span>
              )}
              
              {item.src && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GIF */}
          {item.type === "gif" && (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
              <img 
                src={item.src} 
                alt={item.title || 'GIF'} 
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold pointer-events-none">
                GIF
              </div>
            </div>
          )}

          {/* Meta Info */}
          {(item.author || item.user) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
              <p className="text-white/90 text-xs truncate">
                {item.type === 'video' 
                  ? 'Pexels' 
                  : item.type === 'gif' 
                    ? item.user 
                    : `Unsplash · ${item.author}`}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ResultGrid;