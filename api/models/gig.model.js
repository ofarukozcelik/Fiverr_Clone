import { model, Schema } from "mongoose";

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Lütfen kullanıcı id'sini tanımlayın"],
    },
    title: {
      type: String,
      required: [true, "Lütfen title tanımlayın"],
    },
    desc: {
      type: String,
      required: [true, "Lütfen desc tanımlayın"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Lütfen category tanımlayın"],
    },
    cover: {
      type: String,
      required: [true, "Lütfen cover tanımlayın"],
    },
    images: {
      type: [String],
    },
    shortTitle: {
      type: String,
      required: [true, "Lütfen shortTitle tanımlayın"],
    },
    shortDesc: {
      type: String,
      required: [true, "Lütfen shortDesc tanımlayın"],
    },
    deliveryTime: {
      type: Number,
      required: [true, "Lütfen deliveryTime tanımlayın"],
    },
    revisionNumber: {
      type: Number,
      required: [true, "Lütfen deliveryTime tanımlayın"],
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Lütfen price tanımlayın"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ortalama ratingi veritbanında tutmaya gerek olmadığından zaten tutulan iki değerin hesaplanması sonuccu ortaya çıktığı için ...
// get isteklerinde client'a göndermeden önce ortalamayı hesaplayıp ekliyeceğiz.
gigSchema.virtual("avgRating").get(function () {
  return (this.starCount / this.reviewCount).toFixed(2);
});

export default model("Gig", gigSchema);
