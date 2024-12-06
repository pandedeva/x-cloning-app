import Post from "@/libs/models/post.model";
import { connect } from "@/libs/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req: any) => {
  const user = await currentUser();

  try {
    await connect();
    const data = await req.json();

    // kalau user tidak ada atau user tidak sama dengan user yang membuat post, kembalikan error
    if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
      console.log("user:", user, "data:", data);

      return new Response("Unauthorized", { status: 401 });
    }
    const newPost = await Post.create({
      user: data.userMongoId,
      name: data.name,
      username: data.username,
      text: data.text,
      profileImg: data.profileImg,
      image: data.image,
    });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    console.log("Error creating post", error);
    return new Response("Error creating post", { status: 500 });
  }
};
