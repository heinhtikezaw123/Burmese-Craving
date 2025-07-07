// const multer = require("multer");
// // const upload = require("../../utils/multer");
// const upload = require("../../utils/multerLocalStorage");

// function multerUploadMiddleware(req, res, next) {
//   const uploadFields = upload.fields([{ name: "profile", maxCount: 10 }]);

//   uploadFields(req, res, function (err) {
//     if (err) {
//       req.multerError = err;
//     }
//     next();
//   });
// }

// module.exports = multerUploadMiddleware;

// multerUploadMiddleware.js
const upload = require("../../utlis/multerLocalStorage"); // or wherever your multer local setup is
module.exports = upload.single("profile"); // adjust field name if different
