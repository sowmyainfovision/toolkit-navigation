var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var db;

//Establish Connection
MongoClient.connect('mongodb://localhost:27017/mylib', function (err, database) {
   if (err) 
   	throw err
   else
   {
	db = database;
	console.log('Connected to MongoDB');
	app.listen(3000);
   }
 });

app.use(bodyParser.json())

  
  app.get('/getuser', function(req, res) {
    
    var coll = db.collection('usersdetailswatch');

    coll.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
          res.send(JSON.stringify(result));
          
        }
    })

  });
  
app.post('/adduser', function(req, res) {
    db.collection('usersdetailswatch').insertOne(req.body, function (err, result) {
      if (err)
         res.send('Error');
      else
        res.send('Success');

  });
});
