const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Skill = new Schema({
  skillId: {
    type: String,
    required: true,
  },
  skillName: {
    type: String,
  },
});

module.exports = mongoose.model("Skill", Skill);
