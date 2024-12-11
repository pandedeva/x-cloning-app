import Post from "@/libs/models/post.model";
import { connect } from "@/libs/mongodb/mongoose";

export const POST = async (req: any) => {
  try {
    await connect();

    const data = await req.json();

    // get post yang sort dari user tersebut yang paling baru
    const posts = await Post.find({ user: data.userId }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch the post data", { status: 500 });
  }
};
