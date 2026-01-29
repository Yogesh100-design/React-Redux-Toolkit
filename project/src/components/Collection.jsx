import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCollection } from "../redux/features/CollectionSlice";

const Collection = () => {
  // ✅ FIX: items (not item)
  const collection = useSelector(
    (state) => state.collection.item
  );

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔘 SMALL YELLOW TOGGLE BUTTON */}
  <button
  onClick={() => setOpen(!open)}
  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md shadow transition"
>
  Collection
</button>


      {/* 📦 COLLECTION PANEL */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 flex justify-end">
          <div className="w-full sm:w-[420px] h-full bg-white shadow-xl overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">
                My Collection ({collection.length})
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-sm bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
              >
                Close
              </button>
            </div>

            {/* EMPTY STATE */}
            {collection.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                No items in collection
              </div>
            ) : (
              <div className="p-4 grid grid-cols-1 gap-4">
                {collection.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="rounded-lg overflow-hidden border shadow-sm"
                  >
                    {/* MEDIA */}
                    <div className="w-full h-44 bg-gray-100">
                      {(item.type === "photo" || item.type === "gif") && (
                        <img
                          src={item.src}
                          alt={item.title || "media"}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {item.type === "video" && (
                        <video
                          src={item.src}
                          poster={item.thumbnail}
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* ACTION */}
                    <div className="p-3">
                      <button
                        onClick={() =>
                          dispatch(removeFromCollection(item.id))
                        }
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg text-sm font-medium transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
