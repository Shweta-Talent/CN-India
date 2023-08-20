const router = require("express").Router();

const verifyController = require("../controllers/verify");
const notification = require("../controllers/notifications");

router.post("/verifyCD", verifyController.verify);
router.post("/notification", notification.notification);

module.exports = router;
