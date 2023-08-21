const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { welcome } = require("../utils/emailer");
const { v4: uuidv4 } = require("uuid");

exports.Register = async (req, res) => {
  const {
    body: {
      firstName,
      lastName,
      emailId,
      mobileNo,
      password,
      termsAndConditions,
      location,
      updateOffer,
      userType,
    },
  } = req;

  try {
    if (!emailId || !password || !mobileNo || !location || !firstName) {
      return res
        .status(500)
        .send({ status: "Failed", message: "Something is left to be filled" });
    }
    if (termsAndConditions == false) {
      return res.send({
        status: "failed",
        message: "Need to agree to terms and condition",
      });
    }

    const result = await User.findOne({ emailId });
    if (result) throw Error("user exist");

    const user = new User({
      userId: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      mobileNo: mobileNo,
      termsAndConditions: termsAndConditions,
      location: location,
      updateOffer: updateOffer,
      password: password,
      userType: userType,
    });
    const hashedPassword = bcrypt.hashSync(password, 10);

    user.passwordHash = hashedPassword;
    const data = await user.save();

    await welcome(emailId, firstName);
    return res.send({
      status: "success",
      message: "User Created Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const {
    body: { emailId, password },
  } = req;
  if (!emailId || !password) throw Error("email and password are required");
  try {
    const user = await User.findOne({ emailId });
    if (!user) throw Error("no user found");
    const result = bcrypt.compare(password, user.passwordHash);
    if (!result) throw Error("password incorrect");

    if (user.status == "blocked")
      return res.send({
        status: 400,
        message: "you are blocked contact support team",
      });
    if ((user.userType == "cd") & (user.verifiedStatus == false))
      return res.send({ status: 400, message: "verify your account" });
    if (user.forcePasswordReset == false)
      return res.send({ status: 400, message: "reset your password" });
    console.log(user.userId);
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now) / 1000 + 60 * 60,
        userType: user.userType,
        emailId,
        useId: user.userId,
      },
      process.env.SECRETKEY
    );

    return res.send({ status: "success", message: "login successfull" });
  } catch (error) {
    console.log(error);
  }
};
