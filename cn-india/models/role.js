const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema({
  roleId: {
    type: Boolean,
    required: true,
  },
  projectId: {
    type: String,
  },
  roleName: {
    type: String,
    required: true,
  },
  internalRoleName: {
    type: String,
  },
  roleType: {
    type: String,
  },
  intendToPublishRole: {
    type: Boolean,
    default: true,
  },
  releaseRoleToBillbord: {
    type: Boolean,
    default: false,
  },
  roleLocation: {
    type: String,
  },
  payingRole: {
    type: Boolean,
    default: true,
  },
  roleRate: {
    type: String,
  },
  roleAgeInYear: {
    type: Boolean,
    default: true,
  },
  roleAgeFrom: {
    type: Number,
  },
  roleAgeTo: {
    type: Number,
  },
  roleGenderSpecified: {
    type: Boolean,
    default: false,
  },
  allowedGenders: {
    type: String,
  },
  roleEthnicAppearanceSpecified: {
    type: Boolean,
  },
  ethnicityIds: {
    type: String,
  },
  roleEthnicity: {
    type: String,
  },
  noOfTalent: {
    type: Number,
  },
  roleDescription: {
    type: String,
  },
  recommendedSkills: {
    type: String,
  },
  slidesUrl: {
    type: String,
  },
  involveSexualSituations: {
    type: Boolean,
    default: false,
  },
  involveNudity: {
    type: Boolean,
    default: false,
  },
  showAuditionLocationToTalent: {
    type: Boolean,
    default: false,
  },
  auditionLocation: {
    type: String,
  },
  fromDate: {
    type: Date,
    default: undefined,
  },
  toDate: {
    type: Date,
    default: undefined,
  },
  listOfIndividualDates: {
    type: Date,
    default: undefined,
  },
  additionalAuditionNotes: {
    type: String,
  },
  showWorkLocation: {
    type: Boolean,
    default: false,
  },
  workLocation: {
    type: String,
  },
  workFromDate: {
    type: Date,
    default: undefined,
  },
  workToDate: {
    type: Date,
    default: undefined,
  },
  workIndividualDates: {
    type: Date,
    default: undefined,
  },
  workRequirements: {
    type: String,
  },
  submissionDueBy: {
    type: Date,
    default: undefined,
  },
  submissionNotes: {
    type: String,
  },
  askPhoto: {
    type: Number,
    default: 0,
  },
  askVideo: {
    type: Number,
    default: 0,
  },
  askAudio: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.module("Role", Role);
