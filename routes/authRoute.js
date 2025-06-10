const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddlewares");
const {
  registerValidator,
  loginValidator,
} = require("../validations/authValidation");
const { errorHandlerMiddleware } = require("../middlewares/errorMiddleware");

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.get("/profile", authMiddleware, authController.getProfile);

router.use(errorHandlerMiddleware);

module.exports = router;
