import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/SearchSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload
    dispatch(setQuery(search))
    setSearch('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white p-1.5 md:p-2 rounded-full shadow-lg border border-amber-100 w-full max-w-2xl mx-auto transition-shadow hover:shadow-xl hover:shadow-amber-500/10"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for photos, videos, or gifs..."
        className="flex-1 min-w-0 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base rounded-full bg-transparent
                   outline-none placeholder-slate-400 text-slate-800"
      />

      <button
        type="submit"
        className="px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-full
                   bg-amber-400 text-black shadow-md shadow-amber-200/50
                   hover:bg-amber-300 active:scale-95
                   transition-all flex-shrink-0 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
