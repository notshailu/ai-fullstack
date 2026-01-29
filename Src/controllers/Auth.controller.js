const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUserexist = await userModel.findOne({ username });
    if (isUserexist) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const user = await userModel.create({
      username,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token: token,
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPassValid = user.password === password;
    if (!isPassValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)

      .json({
        token: token,
        success: true,
        message: "Login successful",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const user = async (req, res) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1]; 

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User data fetched successfully",
      user,
    
    });
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const logout = async (req, res) => {
  res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = logout;

module.exports = { register, login, user, logout };
