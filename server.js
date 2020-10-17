const express = require("express");
require("./src/db/mongoose");
const cityRoute = require("./src/routes/city");
const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
app.use(express.json());
app.use(express.static(process.cwd() + "/frontend/dist/sms-challenge"));
app.use("/city", cityRoute);

app.listen(port, () => {
  console.log("Server started at port " + port);
});
