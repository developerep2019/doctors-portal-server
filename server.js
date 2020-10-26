const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;
const uri = "mongodb+srv://<username>:<password>@cluster0.oskdg.mongodb.net/<dbname>?retryWrites=true&w=majority";

app.get('/' , (req, res) => {
    res.send(['database' , 'working' , 'properly']);
});


const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  
  client.close();
});



app.listen(process.env.PORT || port);