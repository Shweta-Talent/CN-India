const router = require("express").Router();
const projectController = require("../controllers/project");

router.post("/createproject", projectController.CreateProject);
router.post("/deleteproject", projectController.deleteProject);
router.post("/listproject", projectController.listProject);
router.post("/duplicateproject", projectController.duplicateProject);
module.exports = router;
