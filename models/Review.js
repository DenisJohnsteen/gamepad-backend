const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  reviewTitle: {
    type: String,
  },
  review: {
    type: String,
  },
});

module.exports = Review;
