const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Project = new Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: String,
  },
  projectName: {
    type: String,
    required: true,
  },
  internalProjectName: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
  },
  union: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
  projectLocation: {
    type: String,
  },
  releaseToTalent: {
    type: Boolean,
    default: false,
  },
  showContactInfoToTalent: {
    type: Boolean,
  },
  showNetworkToTalent: {
    type: Boolean,
  },
  showCastingAssociateToTalent: {
    type: Boolean,
  },
  showCastingAssistantToTalent: {
    type: Boolean,
  },
  showContactNumberToTalent: {
    type: Boolean,
  },
  showContantEmailToTalent: {
    type: Boolean,
  },
  cdNameContactInfo: {
    type: String,
  },
  castingAssociateContactInfo: {
    type: String,
  },
  castingAssistantContactInfo: {
    type: String,
  },
  castingPhoneNumberContactInfo: {
    type: String,
  },
  castingEmailContactInfo: {
    type: String,
  },
  networkCreativeTeam: {
    type: String,
  },
  castingAssociateCreativeTeam: {
    type: String,
  },
  castingAssistantCreativeTeam: {
    type: String,
  },
  contactPhoneNumberCreativeTeam: {
    type: String,
  },
  contactEmailCreativeTeam: {
    type: String,
  },
  projectSynopsis: {
    type: String,
  },
  projectAdditionalDetails: {
    type: String,
  },
  additionalFileLink: {
    type: String,
  },
  isPublished: {
    type: String,
  },
  isActive: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  lastModifiedAt: {
    type: Date,
  },
});
module.exports = mongoose.model("Project", Project);
