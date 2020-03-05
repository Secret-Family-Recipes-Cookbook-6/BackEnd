const multer = require("multer");
const Datauri = require("datauri");
const path = require("path");
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const multerUploads = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
}).single("image");
const dUri = new Datauri();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dataUri = req =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { multerUploads, dataUri };
