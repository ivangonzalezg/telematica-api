const mongoose = require("mongoose");
const Candidate = require("./candidate.model");

const { Schema } = mongoose;

const documentsSchema = new Schema(
  {
    candidate: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: Candidate
    },
    photo: {
      required: true,
      type: String
    },
    plan: {
      required: true,
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Documents = mongoose.model("documents", documentsSchema);

module.exports = Documents;
