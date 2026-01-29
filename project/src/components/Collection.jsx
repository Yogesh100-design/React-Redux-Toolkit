import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCollection } from "../redux/features/CollectionSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Archive, X, Trash2, ExternalLink, Inbox, Download } from "lucide-react";

const Collection = () => {
  const collection = useSelector((state) => state.collection.item);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🌟 FLOATING TOGGLE BUTTON GROUP */}
      <div className="fixed bottom-8 right-8 z-[60] flex items-center gap-3 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="pointer-events-auto bg-white/90 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-full font-bold shadow-xl border border-white/50 text-sm tracking-wide hidden sm:block"
        >
          My Vault
        </motion.div>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          className="pointer-events-auto bg-slate-900 text-amber-400 p-4 rounded-full shadow-2xl shadow-indigo-900/20 border-4 border-white ring-4 ring-amber-100 flex items-center justify-center group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-amber-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
          <Archive size={24} strokeWidth={2.5} className="relative z-10" />
          {collection.length > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-bounce z-20">
              {collection.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* 📦 DRAWER PANEL */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] bg-white shadow-2xl overflow-hidden flex flex-col"
            >
              {/* HEADER */}
              <div className="p-8 border-b border-slate-100 bg-white flex items-center justify-between relative z-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                    Your <span className="text-amber-500 italic">Vault.</span>
                  </h2>
                  <p className="text-slate-500 text-sm font-bold tracking-wide uppercase mt-1">
                    {collection.length} {collection.length === 1 ? 'Asset' : 'Assets'} Collected
                  </p>
                </div>
                <button 
                  onClick={() => setOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 flex items-center justify-center transition-all"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fdfdf7]">
                {collection.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center opacity-60">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <Inbox size={40} className="text-slate-300" />
                    </div>
                    <p className="font-black text-2xl text-slate-300 tracking-tighter">IT'S EMPTY HERE</p>
                    <p className="text-sm font-medium mt-2">Start exploring to build your collection.</p>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {collection.map((item, i) => (
                      <motion.div
                        key={`${item.type}-${item.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative bg-white border border-slate-100 rounded-[20px] p-3 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200 transition-all flex gap-4 h-32"
                      >
                         {/* THUMBNAIL */}
                        <div className="w-28 h-26 rounded-2xl overflow-hidden bg-slate-100 relative shrink-0 shadow-inner">
                          {item.type === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                               <video src={item.src} className="w-full h-full object-cover opacity-80" />
                            </div>
                          ) : (
                            <img src={item.src} className="w-full h-full object-cover" alt="Saved media" />
                          )}
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                            {item.type}
                          </div>
                        </div>

                        {/* INFO & ACTIONS */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <h4 className="font-bold text-slate-900 text-base line-clamp-2 leading-tight mb-1">
                                    {item.title || "Untitled Media"}
                                </h4>
                                <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">
                                  {item.author || item.user || "Unknown Creator"}
                                </p>
                            </div>
                            
                            <div className="flex gap-2 justify-end">
                                <a 
                                    href={item.src} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
                                    title="Open Original"
                                >
                                    <ExternalLink size={16} strokeWidth={2.5} />
                                </a>
                                <button
                                    onClick={() => dispatch(removeFromCollection(item.id))}
                                    className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    title="Remove"
                                >
                                    <Trash2 size={16} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Collection;
