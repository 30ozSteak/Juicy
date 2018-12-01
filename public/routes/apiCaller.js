const express = require("express");
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

get("/api/v1/projects", (req, res) => {
  database('projects').select()
    // knex is saying select all in projects from the db
    .then((projects) => {
      res.status(200).json(projects)
    })
    .catch((error) => {
      res.status(500).json({
        error
      })
    })
});

post("/api/v1/projects", (req, res) => {
  const project = req.body;
  if (!project.name) {
    return res
      .status(422)
      .send({
        error: `You need a name property 💔`
      })
  } else {
    database('projects').insert(project, 'id')
      .then(project => {
        res.status(201).json({
          id: project[0]
        })
      })
      .catch(error => {
        res.status(500).json({
          error
        })
      })
  }


});

// get('/api/v1/projects/:project_id/palettes')
// post("/api/v1/:project_id/palettes", );

// delete("/api/v1/project/:project_id/palettes/:palette_id", );
// delete("/api/v1/projects/:project_id", );