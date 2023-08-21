const express = require("express");
const User = require("../models/user");

exports.resetpassword = async (req, res) => {
  const {
    body: { old_password, new_password, emailId },
  } = req;

  const user = await User.findOne({ emailId });

  if (old_password === user.admin_setPassword)
    return res.send({ status: "failed", message: "similar password" });
  await user.updateOne({ password: new_password });
  await user.updateOne({ forcePasswordReset: true });
};
