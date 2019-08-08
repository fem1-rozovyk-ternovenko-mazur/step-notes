// Елемент списка нотаток
let notesList = document.getElementById('notesList');
// console.log(notesList);

let checkList = document.getElementById('checkList');
// console.log(checkList);

function addNote() {
    window.location.href = '/notes';
}

const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", addList);

function addList() {
    window.location.href = '/listcreate'
}

const addNoteBtn = document.querySelector ('#addNoteButton')
addNoteBtn.addEventListener("click", () => {
    window.location.href = '/notes';
});


// Кнопка Додати список

// const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", () => {
    window.location.href = '/lists'
});

// Перехід на нотатку по кліку


const cardItem = document.getElementById('notesList');
// console.log(cardItem);
let cardToRedirect = '.card-body, .card-title, .card-text';
cardItem.addEventListener('click',  function(e) {
    let id = e.target.dataset.id;
    if(e.target.matches(cardToRedirect)){
        console.log(id);

        window.location.href = `/notes/${id}`
    }
});

