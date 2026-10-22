export const STORAGE_KEY = "gallery-favourites";

// Actions this reducer understands (kept as constants to avoid typos).
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";

// State shape: an array of favourite photo ids, e.g. ["10", "25"].
// Reads the saved list from localStorage once, when the reducer is first set up.
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupt JSON or storage blocked: start with an empty list.
    return [];
  }
}

// Pure function: (currentState, action) -> newState. It never mutates state.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id) // already a favourite -> remove
        : [...state, action.id]; // not yet -> add
    default:
      return state;
  }
}
