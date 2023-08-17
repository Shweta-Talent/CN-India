const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleType = new Schema({
  roleId: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
  },
});

module.exports = mongoose.model("RoleType", RoleType);
