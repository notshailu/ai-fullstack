const express = require("express");
const router = express.Router();
const postcontroller = require("../controllers/post.controller");
const authmiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const ailimiter = require("../services/rateLimit");

const upload = multer({
  storage: multer.memoryStorage(),
});

// Create a new post with AI-generated caption
router.post(
  "/post",
  authmiddleware,
  ailimiter,
  upload.single("image"),
  postcontroller.createpostcontroller,
);

// Get history of posts for the logged-in user
router.get("/history", authmiddleware, postcontroller.getUserHistory);

module.exports = router;
