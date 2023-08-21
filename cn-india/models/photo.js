const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Photo = new Schema({
  photoId: {
    type: String,
    required: true,
  },
  entityid: {
    type: String,
    ref: "Project",
  },
  url: {
    type: String,
  },
  // createdAt:{
  //     type:DateTime,
  // },
});

module.exports = mongoose.model("Photo", Photo);
