import Post from "@/libs/models/post.model";
import { connect } from "@/libs/mongodb/mongoose";

export const POST = async () => {
  try {
    await connect();
    const feedPosts = await Post.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(feedPosts), { status: 200 });
  } catch (error) {
    console.log("Error getting posts", error);
    return new Response("Error getting posts", { status: 500 });
  }
};
