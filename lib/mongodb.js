import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const conString = process.env.MONGODB_URI;

    mongoose.connect(conString, {
      autoIndex: true,
    });
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });

  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

const collections = [
  "users",
  "cities"
];

export const isCollectionExists = (collection) => collections.includes(collection);

export default dbConnect; 
