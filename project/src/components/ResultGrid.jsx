import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setResult,
  setLoading,
  setError,
  appendResults,
  incrementPage,
} from "../redux/features/SearchSlice";
import { fetchPhotos, fetchVideos, fetchGifs } from "../api/Api";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Loader2, Plus, X, Play } from "lucide-react";
import { addToCollection } from "../redux/features/CollectionSlice";
import Collection from "./Collection";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error, page } = useSelector(
    (state) => state.search,
  );
  
  const [selectedItem, setSelectedItem] = useState(null);

  // console.log("ResultGrid State:", { query, activeTab, results, loading, error, page });

  useEffect(() => {
    let isActive = true;

    const getData = async () => {
      if (!query || !query.trim()) {
        if (page === 1) {
          dispatch(setResult([]));
        }
        dispatch(setLoading(false));
        return;
      }

      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        let normalizedData = [];

        if (activeTab === "Photos") {
          const response = await fetchPhotos(query, page);
          // console.log("Photos API Response:", response);
          const photos = Array.isArray(response?.results)
            ? response.results
            : [];

          normalizedData = photos.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description || item.description || "Untitled",
            thumbnail: item.urls?.small,
            src: item.urls?.regular || item.urls?.full || item.urls?.small,
            author: item.user?.name || "Unknown",
            color: item.color || "#f3f4f6",
          }));
        } else if (activeTab === "Videos") {
          const response = await fetchVideos(query, page);
          const videos = Array.isArray(response?.videos) ? response.videos : [];

          normalizedData = videos
            .map((item) => {
              const videoFiles = item.video_files || [];
              const sortedFiles =
                videoFiles.length > 0
                  ? [...videoFiles].sort(
                      (a, b) => (b.height || 0) - (a.height || 0),
                    )
                  : [];

              const bestFile = sortedFiles[0] || videoFiles[0];

              return {
                id: item.id,
                type: "video",
                title: item.user?.name || "Video",
                thumbnail: item.image,
                src: bestFile?.link || "",
                duration: item.duration,
              };
            })
            .filter((item) => item.src);
        } else if (activeTab === "GIF") {
          const response = await fetchGifs(query, page);
          const gifs = Array.isArray(response?.data) ? response.data : [];

          normalizedData = gifs
            .map((item) => ({
              id: item.id,
              type: "gif",
              title: item.title || "GIF",
              thumbnail:
                item.images?.fixed_height_downsampled?.url ||
                item.images?.fixed_height?.url ||
                item.images?.downsized?.url,
              src:
                item.images?.original?.url ||
                item.images?.downsized_large?.url ||
                item.images?.downsized?.url,
              user: item.user?.display_name || item.username || "Unknown",
            }))
            .filter((item) => item.src);
        }

        if (isActive) {
          console.log("Setting results:", normalizedData);
          if (page === 1) {
            dispatch(setResult(normalizedData));
          } else {
            dispatch(appendResults(normalizedData));
          }
        }
      } catch (err) {
        console.error("Fetch Error in Component:", err);
        if (isActive) {
          dispatch(
            setError(
              "Failed to fetch data. Please check your API keys or connection.",
            ),
          );
          if (page === 1) dispatch(setResult([]));
        }
      } finally {
        if (isActive) {
          dispatch(setLoading(false));
        }
      }
    };

    getData();

    return () => {
      isActive = false;
    };
  }, [query, activeTab, page, dispatch]);

  const handleDownload = async (e, url, type, id) => {
    e.stopPropagation(); // Stop propagation to prevent modal from opening if download button is clicked
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      const extension =
        type === "video" ? "mp4" : type === "gif" ? "gif" : "jpg";
      link.download = `vault-${type}-${id}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      window.open(url, "_blank");
    }
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 bg-red-50 rounded-lg m-4 border border-red-100">
        <p className="font-semibold mb-2">Error Loading Content</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!loading && (!Array.isArray(results) || results.length === 0)) {
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
    <>
      <Collection />
      <div className="pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {results.map((item, index) => (
            <motion.div
              key={`${item.type}-${item.id}`}
              layoutId={`card-${item.id}`} // For shared element transition
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              onClick={() => setSelectedItem(item)}
              className="relative group overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-[4/3] cursor-pointer"
            >
              {/* Overlay Title */}
              {item.title &&
                item.title !== "Untitled" &&
                item.title !== "Video" && (
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
                    alt={item.title || "Photo"}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              )}

              {/* VIDEO */}
              {item.type === "video" && (
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    {/* Updated: Remove controls to allow click pass-through, play on hover */}
                    {item.src ? (
                      <>
                        <video
                          src={item.src}
                          muted
                          onMouseOver={(e) => e.target.play()}
                          onMouseOut={(e) => e.target.pause()}
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Play Icon - purely visual */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Play size={20} className="text-white fill-current ml-1" />
                            </div>
                        </div>

                        {/* Add to collection button inside video wrapper to stay relative */}
                         <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCollection(item));
                          }}
                          className="absolute top-3 right-3 z-30 w-10 h-10 bg-black/40 hover:bg-amber-500 text-white hover:text-black backdrop-blur-md flex items-center justify-center rounded-full transition-all shadow-lg border border-white/10 group/btn"
                          title="Add to Collection"
                        >
                           <Plus size={20} />
                        </button>
                      </>
                    ) : (
                       <div className="text-white text-xs text-center p-4">
                        Video unavailable
                      </div>
                    )}
                    
                    {/* DURATION */}
                    {item.duration > 0 && (
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded z-10 pointer-events-none">
                        {Math.round(item.duration)}s
                      </span>
                    )}
                  </div>
              )}

              {/* GIF */}
              {item.type === "gif" && (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                  <img
                    src={item.src}
                    alt={item.title || "GIF"}
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
                <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 z-20 flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()} // Prevent clicking meta area from opening modal if preferred
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-white/90 text-xs truncate">
                      {item.type === "video"
                        ? "Pexels"
                        : item.type === "gif"
                          ? item.user
                          : `Unsplash · ${item.author}`}
                    </p>
                  </div>
                  <button
                    onClick={(e) =>
                      handleDownload(e, item.src, item.type, item.id)
                    }
                    className="bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors flex-shrink-0 cursor-pointer"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                         e.stopPropagation();
                         dispatch(addToCollection(item));
                    }}
                    className="bg-white/20 hover:bg-amber-500 hover:text-black text-white p-1.5 rounded-full backdrop-blur-sm transition-colors flex-shrink-0 ml-2 cursor-pointer"
                    title="Add to Collection"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {results.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => dispatch(incrementPage())}
              disabled={loading}
              className="bg-white border text-slate-900 px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-amber-50 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-amber-500" />
                  Loading...
                </>
              ) : (
                <>
                  Load More <Plus size={18} className="text-amber-500" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

       {/* 🖼️ LIGHTBOX MODAL */}
       <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center outline-none"
              onClick={(e) => e.stopPropagation()}
            >
               {/* CLOSE BUTTON */}
               <button 
                 onClick={() => setSelectedItem(null)}
                 className="absolute -top-12 right-0 md:right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2"
               >
                 <span className="uppercase text-xs font-bold tracking-widest hidden md:block">Close</span>
                 <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <X size={20} />
                 </div>
               </button>

               {/* MEDIA CONTENT */}
               <div className="rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10 w-auto h-auto max-h-[80vh] flex items-center justify-center">
                  {selectedItem.type === 'video' ? (
                     <video 
                       src={selectedItem.src} 
                       controls 
                       autoPlay 
                       className="max-w-full max-h-[80vh] object-contain"
                     />
                  ) : (
                     <img 
                       src={selectedItem.src} 
                       alt={selectedItem.title} 
                       className="max-w-full max-h-[80vh] object-contain"
                     />
                  )}
               </div>

               {/* SUB-INFO (Optional) */}
               <div className="mt-6 flex items-center gap-4 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                  <div className="text-white">
                     <p className="font-bold text-sm">{selectedItem.title || "Untitled"}</p>
                     <p className="text-white/50 text-xs uppercase tracking-wider">{selectedItem.author || selectedItem.user || "Unknown"}</p>
                  </div>
                  <div className="h-8 w-[1px] bg-white/20"></div>
                  <div className="flex gap-2">
                     <button 
                        onClick={(e) => handleDownload(e, selectedItem.src, selectedItem.type, selectedItem.id)}
                        className="p-2 bg-white text-black rounded-full hover:bg-amber-400 transition-colors"
                        title="Download"
                     >
                        <Download size={18} />
                     </button>
                     <button
                        onClick={() => dispatch(addToCollection(selectedItem))}
                        className="p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer"
                        title="Add to Vault"
                     >
                        <Plus size={18} />
                     </button>
                  </div>
               </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResultGrid;
