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
      className="flex items-center gap-2 bg-white p-2 rounded-full shadow-lg border border-amber-100 max-w-2xl w-full mx-auto"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for photos, videos, or gifs..."
        className="flex-1 px-6 py-3 text-base rounded-full bg-transparent
                   outline-none placeholder-slate-400 text-slate-800"
      />

      <button
        type="submit"
        className="px-8 py-3 text-sm font-black uppercase tracking-wider rounded-full
                   bg-amber-400 text-black shadow-md shadow-amber-200/50
                   hover:bg-amber-300 active:scale-95
                   transition-all"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
