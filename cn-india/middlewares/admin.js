const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const token = authorization.split(" ")[1];
  const decode_token = jwt.verify(token, process.env.SECRETKEY);
  if (!decode_token) throw Error("something went wrong", error);

  try {
    (req.useId = decode_token.useId),
      (req.emailId = decode_token.emailId),
      (req.userType = decode_token.userType);
    const user = await User.findOne({ emailId });
    if (userType == "cd") {
      if (user.forcePasswordReset == false)
        return res.send({ status: "failed", message: "reset password" });
    }
  } catch (error) {
    console.log(error);
  }

  next();
};
