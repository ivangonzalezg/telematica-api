const mongoose = require("mongoose");
const Candidate = require("./candidate.model");
const Voter = require("./voter.model");
const Place = require("./place.model");

const { Schema } = mongoose;

const voteSchema = new Schema(
  {
    voter: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: Voter
    },
    candidate: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: Candidate
    },
    charge: {
      required: true,
      type: String
    },
    location: {
      required: true,
      type: String
    },
    place: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: Place
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

voteSchema.index({ voter: 1, candidate: 1 }, { unique: 1 });

const Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;
