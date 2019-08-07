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
    let notes = []
    await app.db.find({}).forEach((elem) => {
        notes.push(elem)
    });

    res.render("index", {notes})
    // app.db.find({})
    // res.render("index")
});

app.get("/notes", async (req, res) => {

    res.render("create-note");
});


app.get("/lists", async (req, res) => {

    res.render("listcreate")
});

app.post("/api/notes", async (req, res) => {
    console.log(req.body);

app.get("/", async (req, res)=>{
    let notes = []
    await app.db.find({}).forEach((el) => {
        notes.push(el)
    });
    res.render("index", {notes})

});

// Перехід на сторінку нотатки

app.get('/note/:id', async(req, res) => {
    let note = [];
    await app.db.find({}).forEach((el) => {
        return note.push(el)
    });
    res.render('note', {note})
});

// Перехід на головну сторінку після збереження нотатки

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
