const Documents = require("../models/documents.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

exports.get = {
  photo: async (req, res) => {
    try {
      const { params } = req;
      const data = await Documents.findOne(params);
      const photo = Buffer.from(
        data
          .toObject()
          .photo.split(";base64,")
          .pop(),
        "base64"
      );
      res
        .writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": photo.length
        })
        .end(photo);
    } catch (error) {
      const message = getErrorMessage(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
    }
  },
  plan: async (req, res) => {
    try {
      const { params } = req;
      const data = await Documents.findOne(params);
      const pdf = Buffer.from(
        data
          .toObject()
          .plan.split(";base64,")
          .pop(),
        "base64"
      );
      res
        .writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Length": pdf.length
        })
        .end(pdf);
    } catch (error) {
      const message = getErrorMessage(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
    }
  }
};
