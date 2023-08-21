const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const registerRoute = require("./routes/user");
const adminRoute = require("./middlewares/admin");
const projectRouter = require("./routes/project");
const dataRouter = require("./routes/addData");
const publicRouter = require("./routes/public");
const resetpassword = require("./routes/user");
const verifyCD = require("./routes/admin");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(dataRouter);
app.use(publicRouter);
app.use("/", adminRoute);
app.use("/admin", verifyCD);
app.use("/user", resetpassword);
app.use("/project", projectRouter);

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((e) => {
    console.log("error", e);
  });
