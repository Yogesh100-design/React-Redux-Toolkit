import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Play, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCollection } from "../redux/features/CollectionSlice";

const MediaCard = ({ item, setSelectedItem, handleDownload }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleWrapperClick = () => {
    setSelectedItem(item);
  };

  const handleMediaLoad = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div
      layoutId={`card-${item.id}`} // For shared element transition
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      onClick={handleWrapperClick}
      className="relative group overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-[4/3] cursor-pointer"
    >
      {/* Overlay Title */}
      {item.title && item.title !== "Untitled" && item.title !== "Video" && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 via-black/20 to-transparent p-3 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium truncate leading-tight">
            {item.title}
          </p>
        </div>
      )}

      {/* Animated Loader */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-200 z-0" 
          style={{ backgroundColor: item.color }}
        >
          <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
        </div>
      )}

      {/* PHOTO */}
      {item.type === "photo" && (
        <div className="w-full h-full">
          <img
            src={item.src}
            alt={item.title || "Photo"}
            loading="lazy"
            onLoad={handleMediaLoad}
            className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundColor: item.color }}
          />
        </div>
      )}

      {/* VIDEO */}
      {item.type === "video" && (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
            {item.src ? (
                <>
                <video
                    src={item.src}
                    muted
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                    onLoadedData={handleMediaLoad}
                    preload="metadata"
                    className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                
                {/* Play Icon - purely visual */}
                {isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={20} className="text-white fill-current ml-1" />
                        </div>
                    </div>
                )}
                
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
            onLoad={handleMediaLoad}
            className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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
            onClick={(e) => e.stopPropagation()} 
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
  );
};

export default MediaCard;
