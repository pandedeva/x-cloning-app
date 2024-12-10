import Post from "@/libs/models/post.model";
import { connect } from "@/libs/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req: any) => {
  const user = await currentUser();

  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const post = await Post.findById(data.postId);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log("Error getting post", error);
    return new Response("Error getting post", { status: 500 });
  }
};
