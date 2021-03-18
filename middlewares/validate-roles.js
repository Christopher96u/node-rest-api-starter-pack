const { response, json } = require("express");

const isAdminRole = (req, res = response, next) => {
  //
  if (!req.userAuthenticated) {
    return res.status(500).json({
      message: `Token was not validated`,
    });
  }
  const { role, name } = req.userAuthenticated;
  if (role !== "ADMIN_ROLE") {
    return res.json({
      message: `${name} can't do this because doesnt have a admin_role`,
    });
  }

  next();
};
const hasRole = (...roles) => {
  //
  return (req, res = response, next) => {
    //console.log(roles);
    if (!req.userAuthenticated) {
      return res.status(500).json({
        message: `Token was not validated`,
      });
    }
    if (!roles.includes(req.userAuthenticated.role)) {
      return res.status(401).json({
        message: `${req.userAuthenticated.name} can't do this because doesnt have a required role`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
