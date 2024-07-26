import { Schema, model } from "mongoose";

// Kullanıcı şeması oluşturuluyor.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Lütfen username alanını belirleyiniz"],
      unique: [
        true,
        "Bu isimde bir kullanıcı mevcut. Lütfen farklı bir nickname belirleyin.",
      ],
    },
    email: {
      type: String,
      required: [true, "Lütfen email alanını belirleyin"],
      unique: [
        true,
        "Bu mail adresinde bir kullanıcı mevcut. Lütfen faklı bir email belirleyin.",
      ],
    },
    password: {
      type: String,
      required: [true, "Lütfen şifre alanını belirleyin"],
    },
    photo: {
      type: String,
      default: "https://picsum.photos/100",
    },
    country: {
      type: String,
      required: [true, "Lütfen ülke alanını belirleyin"],
    },
    phone: {
      type: Number,
    },
    desc: {
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },

  // Timestamp sayesinde oluşturduğumuz bütün belgelere...
  // otomatik olarak oluşturulma ve güncellenme tarihleri eklenir.
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
