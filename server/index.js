const express = require('express');
const parser = require('body-parser');
const axios = require('axios');
const db = require('../database/index.js');
const API_KEY = require('../config.js');
const github = require('../helpers/github.js');
let app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.username, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      for (var i = 0; i < result.length; i++) {
        db.save(result[i]);
      }
      res.status(201).end();
    }
  })
  //// AXIOS.GET METHOD ////
  // axios.get(`https://api.github.com/users/${req.body.username}/repos`)
    // .then(response => {
    //   for (var i = 0; i < response.data.length; i++) {
    //     db.save(response.data[i]);
    //   }
    //   res.status(201).end();
    // })
    // .catch(error => {
    //   console.error(error);
    // });
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  console.log('in get');
  db.get(function(error, data) {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(data);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

