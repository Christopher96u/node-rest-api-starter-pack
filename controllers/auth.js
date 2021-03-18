const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
/* User for testing
{
    "email": "prueba@prueba.com",
    "password": "prueba"
}
*/

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // First: Verify if email exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `Email doesn't exist in database`,
      });
    }
    // Second: Verify if user.status is active(true)
    if (user.status === false) {
      return res.status(400).json({
        message: `This user has been baned or deleted`,
      });
    }
    // Third: Verify password
    const validPassword = bcryptjs.compareSync(password, user.password); // Return : Boolean
    if (!validPassword) {
      return res.status(400).json({
        message: `Password incorrect. Please, try again`,
      });
    }

    // Fourth: Generate the JWT
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error, please, get in contact with the administrator",
    });
  }
};

module.exports = {
  login,
};
