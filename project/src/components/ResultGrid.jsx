import { useState, useEffect } from "react";
// ... (imports remain)
import { motion, AnimatePresence } from "framer-motion";
import { Download, Loader2, Plus, X } from "lucide-react";
// ... (imports remain)

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error, page } = useSelector(
    (state) => state.search,
  );
  
  const [selectedItem, setSelectedItem] = useState(null);

  // ... (useEffect and handleDownload remain)

  return (
    <>
      <Collection />
      <div className="pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {results.map((item, index) => (
            <motion.div
              key={`${item.type}-${item.id}`}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative group overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-[4/3] cursor-pointer"
            >
              {/* Overlay Title */}
              {/* ... (Overlay remains) */}

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
                   {/* We remove controls here so clicking opens the modal instead of playing immediately, 
                       or we keep controls but ensure the surrounding div captures the click. 
                       For better UX in grid, we'll keep preview simple. */}
                   <video
                      src={item.src}
                      muted
                      onMouseOver={e => e.target.play()}
                      onMouseOut={e => e.target.pause()}
                      className="w-full h-full object-cover"
                   />
                   
                   {/* ... (Add to Collection logic) */}

                   {/* PLAY ICON */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={20} className="text-white fill-current ml-1" />
                      </div>
                   </div>
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 z-20 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    {/* ... (Meta content remains) */}
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
                        className="bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors flex-shrink-0"
                        title="Download"
                    >
                        <Download size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCollection(item));
                        }}
                        className="bg-white/20 hover:bg-amber-500 hover:text-black text-white p-1.5 rounded-full backdrop-blur-sm transition-colors flex-shrink-0 ml-2"
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
        {/* ... (Load More logic remains) */}
        
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
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center"
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
                        className="p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-colors"
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
