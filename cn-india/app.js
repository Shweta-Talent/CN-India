const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const registerRoute=require('./routes/user')
const isAuth=require('./middlewares/isAuth')
const projectRouter=require('./routes/project')
const dataRouter=require('./routes/addData')
const publicRouter=require('./routes/public')
const resetpassword=require('./routes/user')
const verifyCD=require('./routes/cdverify')

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(dataRouter)
app.use(publicRouter)
// app.use('/',isAuth)
app.use('/admin',verifyCD)
app.use('/user',resetpassword)
app.use('/project',projectRouter)

console.log(process.env.URI);

mongoose
  .connect(process.env.URI)
  .then(() => {
   
    app.listen(process.env.PORT);
    console.log("connected");
  })
  .catch((e) => {
    console.log("error", e);
  });
