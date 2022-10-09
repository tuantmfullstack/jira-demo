const jwt = require("jsonwebtoken");
// const Users = require("../models/Users.js");

module.exports = async (req, res, next) => {
  try {
    let token;

    if (req.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers?.authorization?.split(" ")[1];
    }

    if (!token) throw new Error("You have to login before accessing it.");

    if (!token.startsWith("ey")) {
      const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      const user = await Users.findOne({ id: decoded.id });
      if (!user) throw new Error("There is no user with this ID.");
    }

    // req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
