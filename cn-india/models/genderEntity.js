const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenderEntity = new Schema({
  entityId: {
    type: String,
    required: true,
  },

  genderId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("GenderEntity", GenderEntity);
