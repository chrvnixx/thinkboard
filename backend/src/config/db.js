import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDb has connected successfully");
  } catch (error) {
    console.log("mongoDb cant connect");
  }
}
