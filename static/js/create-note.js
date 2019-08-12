
const cancelBtn = document.querySelector("#cancelBtn");
const saveNoteBtn = document.querySelector("#saveNoteBtn");

cancelBtn.addEventListener("click", cancelNote);
saveNoteBtn.addEventListener("click", saveNote );


async function saveNote() {

    let id = Date.now();
    let noteTitle = document.querySelector("#note-title").value;
    let noteTxt = document.querySelector('#note-txt').value;

    let data = {
        id: id,
        type: "note",
        title: noteTitle,
        text: noteTxt,
    };

    if (data.text === "" || data.title === "") { throw new Error("А смисл зберігати пусту нотатку?")}

    let req = await fetch('http://localhost:3000/api/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    let answer = await req.json();
    if (answer.created){
        window.location.href = '/'
    }
}
