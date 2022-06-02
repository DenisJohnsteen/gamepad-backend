const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");

// Creation du serveur
const app = express();
app.use(formidableMiddleware());
app.use(cors());
app.use(morgan("dev"));

// Connection a la BBD
mongoose.connect(process.env.MONGODBURL);

// IMPORT DES ROUTES
const userRoutes = require("./routes/users");
app.use(userRoutes);
const reviewRoutes = require("./routes/Reviews");
app.use(reviewRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Welcome ! ");
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable !");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
