const { Router } = require("express");
const router = Router();
const { usersGet, usersDelete, usersPut, usersPost, usersPatch } = require("../controllers/users");

router.get("/", usersGet);
router.put("/:id", usersPut);
router.post("/", usersPost);
router.delete("/", usersDelete);
router.patch("/", usersPatch);

module.exports = router;
