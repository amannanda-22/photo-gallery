import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
  TOGGLE_FAVOURITE,
} from "../reducers/favouritesReducer.js";
import SearchBar from "./SearchBar.jsx";
import PhotoCard from "./PhotoCard.jsx";

export default function Gallery() {
  // Req 6: data comes from the custom hook, Gallery never calls fetch directly.
  const { photos, loading, error } = useFetchPhotos();

  // Search text is simple, independent UI state, so useState is enough here.
  const [query, setQuery] = useState("");

  // Req 5: favourites use useReducer. The 3rd argument (loadFavourites) is a lazy
  // initializer: it reads localStorage once, so saved favourites survive a refresh.
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites);

  // Req 5: save to localStorage every time the favourites list changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // Storage full or blocked: the app still works, it just won't persist.
    }
  }, [favourites]);

  // Req 7a: useCallback keeps the SAME function between renders. SearchBar is
  // wrapped in memo, so it only re-renders when the typed text actually changes,
  // not when something unrelated (like toggling a favourite) re-renders Gallery.
  const handleSearch = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  // Req 7b: useMemo caches the filtered list. It is recomputed only when `photos`
  // or `query` change. Toggling a favourite changes neither, so no re-filtering.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, query]);

  const handleToggleFavourite = (id) => dispatch({ type: TOGGLE_FAVOURITE, id });

  // Req 2: loading spinner while fetching.
  if (loading) {
    return (
      <div className="flex justify-center py-20" role="status" aria-label="Loading photos">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600" />
      </div>
    );
  }

  // Req 2: error message if the fetch fails.
  if (error) {
    return (
      <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load photos: {error}
      </p>
    );
  }

  return (
    <section>
      {/* Req 4: search input at the top, filters the already-fetched data. */}
      <div className="mb-6">
        <SearchBar value={query} onChange={handleSearch} />
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="py-10 text-center text-slate-500">No photos match your search.</p>
      ) : (
        // Req 3: 1 column on mobile, 2 on tablet (md), 4 on desktop (lg).
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
