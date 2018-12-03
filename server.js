const express = require("express"); //import express
const bodyParser = require("body-parser"); //parse the json data
const env = process.env.NODE_ENV || "development"; //sets the development environment
const configuration = require('./knexfile')[env]; //configure knex to the specific environment
const database = require('knex')(configuration); //inits the database with knex and configuration environment
const app = express(); //create an insance of express and assign it to the variable, app

app.use(express.static('public')); // grants access to public folder
app.use(bodyParser.json()); //use bodyparser

app.locals.title = "Juicy"; //sets the title of the server

app.set("port", process.env.PORT || 3000); //sets the port based on the environment we chose, or defaults to 3000

app.get("/api/v1/projects", (request, response) => {
  database('projects').select()
    // knex is saying select all in projects from the db
    .then((projects) => {
      response.status(200).json(projects)
    }) //if it's all good, then respond with ok status
    .catch((error) => {
      response.status(500).json({
        error
      }) //if something goes wrong, display an error
    })
});

app.post("/api/v1/projects", (request, response) => { //endpoint for the project table
  const project = request.body;
  if (!project.name) {
    //does this project have a name? If not~
    return response
      .status(422)
      .send({
        error: `Pls name this project 🍉` //if the user didn't name their project, shoot back an error. (this doesn't display on the dom and should at some point)
      })
  } else {
    database('projects').insert(project, 'id')
      //rad our project has a name, do this
      //insert a new row of the project table with two params
      .then(project => {
        response.status(201).json({
          id: project[0]
          //assign the new project an id of it's 0 index, which increments with each new project
        })
      })
      .catch(error => {
        response.status(500).json({
          error
          //display an error (not visible on dom)
        })
      })
  }
});

app.listen(app.get("port"), () => {
  console.log(`JUICYYYYYYY is running on https://localhost:${app.get("port")}`);
  //listen on the port specified. when the server starts, if it's successful (which it should be at this point), display a message that tells the user on the terminal.
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

// making an endpoint that accepts delete requests
app.delete("/api/v1/project/:project_id/palettes/:palette_id", (request, response) => {
  const palette = request.params.palette_id;
  // look @ the table for palettes
  database('palettes')
    // filter through those palettes by the id
    .where("id", palette)
    .del()
    .then(() => {
      response.status(202).json(palette);
    })
    .catch((error) => {
      response.status(500).json({
        error
      })
    })
})
// creating the endpoint for delete and it takes two params, one is the project id and the other is the palette iddoing a forEach of the palette table and comparing the id to the palette id

// del() is asynchronous if its successful delete that