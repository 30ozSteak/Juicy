const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.locals.title = "Juicy";

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running ${app.get("port")}`);
});
