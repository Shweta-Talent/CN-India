const express = require("express");
const User = require("../models/user");
var generator = require("generate-password");
const { resetpassword, verifymail } = require("../utils/emailer");

exports.verify = async (req, res) => {
  const {
    body: { emailId },
  } = req;
  if (!emailId) throw Error("enter email");

  try {
    const user = await User.findOne({ emailId });
    if (!user) throw Error("user not found");

    await user.updateOne({ emailId }, { verifiedStatus: true });
    const admin_setPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    await user.updateOne({ admin_setPassword: admin_setPassword });

    await user.updateOne({ forcePasswordReset: true });
    await user.updateOne({ verifiedStatus: true });
    await verifymail(emailId, user.firstName, admin_setPassword);
  } catch (error) {
    console.log(error);
  }
};
