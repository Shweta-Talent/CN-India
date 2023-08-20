const router = require("express").Router();
const location = require("../lookup/locationLookup");
const skill = require("../lookup/requireSkillLookup");
const ethnicity = require("../lookup/ethnicityLookup");
const gender = require("../lookup/genderLookup");

router.post("/addlocation", location.addLocation);
router.post("/addskills", skill.addRequiredSkills);
router.post("/addethnicity", ethnicity.addEthnicity);
router.post("/addgender", gender.addGender);
module.exports = router;
