import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  email_addresses: any,
  username: string,
  image_url: string
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      //   $set berguna jika user ada di database update user, kalau tidak buat user baru
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0].email_address,
          username,
          avatar: image_url,
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.log("Error creating or updating user", error);
    return new Response("Error creating or updating user", { status: 500 });
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user", error);
    return new Response("Error deleting user", { status: 500 });
  }
};
