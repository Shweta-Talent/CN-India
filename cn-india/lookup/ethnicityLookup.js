const express = require("express");
const { v4: uuidv4 } = require("uuid");
const ethnicity = require("../models/ethnicity");

exports.addEthnicity = async (req, res) => {
  const Ethnicity = [
    {
      ethnicityId: uuidv4(),
      ethnicity: "Asian",
    },
    {
      ethnicityId: uuidv4(),
      ethnicity: "Middle Eastrn",
    },
    {
      ethnicityId: uuidv4(),
      ethnicity: "North Indian",
    },
    {
      ethnicityId: uuidv4(),
      ethnicity: "Soth Indian",
    },
  ];
  const result = await ethnicity.insertMany(Ethnicity);
};
