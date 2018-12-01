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
  if (!project.name) {
    return response
      .status(422)
      .send({
        error: `Pls name this project 🍉`
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

app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes)
    })
    .catch((error) => {
      response.status(500).json({
        error
      })
    })
})

app.post("/api/v1/:project_id/palettes", (request, response) => {
  const palette = request.body;
  if (!palette.name) {
    return response
      .status(422)
      .send({
        error: `Pls name this juicy palette 🍉`
      })
  }
});

// delete("/api/v1/project/:project_id/palettes/:palette_id", );