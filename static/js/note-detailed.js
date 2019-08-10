const editNoteBtn = document.querySelector("#editNoteBtn");
const deleteNoteBtn = document.querySelector("#deleteNoteBtn");
const returnToMain = document.querySelector("#returnToMain");

let target = document.querySelector(".card");
let targetID = Number(target.id);

editNoteBtn.addEventListener("click", editNote);
deleteNoteBtn.addEventListener("click", confirmNoteDeletion);

function confirmNoteDeletion(){

    const confirmDeletionCard = document.createElement("div");

    confirmDeletionCard.innerHTML = `
                        <div class="confirm-wrapper">
                            <div class="alert alert-info text-center text-dark">
                                <span> Точно ВИДАЛИТИ нотатку? </span>
                                <div class="row mt-3">
                                    <div class="col">
                                        <button class="btn btn-danger" id="confirmDeletionBtn"> Так, видали </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning" id="cancelDeletionBtn"> Ні, хай живе </button>
                                    </div>        
                                </div>
                            </div>
                        </div>
    `;

    document.body.appendChild(confirmDeletionCard);

    const confirmDeletionBtn = document.querySelector("#confirmDeletionBtn");
    const cancelDeletionBtn = document.querySelector("#cancelDeletionBtn");

    confirmDeletionBtn.addEventListener("click", deleteNote);
    cancelDeletionBtn.addEventListener("click", function (){document.body.removeChild(confirmDeletionCard)})
}

async function deleteNote() {

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

function editNote() {
    getEditfields()
}

function getEditfields (){
    const noteTitleContainer = document.querySelector("#noteTitleContainer");
    const  noteTitle = document.querySelector("#noteTitle");
    let originalNoteTitle = noteTitle.innerText;

    const noteTxtContainer = document.querySelector("#noteTxtContainer");
    const noteTxt = document.querySelector("#noteTxt");
    let originalNoteTxt = noteTxt.innerText;

    let editNoteTitle = document.createElement("div");
    editNoteTitle.className = "form-group";
    editNoteTitle.innerHTML = `
            <label for="note-title"> Змінити назву </label>
            <textarea class="form-control" id="note-title" rows="1"> ${originalNoteTitle} </textarea>
    `;

    let editNoteTxt = document.createElement("div");
    editNoteTxt.className = "form-group";
    editNoteTxt.innerHTML = `
           <label for="note-txt"> Змінити текст </label>
           <textarea class="form-control" id="note-txt" rows="5" > ${originalNoteTxt}</textarea> 
    `;
    console.log(originalNoteTitle);
    noteTitleContainer.removeChild(noteTitle);
    noteTitleContainer.appendChild(editNoteTitle);

    noteTxtContainer.removeChild(noteTxt);
    noteTxtContainer.appendChild(editNoteTxt);
}