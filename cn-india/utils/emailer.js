const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API);
const sgConfig = require("../config/sgConfig");

exports.welcome = async (emailId, firstName) => {
  try {
    const message = {
      to: emailId,
      from: sgConfig.FROM_EMAIL,
      templateId: sgConfig.TEMPLATE_ID.WELCOME_EMAIL_TEMPLATE_ID,
      dynamicTemplateData: {
        Name: firstName,
      },
    };
    const awaitresult = sgMail.send(message);
  } catch (error) {
    console.log(error);
  }
};

exports.verifymail = async (emailId, firstName, admin_setPassword) => {
  try {
    const message = {
      to: emailId,
      from: sgConfig.FROM_EMAIL,
      subject: "email verification",

      text: `hello ${firstName}, this is your password to login ${admin_setPassword} and to reset the password visit the following link localhost:3001/user/resetpassword`,
    };
    const awaitresult = sgMail.send(message);
  } catch (error) {
    console.log(error);
  }
};

exports.resetpassword = async (emailId, firstName) => {
  try {
    const message = {
      to: emailId,
      from: sgConfig.FROM_EMAIL,
      templateId: sgConfig.TEMPLATE_ID.RESET_PASSWORD_TEMPLATE_ID,
      dynamicTemplateData: {
        Name: firstName,
      },
    };
    const awaitresult = sgMail.send(message);
  } catch (error) {
    console.log(error);
  }
};

exports.reminder = async (name,emailId, project) => {
  try {
    const message = {
      to: emailId,
      from: sgConfig.FROM_EMAIL,
      subject: "Reminder to publish your project",

      text: `Hello ${name},\n\nThis is a friendly reminder to publish your project "${project}".\n\nBest regards `,
    };
    const awaitresult = sgMail.send(message);
  } catch (error) {
    console.log(error);
  }
};
