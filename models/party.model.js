const mongoose = require("mongoose");

const { Schema } = mongoose;

const partySchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      uppercase: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Party = mongoose.model("party", partySchema);

module.exports = Party;
