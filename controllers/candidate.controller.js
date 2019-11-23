const fs = require("fs");
const Candidate = require("../models/candidate.model");
const Charge = require("../models/charge.model");
const Party = require("../models/party.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

const MissingField = { name: "MissingField" };
const MissingId = { name: "MissingId" };

exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    const data = await Candidate.find(query)
      .populate("charge")
      .populate("party");
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
    await Charge.findById(body.charge);
    await Party.findById(body.party);
    if (!body.photo || !body.plan) throw MissingField;
    let data = await new Candidate(body).save();
    data = data.toObject();
    const base64Photo = body.photo.split(";base64,").pop();
    const photoPath = `./public/api/photo/${data._id}.png`;
    const base64Plan = body.plan.split(";base64,").pop();
    const planPath = `./public/api/plan/${data._id}.pdf`;
    fs.writeFileSync(photoPath, base64Photo, { encoding: "base64" });
    fs.writeFileSync(planPath, base64Plan, { encoding: "base64" });
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
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
    if (params.charge) await Charge.findById(params.charge);
    if (params.party) await Party.findById(params.party);
    const data = await Candidate.updateOne({ _id: id }, { $set: params });
    if (params.photo) {
      const base64Photo = body.photo.split(";base64,").pop();
      const photoPath = `./public/api/photo/${id}.png`;
      fs.writeFileSync(photoPath, base64Photo, { encoding: "base64" });
    }
    if (params.plan) {
      const base64Plan = body.plan.split(";base64,").pop();
      const planPath = `./public/api/plan/${id}.pdf`;
      fs.writeFileSync(planPath, base64Plan, { encoding: "base64" });
    }
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
  next();
};
