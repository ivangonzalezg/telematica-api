const mongoose = require("mongoose");
const Candidate = require("./candidate.model");
const Voter = require("./voter.model");
const Charge = require("./charge.model");

const { Schema } = mongoose;

const voteSchema = new Schema(
  {
    voter: {
      required: true,
      type: Schema.Types.ObjectId,
      unique: true,
      ref: Voter
    },
    candidate: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: Candidate
    },
    charge: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: Charge
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;
