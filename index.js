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

    let notes = [];
    await app.db.find({}).forEach((elem) => {
        if (elem.type === 'note'){
            notes.push(elem)
        }
    });
    res.render("index", {notes})
});

app.get("/notes", async (req, res) => {
    res.render("create-note");
});

app.get("/listcreate", async (req, res) => {
    res.render ("listcreate");
});

app.get("note/:id", async (req, res) => {
    let nts;
    await app.db.find({id:req.params.id}).forEach((el) => {
        nts = el
    }) ;
    res.render('note-detailed', {nts})
});

app.post("/api/notes", async (req, res) => {
    console.log(req.body);

    try {
        await app.db.insertOne({
            ...req.body,
        })
    } catch (err) {
        console.log(err);
    }
    res.json({created:true})
});

app.listen(port, ()=>{
    console.log("hello in console")
});
