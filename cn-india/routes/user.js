const router = require("express").Router();
const resetpasswordController = require("../controllers/resetpassword");

router.post("/resetpassword", resetpasswordController.resetpassword);

module.exports = router;
