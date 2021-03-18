const { Router } = require("express");
const { check } = require("express-validator");
/* const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validate-roles"); */
const { hasRole, validateFields, validateJWT, isAdminRole } = require("../middlewares");
const { isRoleValid, verifyEmail, verifyUserExistenceByID } = require("../helpers/db-validators");
const { usersGet, usersDelete, usersPut, usersPost, usersPatch } = require("../controllers/users");
const router = Router();
router.get("/", usersGet);
router.put("/:id", [check("id", "Is not a valid mongoID").isMongoId(), check("id").custom(verifyUserExistenceByID), check("role").custom(isRoleValid), validateFields], usersPut);
router.post(
  "/",
  [
    check("email", "This is not a valid email").isEmail(),
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password should have at least 6 letters").isLength({ min: 6 }),
    //check("role", "Role incorrect").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    check("email").custom(verifyEmail),
    validateFields,
  ],
  usersPost
);
router.delete("/:id", [validateJWT, hasRole("ADMIN_ROLE", "SUPER_ROLE") /* isAdminRole */, check("id", "Is not a valid mongoID").isMongoId(), check("id").custom(verifyUserExistenceByID), validateFields], usersDelete);
router.patch("/", usersPatch);

module.exports = router;
