const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on ${app.get("port")}`);
});
