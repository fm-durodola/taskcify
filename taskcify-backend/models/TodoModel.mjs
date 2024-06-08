import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    task: {
      type: String,
      require: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Todo", todoSchema);
