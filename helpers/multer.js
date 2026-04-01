const multer = require("multer");
const path = require("path");

const FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidFormat = FILE_TYPE[file.mimetype];
    let uploadError = new Error("Invalid image type!");

    if (isValidFormat) uploadError = null;

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueFile = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFile);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
