const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ethnicity = new Schema({
  ethnicity: {
    type: String,
    required: true,
  },
  ethnicityId: {
    type: String,
  },
});

module.exports = mongoose.model("Ethnicity", Ethnicity);
