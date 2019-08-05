

const addNoteBtn = document.querySelector("#addNoteButton");
addNoteBtn.addEventListener("click", addNote);

function addNote() {
    window.location.href = '/notes'
}

