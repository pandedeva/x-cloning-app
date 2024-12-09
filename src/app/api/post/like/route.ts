import Post from "@/libs/models/post.model";
import { connect } from "@/libs/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const PUT = async (req: any) => {
  const user = await currentUser();

  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const post = await Post.findById(data.postId);

    if (post.likes.includes(user.publicMetadata.userMongoId)) {
      const updatedPost = await Post.findByIdAndUpdate(
        data.postId,
        { $pull: { likes: user.publicMetadata.userMongoId } },
        { new: true }
      );
      return new Response(JSON.stringify(updatedPost), { status: 200 });
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        data.postId,
        { $addToSet: { likes: user.publicMetadata.userMongoId } },
        { new: true }
      );
      return new Response(JSON.stringify(updatedPost), { status: 200 });
    }
  } catch (error) {
    console.log("Error liking post", error);
    return new Response("Error liking post", { status: 500 });
  }
};