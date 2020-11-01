require("dotenv").config();
const mongoose = require("mongoose");

var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
//Routes
var studentRoutes = require("./routes/student");
var authRoutes = require("./routes/auth");
//var productRoutes = require("./routes/Example");

app.use("/api", studentRoutes);
app.use("/api", authRoutes);
//app.use("/api", productRoutes);

//PORT
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
