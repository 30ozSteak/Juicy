const express = require("express");
const bodyParser = require("body-parser");
const env = process.env.NODE_ENV || "development";
const configuration = require('./knexfile')[env];
const database = require('knex')(configuration);

const app = express();

app.use(express.static('public'));
// grants access to public folder
app.use(bodyParser.json());

app.locals.title = "Juicy";

app.set("port", process.env.PORT || 3000);

app.get("/api/v1/projects", (request, response) => {
  database('projects').select()
    // knex is saying select all in projects from the db
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json({
        error
      })
    })
});

app.post("/api/v1/projects", (request, response) => {
  const project = request.body;
  console.log('help pls');
  if (!project.name) {
    return response
      .status(422)
      .send({
        error: `You need a name property 💔`
      })
  } else {
    database('projects').insert(project, 'id')
      .then(project => {
        response.status(201).json({
          id: project[0]
        })
      })
      .catch(error => {
        response.status(500).json({
          error
        })
      })
  }
});

app.listen(app.get("port"), () => {
  console.log(`JUICYYYYYYY is running on https://localhost:${app.get("port")}`);
});

// get('/api/v1/projects/:project_id/palettes')
// post("/api/v1/:project_id/palettes", );

// delete("/api/v1/project/:project_id/palettes/:palette_id", );
// delete("/api/v1/projects/:project_id", );