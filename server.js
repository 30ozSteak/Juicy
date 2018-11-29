const express = require("express");
const bodyParser = require("body-parser");

const env = process.env.NODE_ENV || "development";
// const configure = require("./knexfile")[env];
// const database = require("knex")(configure);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.locals.title = "Juicy";

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`JUICYYYYYYY is running on http://localhost:${app.get("port")}`);
});
