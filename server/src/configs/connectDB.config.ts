import mongoose from "mongoose";
import { DB_NAME } from "../constants";


const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING as string}/${DB_NAME}`
    );
    console.log("\nmongodb connected !!", connectionResponse.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB