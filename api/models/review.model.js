import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },

    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },

    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Review", ReviewSchema);
