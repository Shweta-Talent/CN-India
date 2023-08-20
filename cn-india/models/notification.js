const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notification = new Schema({
  displayName: {
    type: String,
  },
  entityId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["blocked", "active", "inactive"],
  },
  emailId: {
    type: String,
  },
  count:{
    type:String,
    default:4
  }
});

module.exports = mongoose.model("Notification", Notification);
