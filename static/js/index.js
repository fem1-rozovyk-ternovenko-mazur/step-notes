// Елемент списка нотаток
let notesList = document.getElementById('notesList');
console.log(notesList);

let notesList = document.getElementById('notesList');
notesList.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-body')){
        alert('tuta');
        window.location.href = `notes/${e.target.id}`
    }
} );
let checkList = document.getElementById('checkList');
console.log(checkList);

function addNote() {
    window.location.href = '/notes';
}

const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", addList);

function addList() {
    window.location.href = '/listcreate'
}

addNoteBtn.addEventListener("click", () => {
    window.location.href = '/notes';
    let id = Date.now();
    notesList.appendChild(getCardTemplate(id, "", "", true));
    getCardBody(id).setAttribute("data-created", "false")
});



// Кнопка Додати список

const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", () => {
    window.location.href = '/lists'
});