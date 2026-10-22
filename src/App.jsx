import Gallery from "./components/Gallery.jsx";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Photo Gallery</h1>
        <Gallery />
      </div>
    </main>
  );
}
