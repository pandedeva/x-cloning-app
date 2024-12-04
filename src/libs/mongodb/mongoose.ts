import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);
  if (initialized) return console.log("MongoDB is already connected");

  try {
    // if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    // * bisa pakai yang atas atau bisa pakai yang bawah

    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "x-cloning-app",
    });

    console.log("MongoDB is connected");
    initialized = true;
  } catch (error) {
    console.log("MongoDB is not connected", error);
  }
};
