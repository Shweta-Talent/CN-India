const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Union = new Schema({
  unionId: {
    type: String,
    // required:true
  },
  unionName: {
    type: string,
  },
});

module.exports = mongoose.model("Union", Union);
