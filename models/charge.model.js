const mongoose = require("mongoose");

const { Schema } = mongoose;

const chargeSchema = new Schema(
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

const Charge = mongoose.model("charge", chargeSchema);

module.exports = Charge;
