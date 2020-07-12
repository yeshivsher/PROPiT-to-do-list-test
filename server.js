const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const PORT = 3010;
const MONGO_URI = 'mongodb://propit:Aa123456@ds147537.mlab.com:47537/propit';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos_coll;

MongoClient.connect(MONGO_URI,
    { useUnifiedTopology: true },
    function (err, db_conn) {
        todos_coll = db_conn.db("propit").collection('todos');

        // at first init of the app create collection and db.
        // var dbo = db_conn.db("mydb");
        // dbo.createCollection("todos", function(err, res) {
        //   if (err) throw err;
        //   console.log("Collection created!");
        //   db.close();
        // });
    }
);

app.get("/api", function (req, res) {
    todos_coll.find().toArray((err, todos) => {
        res.json(todos);
    })
});

app.post("/api", function (req, res) {
    const todo = { ...req.body, _id: req.body.id };

    todos_coll.insertOne(todo, (err, result) => {
        res.json({ todo })
    })
});

app.delete("/api/:id", function (req, res) {
    const objectId = new ObjectID(req.params.id);
    const myquery = { _id: objectId };

    todos_coll.deleteOne(myquery, (err, result) => {
        res.json(result);
    })
});

app.post("/api/:id", function (req, res) {
    const objectId = new ObjectID(req.params.id);
    const myquery = { _id: objectId };

    todos_coll.findOneAndUpdate(
        myquery,
        { $set: req.body },
        (err, result) => {
            res.json(result);
        })
});

app.get('/getversion', (req, res) => {
    res.send('1.0.0')
})

app.listen(PORT, err => console.info(`Todos server is running on port ${PORT}`))