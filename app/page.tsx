import RoomDesigner from '@/components/RoomDesigner';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-lg font-semibold text-stone-900 tracking-tight">
            FeelDX Room Designer
          </h1>
          <p className="text-sm text-stone-400 mt-0.5">
            Pick a room, select your materials, generate a summary.
          </p>
        </div>
      </header>
      <RoomDesigner />
    </main>
  );
}
