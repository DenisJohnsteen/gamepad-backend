// Imports des packages :
const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const { update } = require("../models/Review");
const router = express.Router();

const app = express();
app.use(formidableMiddleware());

// IMPORT MODELS

const Review = require("../models/Review");

// IMPORT MIDDLEWARES

const isAuthenticated = require("../middlewares/isAuthenticated");

// CREATE

router.post("/review/create", isAuthenticated, async (req, res) => {
  console.log("route: /review/create");
  console.log(req.fields);
  try {
    const newReview = new Review({
      reviewTitle: req.fields.reviewTitle,
      review: req.fields.review,
    });

    await newReview.save();

    res.json({
      message: "Review created",
      _id: newReview._id,
      reviewTitle: newReview.reviewTitle,
      review: newReview.review,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ

router.get("/getlistofreview", async (req, res) => {
  console.log("route : /");
  try {
    // On recherche, grâce à la fonction find(), tous les documents de la collection "students" :
    const getListOfReview = await Review.find();

    // On retourne ensuite les documents trouvés :
    res.json(getListOfReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE

router.post("/review/update", async (req, res) => {
  console.log("route: /review/update");
  console.log(req.fields);

  try {
    if (req.fields._id) {
      const updateReview = await Review.findById(req.fields._id);

      (updateReview.reviewTitle = req.fields.reviewTitle),
        (updateReview.review = req.fields.review);
      await updateReview.save();

      res.json(updateReview);
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE

router.post("/review/delete", async (req, res) => {
  console.log("route: /review/delete");
  console.log(req.fields);
  try {
    if (req.fields._id) {
      await Review.findByIdAndDelete(req.fields._id);

      res.json({ message: "Review removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
