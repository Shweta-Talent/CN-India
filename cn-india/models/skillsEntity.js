const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillsEntity = new Schema({
  entityId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    enum: ["user", "role"],
  },
  skills: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SkillsEntity", SkillsEntity);
