const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkInfo = new Schema({
  workInfoId: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
  },
  toDate: {
    type: Date,
  },
  listOfIndividualDate: {
    type: Date,
  },
  showWorkToTalent: {
    type: Boolean,
    default: false,
  },
  wordLocation: {
    tye: String,
    ref: "Location",
  },
  wordrequirements: {
    type: String,
  },
});

module.exports = mongoose.model("WorkInfo", WorkInfo);
