const Vote = require("../models/vote.model");
const Voter = require("../models/voter.model");
const Candidate = require("../models/candidate.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

const VoterNotFound = { name: "CastError", model: { modelName: "voter" } };
const CandidateNotFound = { name: "CastError", model: { modelName: "candidate" } };

exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    const data = await Vote.find(query);
    let tdata = data.filter((thing, index, self) => index === self.findIndex(t => t.candidate.equals(thing.candidate)));
    tdata = await Promise.all(
      tdata.map(async m => {
        const t = data.filter(d => d.candidate.equals(m.candidate));
        const c = await Candidate.findById(m.candidate).populate("party");
        return { ...c.toObject(), votes: t.length };
      })
    );
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data: tdata });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};

exports.post = async (req, res, next) => {
  try {
    const { body } = req;
    const v = await Voter.findById(body.voter);
    if (!v) throw VoterNotFound;
    const c = await Candidate.findById(body.candidate);
    if (!c) throw CandidateNotFound;
    const data = await new Vote(body).save();
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};
