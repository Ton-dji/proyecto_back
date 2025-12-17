import db from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = async () => {
  try {
    await db.connect(process.env.DB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

export { dbConfig };
export default db;
