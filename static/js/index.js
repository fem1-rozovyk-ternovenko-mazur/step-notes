

const addNoteBtn = document.querySelector("#addNoteButton");
addNoteBtn.addEventListener("click", addNote);

// Кнопка Додати нотатку

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

//Елемент списка нотаток
let checkList = document.getElementById('checkList');
console.log(checkList);
