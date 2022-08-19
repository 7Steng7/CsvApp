const express = require('express');
const aplication = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const cors = require('cors');
var mongoose = require("mongoose");

aplication.use(bodyParser.json());
const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000 ;
const bind = process.env.BIND ? process.env.BIND : config.app.bind ? config.app.bind : '127.0.0.1' ;

var db = "mongodb+srv://Steng:basededatos@cluster0.7zhw8.mongodb.net/csvapp";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });	// Hacemos la conexión a la base de datos de Mongo 


const { collection } = require('./modelo/mongodb');
aplication.use(cors());
const conSuccess = mongoose.connection;
conSuccess.once('open', _ => {
});

conSuccess.on('error', err => {
  console.error('connection error:', err)
});

aplication.get('/tabla', (req, res) => {
    collection.find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
  });
  //get one "tabla" collection
  aplication.get('/tabla/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ id : id})
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
  });
  //ingresar dato por parametros
  aplication.post('/tabla', (req, res) => {
    console.log("Llegó "+ req.body);
    collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
  });

// Cogemos el puerto para escuchar

aplication.listen(port,bind, function () {
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('Aplicación : '+ config.app.name);
    console.log('Corriendo en el puerto : '+ config.app.port);
    console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
});