# Photo Gallery (React + Vite + Tailwind)

Fetches 30 photos from the Picsum API, shows them in a responsive grid, filters by author name, and lets you mark favourites that persist across refreshes.

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/hooks/useFetchPhotos.js` – custom hook, returns `{ photos, loading, error }`
- `src/reducers/favouritesReducer.js` – favourites state logic for `useReducer`
- `src/components/Gallery.jsx` – uses the hook, reducer, `useCallback`, `useMemo`
- `src/components/SearchBar.jsx`, `PhotoCard.jsx` – presentational components

## Stack

React 18 (functional components + hooks only), Vite, Tailwind CSS. No component libraries.
