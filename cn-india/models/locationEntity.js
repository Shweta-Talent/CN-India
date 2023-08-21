const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationEntity = new Schema({
  entityId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    enum: ["work", "audition", "project", "role"],
  },
  locationId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("LocationEntity", LocationEntity);
