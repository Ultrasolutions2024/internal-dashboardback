const express = require("express");
const { registerUser, loginUser,logout, getUserInfo } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authentication");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/get-user-info", getUserInfo);


module.exports = router;
