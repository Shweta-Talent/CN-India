const express = require("express");
const User = require("../models/user");

exports.resetpassword = async (req, res) => {
  const {
    body: { old_password, new_password, emailId },
  } = req;
  // console.log(emailId)

  const user = await User.findOne({ emailId });
  // console.log("admin"+user.admin_setPassword)
  if (old_password === user.admin_setPassword)
    return res.send({ status: "failed", message: "similar password" });
  await user.updateOne({ password: new_password });
  await user.updateOne({ forcePasswordReset: true });
  console.log("successfull");
  // console.log(user.password)
  // return res.send({status:"success",message:"password set successfull"})
};
