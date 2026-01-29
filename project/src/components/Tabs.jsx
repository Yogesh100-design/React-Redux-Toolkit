import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/SearchSlice";

const Tabs = () => {
  const tabs = ["Photos", "Videos", "GIF"];
  const dispatch = useDispatch();
  
  // Pulling activeTab from Redux state to handle conditional styling
  const activeTab = useSelector((state) => state.search.activeTab);

  // Set default tab on mount
  useEffect(() => {
    if (!activeTab) {
      dispatch(setActiveTab("Photos"));
    }
  }, []);

  return (
    <div className="flex items-center justify-center py-10">
      {/* Aesthetic pill container with glassmorphism and soft borders */}
      <div className="flex gap-2 bg-white/40 backdrop-blur-md p-2 rounded-2xl w-fit shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          
          return (
            <button
              key={tab}
              onClick={() => dispatch(setActiveTab(tab))}
              className={`
                relative px-8 py-2.5 text-[10px] uppercase tracking-[0.2em] font-black rounded-xl 
                transition-all duration-500 ease-out overflow-hidden cursor-pointer
                ${isActive 
                  ? "bg-amber-400 text-black shadow-[0_4px_20px_rgba(251,191,36,0.4)] scale-105" 
                  : "text-zinc-400 hover:text-zinc-900 hover:bg-white/50 active:scale-95"
                }
              `}
            >
              {/* Subtle inner glow for active tab */}
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;