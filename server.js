const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

const port = 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oskdg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.get('/', (req, res) => {
  res.send(['database', 'working', 'properly']);
});


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("doctorsPortal").collection("appointments");
  app.post('/addAppointment', (req, res) => {
    const appointment = req.body;
    appointmentCollection.insertOne(appointment)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  });

  app.get('/appointments' , (req, res) => {
    appointmentCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })
  
  app.post('/appointmentsByDate', (req, res) => {
    const date = req.body;
    appointmentCollection.find({ date: date.date })
      .toArray((err, documents) => {
        res.send(documents)
      })
  });


});



app.listen(process.env.PORT || port);