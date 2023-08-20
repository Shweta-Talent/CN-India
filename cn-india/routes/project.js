const router = require("express").Router();
const projectController = require("../controllers/project");
const adminMiddleware = require("../middlewares/admin");

router.post("/createproject", adminMiddleware, projectController.CreateProject);
router.post("/deleteproject", projectController.deleteProject);
router.post("/listproject", projectController.listProject);
router.post("/duplicateproject", projectController.duplicateProject);
router.post("/updateproject", projectController.updateProject);
module.exports = router;
