var express = require('express');
var serveStatic = require('serve-static');
var axios = require('axios');

var PORT = process.env.PORT || 8000;
var HOST = 'https://saucer-api.herokuapp.com'
var app = express();

app.use(serveStatic(__dirname + '/public'));
app.use(serveStatic(__dirname + '/build'));
app.use(serveStatic(__dirname));

app.get('/nearby', function (req, res) {
  axios.get(HOST + '/nearby', {
    params: req.query
  }).then(function (resp) {
    res.send(resp.data);
  });
});

app.get('/stores/:slug', function (req, res) {
  axios.get(HOST + '/stores/' + req.params.slug +'/beers').then(function (resp) {
    res.send(resp.data);
  });
});

app.get('/beers/:id', function (req, res) {
  axios.get(HOST + '/beers/' + req.params.id).then(function (resp) {
    res.send(resp.data);
  });
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
