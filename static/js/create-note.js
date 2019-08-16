
const cancelBtn = document.querySelector("#cancelBtn");
const saveNoteBtn = document.querySelector("#saveNoteBtn");

cancelBtn.addEventListener("click", ifCancel);
saveNoteBtn.addEventListener("click", saveNote );


async function saveNote() {

    let data = buildDataObject();

    if (data.text !== "" || data.title !== "") {
        
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
        }else {
        alert("А смисл зберігати пусту нотатку?")
    }

}
