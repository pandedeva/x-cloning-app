import Post from "@/libs/models/post.model";
import { connect } from "@/libs/mongodb/mongoose";

export const POST = async (req: any) => {
  try {
    await connect();
    const data = await req.json();
    const post = await Post.findById(data.postId);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log("Error getting post", error);
    return new Response("Error getting post", { status: 500 });
  }
};
