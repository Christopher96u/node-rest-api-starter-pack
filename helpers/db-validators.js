const Role = require("../models/role");
const User = require("../models/user");
const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role ${role} doesn't exist in database`);
  }
};

// Verify if email exists
const verifyEmail = async (email = "") => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`That email ${email} has been used before`);
  }
};
// Verify if there is an user in database with an specific ID before updating this user
const verifyUserExistenceByID = async (id = "") => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`The ID: ${id} doesn't exist in database`);
  }
};

module.exports = {
  isRoleValid,
  verifyEmail,
  verifyUserExistenceByID,
};
