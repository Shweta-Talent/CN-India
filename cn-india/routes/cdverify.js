const router = require("express").Router();

const verifyController = require("../controllers/verify");

router.post("/verifyCD", verifyController.verify);

module.exports = router;