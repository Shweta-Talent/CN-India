const express = require("express");
const User = require("../models/user");
var jwt = require("jsonwebtoken");

module.exports = async (req, res,next) => {
  const authorization = req.get("Authorization");
  const token = authorization.split(' ')[1];
  // console.log(token)
 
  const decode_token = jwt.decode(token, "mysecretkey");
  console.log(decode_token)
  if (!decode_token) throw Error("something went wrong");
  const { userType, emailId,userId } = decode_token;

  try {
    const user = await User.findOne({ emailId });
    if (userType == "cd")
      if (user.forcePasswordReset == false)
        return res.send({ status: "failed", message: "reset password" });

     
       
      } catch (error) {
    console.log(error)
  }
  next();
};
