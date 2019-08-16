const express = require('express');
const port = process.env.PORT || 5000;
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


// Getting documents from db to the main page
app.get("/", async (req, res)=>{
    let notes = [];
    await app.db.find({}).forEach((el) => {
        notes.push(el)
    });
    res.render("index", {notes})
});


// Creating note
app.get("/notes", async (req, res) => {

    res.render("create-note");
});


// Redirecting to the note page

app.get('/notes/:id', async(req, res) => {
    let nts;
    let targetID = Number(req.params.id);
    await app.db.find({id:targetID}).forEach((elem) => {
        nts = elem
    });
    res.render('note-detailed', {nts})
});


// Redirecting to the main pare after note's saving

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


// Deleting note

app.delete("/api/notes/:id", async (req, res) => {
    let targetID = Number(req.body.id);
    try{
        await app.db.deleteOne({id:targetID})
    } catch (err) {
        console.log(err);
    }
    res.json({deleted:true})
});


// Editing note

app.put("/api/notes/:id", async (req, res) => {
    let targetID = Number(req.body.id);
    try {
        await app.db.updateOne({id: targetID}, {
            $set: {
                title: req.body.title,
                text: req.body.text,
            }
        });
    } catch (err) {
        console.log(err);
    }
    res.json ({edited:true})
});


// Creating list

app.get("/lists", async (req, res) => {
    res.render("listcreate")
});


// Redirecting to the list's page

app.get("/lists/:id", async (req, res) => {
        let list;
        let targetID = Number(req.params.id);
    await app.db.find({id:targetID}).forEach((elem) => {
            list = elem;
        });
        res.render('list-detailed', {list} )
});


// Redirecting to the main page after list's saving

app.post("/api/lists", async (req, res) => {
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


// Deleting list

app.delete("/api/lists/:id", async (req, res) => {
    let targetID = Number(req.params.id);
    try{
        await app.db.deleteOne({id:targetID});
    } catch (err) {
        console.log(err);
    }
    res.json({deleted:true})
});

// Editing list

app.put("/api/lists/:id", async (req, res) => {
    let targetID = Number(req.body.id);
    try {
        await app.db.updateOne({id: +targetID}, {
            $set: {
                title: req.body.title,
                body: req.body.body,
            }
        });
    } catch (err) {
        console.log(err);
    }
    res.json ({edited:true})
});

// Server checking

app.listen(port, ()=>{
    console.log("hello in console")
});

