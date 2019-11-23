const mongoose = require("mongoose");

const { Schema } = mongoose;

const placeSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true
    },
    address: {
      required: true,
      type: String
    },
    city: {
      required: true,
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Place = mongoose.model("place", placeSchema);

module.exports = Place;
