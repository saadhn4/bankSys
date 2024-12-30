import mongoose from "mongoose";
import config from "config";

async function connect() {
  try {
    let dbUrl = config.get("DB_URL");
    await mongoose.connect(dbUrl);
    console.log("Database connected.");
  } catch (error) {
    console.log(error);
  }
}
connect();
