import Feed from "@/components/Feed";
import InputPost from "@/components/InputPost";

export default async function Home() {
  let data = null;

  try {
    const result = await fetch(process.env.URL + "/api/post/all", {
      method: "POST",
      cache: "no-store",
    });
    data = await result.json();
  } catch (error) {
    console.log("Error fetching data", error);
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto border-l border-r">
      <div className="py-2 px-3 sticky top-0 z-50 border-b border-gray-200">
        <h2 className="text-lg sm:text-2xl font-bold">Home</h2>
      </div>

      <InputPost />
      <Feed data={data} />
    </div>
  );
}
