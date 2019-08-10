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

const addNoteBtn = document.querySelector ('#addNoteButton');
addNoteBtn.addEventListener("click", () => {
    window.location.href = '/notes';
});


// Кнопка Додати список

// const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", () => {
    window.location.href = '/lists'
});

// Перехід на нотатку/список по кліку


const cardItem = document.getElementById('notesList');

cardItem.addEventListener('click', function (e) {
    let target = e.target.closest('.card');
    // console.log(target);
    if (target.dataset.type === "note") {

        let id = e.target.dataset.id;
            window.location.href = `/notes/${id}`
    }

    if (target.dataset.type === "list") {

        let id = e.target.dataset.id;
        console.log(id);
            window.location.href = `/lists/${id}`
    }
});
