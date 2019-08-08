const editNoteBtn = document.querySelector("#editNoteBtn");
const deleteNoteBtn = document.querySelector("#deleteNoteBtn");

let target = document.querySelector(".card");
let targetID = Number(target.id);
alert (typeof targetID)


editNoteBtn.addEventListener("click", editNote);
deleteNoteBtn.addEventListener("click", deleteNote);

function editNote() {
    alert("wanna change me?")
}

async function deleteNote() {
    alert("wanna get rid of me? " + targetID);

    let data = {
        id: targetID
    };

    let req = await fetch (`http://localhost:3000/api/notes/${targetID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
         body: JSON.stringify(data)
    });
    let answer = await req.json();
    if (answer.deleted){
        window.location.href = '/'
    }
}
