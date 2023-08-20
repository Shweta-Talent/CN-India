const express = require("express");
const Location = require("../models/location");
const { v4: uuidv4 } = require("uuid");

exports.addLocation = async (req, res) => {
  const Locations = [
    {
      locationId: uuidv4(),
      locationName: "Surat",
    },
    {
      locationId: uuidv4(),
      locationName: "Chennai",
    },
    {
      locationId: uuidv4(),
      locationName: "Mumbai",
    },
    {
      locationId: uuidv4(),
      locationName: "Bangalore",
    },
  ];
  const result = await Location.insertMany(Locations);
};
