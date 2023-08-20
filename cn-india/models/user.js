const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  lastModifiedAt: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  forcePasswordReset: {
    type: Boolean,
    default: false,
  },
  profilePicUrl: {
    type: String,
  },
  skills: {
    type: String,
    ref: "Skill",
  },
  verifiedStatus: {
    type: Boolean,
    default: false,
  },
  termsAndConditions: {
    type: Boolean,
    default: false,
  },
  mobileNo: {
    type: Number,
  },
  status: {
    enum: ["blocked", "active", "inactive"],
  },
  location: {
    enum: ["chennai", "banglore"],
  },
  updateOffer: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: ["talent", "cd"],
    default: "talent",
  },
  admin_setPassword: {
    type: String,
  },
});

module.exports = mongoose.model("User", User);
