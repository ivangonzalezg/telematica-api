const mongoose = require("mongoose");
const Party = require("./party.model");
const Charge = require("./charge.model");

const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    identification: {
      required: true,
      type: Number,
      unique: true,
      min: 1
    },
    party: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: Party
    },
    resume: {
      required: true,
      type: String
    },
    location: {
      required: true,
      type: String
    },
    charge: {
      required: true,
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

candidateSchema.index({ party: 1, charge: 1 }, { unique: 1 });

const Candidate = mongoose.model("candidate", candidateSchema);

module.exports = Candidate;
