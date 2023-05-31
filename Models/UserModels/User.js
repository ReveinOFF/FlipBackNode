import mongoose from "mongoose";
import * as uuid from "uuid";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
      required: true,
    },
    image: {
      type: String,
    },
    imagePath: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    login: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 15,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    description: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPrivateUser: {
      type: Boolean,
      default: false,
    },
    userAuth: [{ type: String, ref: "UserAuth" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
