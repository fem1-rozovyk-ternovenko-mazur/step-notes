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
    // const collection = client.db("STEP").collection("ToDoList");

    app.db = collection;
    // app.db2 = collection2;

});

app.use(express.static(__dirname + "/static"));

app.set("view engine", "ejs");

// app.get("/", async (req, res)=>{
//     res.render("index")
// });

app.get("/notes", async (req, res) => {

    res.render("create-note")
});

app.get("/lists", async (req, res) => {

    res.render("listcreate")
});



app.get("/", async (req, res)=>{
    let notes = []
    await app.db.find({}).forEach((el) => {
        notes.push(el)
    });
    res.render("index", {notes})

})
//
// app.get("/", async (req, res) => {
//     let lists = []
//     await app.db2.find({}).forEach((el) => {
//         lists.push(el)
//     });
//     res.render("index", {lists})
//     // res.render("listcreate")
// });

app.listen(port, ()=>{
    console.log("hello in console")
});
