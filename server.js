// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb').MongoClient;
var murl = process.env.murl;
/*function listBooks(res){
  mongo.connect(murl, { useNewUrlParser: true }, function(err, client){
      if (err) throw err;
      var db = client.db('bookstorage');
      var books = db.collection('books');
      books.find().toArray(function(err, documents){
        if (err) throw err;
        for (var i = 0; i < documents.length; i++){
        }
      });
      client.close();
      res.render('index');
    });
}*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render('index');
});
app.get("/addbook", function (request, response) {
  response.render('addbook');
});
app.get("/trades", function (request, response) {
  response.render('addbook');
});
app.get("/profile", function (request, response) {
  response.render('profile');
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
