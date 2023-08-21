const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = new Schema({
  locationId: {
    type: String,
    required: true,
    unique: true,
  },
  locationName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Location", Location);
