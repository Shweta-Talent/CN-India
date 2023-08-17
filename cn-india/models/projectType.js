const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectType = new Schema({
  projectTypeId: {
    type: String,
    // required:true
  },
  projectType: {
    type: String,
  },
});

module.exports = mongoose.model("ProjectType", ProjectType);
