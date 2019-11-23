const Party = require("../models/party.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    Object.keys(query).forEach(k => {
      query[k] = query[k].toUpperCase();
    });
    const data = await Party.find(query);
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
    const data = await new Party(body).save();
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};
