const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-cgytz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(err => {
    console.log('BD connect error: ', err);
    const collection = client.db("STEP").collection("Notes");
    app.db = collection;
});

app.use(express.static(__dirname + "/static"));

app.set("view engine", "ejs");

app.get("/", async (req, res)=>{
    res.render("index")
});

app.get("/notes", async (req, res) => {

    res.render("create-note")
});

app.get("/lists", async (req, res) => {

    res.render("create-list")
});

app.listen(port, ()=>{
    console.log("hello in console")
});
