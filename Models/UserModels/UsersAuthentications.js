import mongoose from "mongoose";
import * as uuid from "uuid";

const UserAuthScheme = new mongoose.Scheme(
  {
    _id: {
      type: String,
      default: uuid.v4,
      required: true,
    },
    ipAddress: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    device: {
      type: String,
    },
    browser: {
      type: String,
    },
    latitude: {
      type: mongoose.Types.Decimal128,
    },
    longitude: {
      type: mongoose.Types.Decimal128,
    },
    lastOnline: {
      type: Date,
    },
    user: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserAuth", UserAuthScheme);
