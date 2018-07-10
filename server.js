// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(express.static('public'));

app.get("/",  (r, res) => res.sendFile(__dirname + '/src/index.html'));

var listener = app.listen(process.env.PORT, () => console.log('Your app is listening on port ' + listener.address().port))