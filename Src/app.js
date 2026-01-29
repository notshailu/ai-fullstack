const express = require("express");
const app = express();
const Authroutes = require("./Routes/Auth.routes");
const Postroutes = require("./Routes/Post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", Authroutes);
app.use("/post", Postroutes);

app.get("/", (req, res) => {
  res.send("server in runing ");
});

module.exports = app;
