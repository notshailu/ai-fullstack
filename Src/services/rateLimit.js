const rateLimit = require("express-rate-limit");


const ailimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // max 5 requests per IP
  message: {
    success: false,
    message: "Too many requests, please wait"
  }
});

module.exports = ailimiter

