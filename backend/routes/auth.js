const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator();
const authMiddleware = require("../middleware/auth");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

router.post("/login", validator.body(loginSchema), authControllers.postLogin);

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.postRegister
);

router.get("/test", authMiddleware, (req, res) => {
  res.send("request passed");
});

module.exports = router;
