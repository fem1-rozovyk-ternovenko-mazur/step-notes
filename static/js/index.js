// Елемент списка нотаток
let notesList = document.getElementById('notesList');
console.log(notesList);

// Кнопка Додати нотатку

const addNoteBtn = document.querySelector("#addNoteButton");

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
