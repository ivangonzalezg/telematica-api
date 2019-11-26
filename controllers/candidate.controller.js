const Candidate = require("../models/candidate.model");
const Party = require("../models/party.model");
const Documents = require("../models/documents.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

const MissingField = { name: "MissingField" };
const IdNotFound = { name: "IdNotFound" };
const MissingId = { name: "MissingId" };

exports.get = async (req, res) => {
  try {
    const { query } = req;
    const data = await Candidate.find(query).populate("party");
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.post = async (req, res) => {
  try {
    const { body } = req;
    await Party.findById(body.party);
    if (!body.photo || !body.plan) throw MissingField;
    let data = await new Candidate(body).save();
    data = data.toObject();
    await new Documents({ candidate: data._id, photo: body.photo, plan: body.plan }).save();
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.patch = async (req, res) => {
  try {
    const { body } = req;
    const { id, ...params } = body;
    if (!id) throw MissingId;
    if (params.party) await Party.findById(params.party);
    const data = await Candidate.updateOne({ _id: id }, { $set: params });
    if (params.photo || params.plan) {
      await Documents.updateOne({ candidate: id }, { $set: params });
    }
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { body } = req;
    const r = await Candidate.findById(body.id);
    if (!r) throw IdNotFound;
    await Candidate.findByIdAndDelete(body.id);
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};
