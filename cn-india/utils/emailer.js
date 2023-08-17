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
    console.log("mail sent successfully");
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
      // templateId:sgConfig.TEMPLATE_ID.RESET_PASSWORD_TEMPLATE_ID,
      text: `hello ${firstName}, this is your password to login ${admin_setPassword} and to reset the password visit the following link localhost:3001/user/resetpassword`,
    };
    const awaitresult = sgMail.send(message);
    console.log("mail sent successfully");
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
    console.log("mail sent successfully");
  } catch {}
};
