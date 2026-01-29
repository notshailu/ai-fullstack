const mongoose = require("mongoose");

const postschema = new mongoose.Schema(
  {
    Image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // match actual model name
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("post", postschema);
module.exports = postModel;