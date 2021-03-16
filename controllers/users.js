const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const usersGet = async (req = request, res = response) => {
  //const { page = 1, limit } = req.query; //Optional querys : url?page=2&limit=3
  // If we wanna limit our querys we have to limite and paginate
  // As default we will limite our querys with 5 results
  const { limit = 5, from = 0 } = req.query; // Destructuring 'cause query could have many optional parameters
  /* const users = await User.find({ status: true }).limit(Number(limit)).skip(Number(from));
  const qtyUsers = await User.countDocuments({ status: true }); */
  const [users, qtyUsers] = await Promise.all([User.find({ status: true }).limit(Number(limit)).skip(Number(from)), User.countDocuments({ status: true })]);
  res.json({
    // page,
    // limit,
    qtyUsers,
    users,
    //promises,
  });
};
const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body; // Just 4 fields are required
  const user = new User({ name, email, password, role });
  // Second : Encrypting password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Third: Store in database
  await user.save();
  res.json({
    user,
  });
};

const usersPut = async (req = request, res = response) => {
  const { id } = req.params; // Stored as String
  const { _id, password, google, ...user } = req.body;
  // Validate in database
  if (password) {
    //Encrypting password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
  }
  // {new : true} as thrid parameter for returned a updated document!
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }); // First parameter ID, second: object

  res.json({
    updatedUser,
  });
};

const usersPatch = (req = request, res = response) => {
  res.json({
    message: "Patch from API/USERS -- Users Controller",
  });
};

const usersDelete = async (req = request, res = response) => {
  const { id } = req.params;
  // Removing the user physically from database
  //const userDeleted = await User.findByIdAndDelete(id);
  // Changing user.status(from true to false) for not losing integrity in database
  const userDeleted = await User.findByIdAndUpdate(id, { status: false });
  res.json({
    message: "delete from API/USERS -- Users Controller",
    userDeleted,
  });
};

module.exports = {
  usersGet,
  usersDelete,
  usersPatch,
  usersPut,
  usersPost,
};
