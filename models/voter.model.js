const mongoose = require("mongoose");
const Place = require("./place.model");

const { Schema } = mongoose;

const voterSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    identification: {
      required: true,
      type: Number,
      unique: true
    },
    city: {
      required: true,
      type: String
    },
    state: {
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

const Voter = mongoose.model("voter", voterSchema);

module.exports = Voter;
