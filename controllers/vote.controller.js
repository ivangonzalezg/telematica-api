const Vote = require("../models/vote.model");
const Voter = require("../models/voter.model");
const Candidate = require("../models/candidate.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    const data = await Vote.find(query);
    let tdata = data.filter((thing, index, self) => index === self.findIndex(t => t.candidate.equals(thing.candidate)));
    tdata = await Promise.all(
      tdata.map(async m => {
        const t = data.filter(d => d.candidate.equals(m.candidate));
        const c = await Candidate.findById(m.candidate)
          .populate("charge")
          .populate("party");
        return { ...c.toObject(), votes: t.length };
      })
    );
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, tdata });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};

exports.post = async (req, res, next) => {
  try {
    const { body } = req;
    await Voter.findById(body.voter);
    await Candidate.findById(body.candidate);
    const data = await new Vote(body).save();
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};
