const express = require("express");
const router = express.Router();
const TestController = require("../controllers/TestController");
const validator = require("../validators");
const multerUploadMiddleware = require("../validators/test/upload");

router.post(
  "/",
  multerUploadMiddleware,
  validator.testValidation,
  validator.validate,
  TestController.createTest
);
router.get("/", TestController.testList);

router.get("/:uuid", TestController.getTestById);
router.put(
  "/:uuid",
  validator.testValidation,
  validator.validate,
  TestController.updateTest
);
router.delete("/:uuid", TestController.deleteTest);

module.exports = router;
