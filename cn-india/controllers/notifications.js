const Project = require("../models/project");
const notification = require("../models/notification");
const User = require("../models/user");
const cron = require("node-cron");
const { reminder } = require("../utils/emailer");

exports.notification = async (req, res) => {
  try {
    const {
      body: { projectId, emailId },
    } = req;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw Error("No such email id exists");
    const notifyuser = await notification.findOne({ emailId: emailId });
    const project = await Project.findOne({ projectId: projectId });
    if (!project) throw Error("No such project exists");

    if (user.status === "blocked") return res.send("user is blocked");
    if (user.status === "inactive") return res.send("user is inactive");
    const name = user.firstName;
    if (notifyuser == null) {
      if (project && user) {
        const Notification = new notification({
          displayName: name,
          entityId: projectId,
          status: user.status,
          emailId: emailId,
          count: 3,
        });
        await Notification.save();
      }
    }
    const projectname = project.projectName;

    if (project.releaseToTalent === false) {
      if (notifyuser.count > 0) {
        const sendReminder = () => {
          return new Promise(async (resolve, reject) => {
            await reminder(name, emailId, projectname);
            const leftCount = --notifyuser.count;

            await notifyuser.updateOne({ count: leftCount });
            resolve();
          });
        };

        cron.schedule("0 0 1 * *", () => {
          sendReminder()
            .then(() => {
              console.log("Reminder email sent and resolved.");
            })
            .catch((error) => {
              console.error("Error sending reminder email:", error);
            });
        });
      } else {
        res.send("reminder sent 3 times but there was no updates from user");
      }
    }
  } catch (error) {
    reject(error);
    console.log("Error is ", error);
  }
};
