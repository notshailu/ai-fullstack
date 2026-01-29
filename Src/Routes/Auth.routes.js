const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authcontroller= require("../controllers/Auth.controller");

const router = express.Router();

router.post("/register", authcontroller.register);

router.post("/login", authcontroller.login);

router.get("/user", authcontroller.user);

router.get("/logout", authcontroller.logout);

module.exports = router;
