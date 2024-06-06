import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constants.mjs";

class TaskcifyDB {
  async connect() {
    try {
      await mongoose.connect(MONGO_URI, { dbName: "taskcify" });
      console.log(`Database connected`);
    } catch (error) {
      console.error(error.message);
    }
  }
}

const db = Object.freeze(new TaskcifyDB());

export default db;
