const Voter = require("../models/voter.model");
const Place = require("../models/place.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

const MissingId = { name: "MissingId" };
const IdNotFound = { name: "IdNotFound" };

exports.get = async (req, res) => {
  try {
    const { query } = req;
    const data = await Voter.find(query).populate("place");
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.post = async (req, res) => {
  try {
    const { body } = req;
    await Place.findById(body.place);
    const data = await new Voter(body).save();
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.patch = async (req, res) => {
  try {
    const { body } = req;
    if (!body.id) throw MissingId;
    const { id, ...params } = body;
    if (!id) throw MissingId;
    if (params.place) await Place.findById(params.place);
    const data = await Voter.updateOne({ _id: id }, { $set: params });
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { body } = req;
    if (!body.id) throw MissingId;
    const r = await Voter.findById(body.id);
    if (!r) throw IdNotFound;
    await Voter.findByIdAndDelete(body.id);
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};
