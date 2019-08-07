const addNoteBtn = document.querySelector("#addNoteButton");
const addListBtn = document.querySelector("#addListButton");
let notesList = document.getElementById('notesList');
let checkList = document.getElementById('checkList');
const cardItem = document.getElementById('notesList');

addNoteBtn.addEventListener("click", addNote);
addListBtn.addEventListener("click", addList);
cardItem.addEventListener('click', showCard );

function addNote() {
    window.location.href = '/notes';
}

function addList() {
    window.location.href = '/listcreate'
}

function showCard(e) {
    let cardToRedirect = '.card-body, .card-title, .card-text';
    let id = e.target.dataset.id;
    if(e.target.matches(cardToRedirect)){
        console.log(id);
        window.location.href = `note/:${id}`
    }
}