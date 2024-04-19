import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      "Connection established with MongoDB. Connected Host: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("EXCEPTION caught while connecting with MongoDB.", error);
    throw error;
  }
};

export default connectDB;
