import RoomDesigner from '@/components/RoomDesigner';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <h1 className="text-xl font-semibold text-stone-900 tracking-tight">
            FeelDX Room Designer
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Select a room, choose your materials, and generate a design summary.
          </p>
        </div>
      </header>
      <RoomDesigner />
    </main>
  );
}
