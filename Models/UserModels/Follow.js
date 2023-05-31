import mongoose from "mongoose";
import * as uuid from "uuid";

const Follow = mongoose.Scheme({
  _id: {
    type: String,
    default: uuid.v4,
    required: true,
  },
});

export default mongoose.model("Follow", Follow);
