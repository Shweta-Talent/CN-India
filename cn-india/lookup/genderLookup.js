const express = require("express");
const gender = require("../models/gender");
const { v4: uuidv4 } = require("uuid");

exports.addGender = async (req, res) => {
  const Gender = [
    {
      genderId: uuidv4(),
      gender: "Male",
    },
    {
      genderId: uuidv4(),
      gender: "Female",
    },
    {
      genderId: uuidv4(),
      gender: "Non-Binary Person",
    },
    {
      genderId: uuidv4(),
      gender: "Trans Gender",
    },
  ];
  const result = await gender.insertMany(Gender);
};
