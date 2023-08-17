const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateEntity = new Schema({
  entityId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    enum: ["audition", "work"],
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("DateEntity", DateEntity);
