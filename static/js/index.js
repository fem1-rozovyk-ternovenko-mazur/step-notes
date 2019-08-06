

const addNoteBtn = document.querySelector("#addNoteButton");
addNoteBtn.addEventListener("click", addNote);

function addNote() {
    window.location.href = '/notes'
}

const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", addList);

function addList() {
    window.location.href = '/listcreate'
}



//Елемент списка нотаток
let notesList = document.getElementById('notesList');
// console.log(notesList);

// Кнопка Додати список справ
// let addList = document.getElementById('addListButton');

//Елемент списка нотаток
let checkList = document.getElementById('checkList');
console.log(checkList);
