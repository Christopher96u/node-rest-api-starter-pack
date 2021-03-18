const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router();
router.post("/login", [check("email", "Email is required for auth").isEmail(), check("password", "Password is required for auth").not().isEmpty(), validateFields], login);

module.exports = router;
