// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb').MongoClient;
var code;
var murl = process.env.murl;
var request = require('superagent');
var access_token;
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
//MAKE SECRET PRIVATE!!
app.use('/user/signin/callback', function(req, res){
  console.log(req.query.code);
  code = req.query.code;
  request.post("https://github.com/login/oauth/access_token").send({client_id: 'ae787f0e81feb988c955', client_secret:'cecc6b37564be974641d8308b4160cb88e5c41c0', code: code}).end((err, result) => {
    // Calling the end function will send the request
    console.log(JSON.stringify(result.text));
    access_token = result.text.split('&')[0].substring(13);
    res.redirect('https://booktrading.glitch.me/user');
    return access_token;
  });
});

app.get('/user', function(req, res){
  request.get('https://api.github.com/user').set('Authorization', 'token ' + access_token).end((err, resolve) => {
    res.render('logged-in', {'info': resolve.body});
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
