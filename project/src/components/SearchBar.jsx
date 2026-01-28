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
      className="flex items-center gap-2 bg-white p-3 rounded-full shadow-md w-6xl m-10"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anything"
        className="w-230 px-4 py-2 text-sm rounded-full bg-yellow-50
                   outline-none placeholder-yellow-600
                   focus:ring-2 focus:ring-yellow-400"
      />

      <button
        type="submit"
        className="w-50 px-5 py-2 text-sm font-semibold rounded-full
                   bg-yellow-400 text-gray-800
                   hover:bg-yellow-500 active:scale-95
                   transition-all"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
