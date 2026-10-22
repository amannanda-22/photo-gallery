// One card = photo + author name + heart button.
export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow">
      <img
        // Picsum serves a resized image for a given id, so cards load quickly.
        src={`https://picsum.photos/id/${photo.id}/600/400`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-[3/2] w-full object-cover"
      />
      <div className="flex items-center justify-between px-4 py-3">
        <p className="truncate pr-2 font-medium">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={isFavourite}
          className="shrink-0 rounded-full p-1 transition hover:bg-slate-100"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${
              isFavourite ? "fill-red-500 stroke-red-500" : "fill-none stroke-slate-500"
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
