import { memo } from "react";

// memo() skips re-rendering this component when its props did not change.
// That only works if `onChange` keeps the same identity between renders,
// which is why Gallery wraps the handler in useCallback.
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by author name..."
      aria-label="Search photos by author name"
      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
    />
  );
}

export default memo(SearchBar);
