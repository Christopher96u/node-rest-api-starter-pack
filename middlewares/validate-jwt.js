const { request, response, json } = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const User = require("../models/user");
const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      message: `Sorry. There isn't token in your request`,
    });
  }
  try {
    // payload(TOKEN)... just has uid(who user created this token), iat(when was created) and exp(when will expire) properties
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // Creating a userAuthenticated object who will be a user
    const userAuthenticated = await User.findById(uid);
    if (!userAuthenticated) {
      return res.status(401).json({
        message: `User doesn't exist.`,
      });
    }
    // Verify if userAuthenticated is currently with status TRUE (not has been removed from database)
    if (userAuthenticated.status === false) {
      return res.status(401).json({
        message: `Currently, you can't remove users. User removed.`,
      });
    }
    req.userAuthenticated = userAuthenticated;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: `Your token isn't valid`,
    });
  }
};

module.exports = {
  validateJWT,
};
