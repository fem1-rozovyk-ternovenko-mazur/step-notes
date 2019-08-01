const saveNoteBtn = document.querySelector("saveNoteBtn");
saveNoteBtn.addEventListener("click", saveNote);

function saveNote(e) {
    let id = e.target.id;
    alert(`ti zhmiaknul na ${id}, sho nada`);
    console.log(`${id} nazhali, gho nada`);
    window.location.href = `/${id}`
}