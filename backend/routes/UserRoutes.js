const express = require("express");
const router = express.Router();

// Controller
const { register, login, update } = require("../controllers/UserController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, loginValidation, getCurrentUser, userUpdateValidation } = require("../middlewares/userValidations");
const { imageUpload } = require("../middlewares/imageUpload");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage'), update);

module.exports = router;