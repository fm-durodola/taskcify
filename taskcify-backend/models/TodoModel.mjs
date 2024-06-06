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
    user: {
      type: Schema.Types.objectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default model("Todo", todoSchema);
