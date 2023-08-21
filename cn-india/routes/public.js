const router = require("express").Router();
const registerController = require("../controllers/register");

router.post("/register", registerController.Register);
router.post("/login", registerController.login);

module.exports = router;
