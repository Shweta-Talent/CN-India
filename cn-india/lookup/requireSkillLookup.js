const express = require("express");
const { v4: uuidv4 } = require("uuid");
const skillModel = require("../models/skills");

exports.addRequiredSkills = async (req, res) => {
  const SkillsList = [
    {
      skillId: uuidv4(),
      skillName: "Dance",
    },
    {
      skillId: uuidv4(),
      skillName: "Swim",
    },
    {
      skillId: uuidv4(),
      skillName: "Play",
    },
    {
      skillId: uuidv4(),
      skillName: "Workout",
    },
  ];
  const result = await skillModel.insertMany(SkillsList);
};
