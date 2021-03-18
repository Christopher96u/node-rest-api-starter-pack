const validate_fields = require("../middlewares/validate-fields");
const validate_jwt = require("../middlewares/validate-jwt");
const validate_roles = require("../middlewares/validate-roles");

module.exports = {
  ...validate_fields,
  ...validate_jwt,
  ...validate_roles,
};
