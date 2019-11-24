const Charge = require("../models/charge.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

const MissingId = { name: "MissingId" };
const IdNotFound = { name: "IdNotFound" };

exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    Object.keys(query).forEach(k => {
      query[k] = query[k].toUpperCase();
    });
    const data = await Charge.find(query);
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};

exports.post = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await new Charge(body).save();
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};

exports.delete = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.id) throw MissingId;
    const r = await Charge.findById(body.id);
    if (!r) throw IdNotFound;
    await Charge.findByIdAndDelete(body.id);
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};

exports.patch = async (req, res, next) => {
  try {
    const { body } = req;
    const { id, ...params } = body;
    if (!id) throw MissingId;
    const r = await Charge.findById(id);
    if (!r) throw IdNotFound;
    const data = await Charge.updateOne({ _id: id }, { $set: params });
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};
