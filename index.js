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
// Отримання нотаток на головну сторінку

app.get("/", async (req, res)=>{
    let notes = []
    await app.db.find({}).forEach((el) => {
        notes.push(el)
    });
    res.render("index", {notes})
});

// Перехід на сторінку створення нотатки

app.get("/notes", async (req, res) => {

    res.render("create-note");
});

// Перехід на сторінку нотатки

app.get('/notes/:id', async(req, res) => {
    let nts;
    // NB! Внимательно следи в каком виде приходит критерий для поиска по базе: строкой или числом
    let targetID = Number(req.params.id);
    await app.db.find({id:targetID}).forEach((elem) => {
            nts = elem
    });
    res.render('note-detailed', {nts})
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

// Отримання списків на головну сторінку

app.get("/", async (req, res)=>{
    let lists = []
    await app.db.find({type: "list"}).forEach((el) => {
        lists.push(el)
    });
    res.render("index", {lists})
});



/* === === To-do Discrit === ===*/

// Перехід на сторінку створення списку

app.get("/lists", async (req, res) => {
    res.render("listcreate")
});
//временная ссылка на карточку со списком -- http://localhost:3000/api/lists/1565276371189
app.get("/api/lists/:id", async (req, res) => {
        let list;
        let targetID = Number(req.params.id);
    await app.db.find({id:targetID}).forEach((e) => {
            list = e;
        });
        res.render('list-detailed', {list} )
});



//Перехід на головну сторінку після збереження списка справ
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



// Перевірка роботи сервера

app.listen(port, ()=>{
    console.log("hello in console")
});
