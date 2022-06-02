const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  console.log("Token =>", req.headers.autorization);

  if (req.headers.autorization) {
    const user = await User.findOne({
      token: req.headers.autorization.replace("Bearer", ""),
    });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized 1 / Token non valide " });
    }
  } else {
    res.status(401).json({ error: "Unauthorized 1 / Token non envoyé" });
  }
};

module.exports = isAuthenticated;
