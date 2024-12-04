import InputPost from "@/components/InputPost";

export default function Home() {
  return (
    <div className="min-h-screen max-w-xl mx-auto border-l border-r">
      <div className="py-2 px-3 sticky top-0 z-50 border-b border-gray-200">
        <h2 className="text-lg sm:text-2xl font-bold">Home</h2>
      </div>

      <InputPost />
    </div>
  );
}
