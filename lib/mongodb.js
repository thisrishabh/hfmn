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
  "cities",
  "amenities",
  "awards",
  "b2b_profiles",
  "classified_categories",
  "companies",
  "event_types",
  "home_price_ranges",
  "home_styles",
  "home_types",
  "life_styles",
  "neighborhoods",
  "project_types",
  "regions",
  "sales_statuses",
  "school_districts",
  "tags"
];

export const isCollectionExists = (collection) => collections.includes(collection);

export default dbConnect; 
