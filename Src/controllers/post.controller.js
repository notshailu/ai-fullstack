const postModel = require("../models/post.models");
const generateCaption = require("../services/ai.service");
const uploadfile = require("../services/Storage.service");
const { v4: uuidv4 } = require("uuid");

// Create a new post with AI generated caption
const createpostcontroller = async (req, res) => {
  try {
    const file = req.file;
    const { style } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    console.log("File received:", file.originalname);

    const base64image = file.buffer.toString("base64");
    const caption = await generateCaption(base64image, style);

    const result = await uploadfile(file.buffer, `post-${uuidv4()}`);

    if (!result || !result.url) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const post = await postModel.create({
      caption,
      Image: result.url,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      caption,
      post,
      user: req.user._id,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      success: false,
      message: "Post creation failed",
    });
  }
};

// Get history of posts for the authenticated user
const getUserHistory = async (req, res) => {
  try {
    const posts = await postModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("Image caption createdAt");

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get user history error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};

module.exports = { createpostcontroller, getUserHistory };
