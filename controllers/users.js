const { request, response } = require("express");

const usersGet = (req = request, res = response) => {
  const { page = 1, limit } = req.query; //Optional querys
  res.json({
    message: "get from API/USERS -- Users Controller",
    page,
    limit,
  });
};
const usersPost = (req = request, res = response) => {
  const body = req.body;
  res.json({
    message: "post from API/USERS -- Users Controller",
    body,
  });
};

const usersPut = (req = request, res = response) => {
  const id = req.params.id; // Stored as String
  res.json({
    message: "put from API/USERS -- Users Controller",
    id: id,
  });
};

const usersPatch = (req = request, res = response) => {
  res.json({
    message: "Patch from API/USERS -- Users Controller",
  });
};

const usersDelete = (req = request, res = response) => {
  res.json({
    message: "delete from API/USERS -- Users Controller",
  });
};

module.exports = {
  usersGet,
  usersDelete,
  usersPatch,
  usersPut,
  usersPost,
};
