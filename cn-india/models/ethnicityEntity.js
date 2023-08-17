const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EthnicityEntity = new Schema({
  entityId: {
    type: String,
    required: true,
  },

  enthnicityId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("EthnicityEntity", EthnicityEntity);
