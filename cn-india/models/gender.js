const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Gender = new Schema({
  genderId: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Gender", Gender);
