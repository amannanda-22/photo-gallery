import { useEffect, useState } from "react";

const API_URL = "https://picsum.photos/v2/list?limit=30";

// Custom hook: owns ALL the data fetching, so the UI never calls fetch itself.
// Returns exactly: { photos, loading, error }
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController lets us cancel the request if the component unmounts
    // (also avoids a double-set of state under React StrictMode in dev).
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, { signal: controller.signal });

        // fetch() only rejects on network failure; a 404/500 still "succeeds",
        // so we check response.ok ourselves.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // An abort is intentional, not a real error, so we ignore it.
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        // Skip the update if we aborted (component is gone).
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPhotos();

    // Cleanup: runs on unmount.
    return () => controller.abort();
  }, []); // empty array = fetch once on first render

  return { photos, loading, error };
}
