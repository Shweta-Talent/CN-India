const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notification = new Schema({
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  // status:{
  //     type
  // }
});

module.exports = mongoose.model("Notification", Notification);
