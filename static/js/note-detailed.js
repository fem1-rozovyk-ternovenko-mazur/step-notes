const editNoteBtn = document.querySelector("#editNoteBtn");
const deleteNoteBtn = document.querySelector("#deleteNoteBtn");
const returnToMain = document.querySelector("#returnToMain");
const card = document.querySelector(".card");
const targetID = card.id;

editNoteBtn.addEventListener("click", editNote);
deleteNoteBtn.addEventListener("click", ifDelete);

async function deleteNote() {
    let data = {
        id:targetID,
    };

    let req = await fetch (`https://note-app-tern.herokuapp.com/api/notes/${targetID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
         body: JSON.stringify(data)
    });
    console.log(req);
    let answer = await req.json();
     if (answer.deleted){
         goToHomePage();
    }
}

function editNote() {
    getEditFields();
    getEditBtns();

    cancelChangesBtn.addEventListener("click", function () {
        ifCancel()
    });

    saveChangedNoteBtn.addEventListener("click", saveChangedNote)
}

function getEditFields (){
    // for Title
    const noteTitleContainer = document.querySelector("#noteTitleContainer");
    const  noteTitle = document.querySelector("#noteTitle");
    let originalNoteTitle = noteTitle.innerText;

    let editNoteTitle = document.createElement("div");
    editNoteTitle.className = "form-group";
    editNoteTitle.innerHTML = `
            <label for="note-title"> Змінити назву </label>
            <textarea class="form-control" id="note-title" rows="1"> ${originalNoteTitle} </textarea>
    `;

    // for Text
    const noteTxtContainer = document.querySelector("#noteTxtContainer");
    const noteTxt = document.querySelector("#noteTxt");
    let originalNoteTxt = noteTxt.innerText;

    let editNoteTxt = document.createElement("div");
    editNoteTxt.className = "form-group";
    editNoteTxt.innerHTML = `
           <label for="note-text"> Змінити текст </label>
           <textarea class="form-control" id="note-text" rows="3" > ${originalNoteTxt}</textarea>`;

    noteTitleContainer.removeChild(noteTitle);
    noteTitleContainer.appendChild(editNoteTitle);

    noteTxtContainer.removeChild(noteTxt);
    noteTxtContainer.appendChild(editNoteTxt);
}

function getEditBtns() {
    const leftBottomBtn = document.querySelector("#leftBottomBtn");
    const rightBottomBtn = document.querySelector("#rightBottomBtn");

    const saveChangedNoteBtn = document.createElement("button");
    saveChangedNoteBtn.className = "btn btn-success";
    saveChangedNoteBtn.id = "saveChangedNoteBtn";
    saveChangedNoteBtn.innerText = "Зберегти";

    const cancelChangesBtn = document.createElement("button");
    cancelChangesBtn.className = "btn btn-primary";
    cancelChangesBtn.id = "cancelChangesBtn";
    cancelChangesBtn.innerText = "Скасувати";

    leftBottomBtn.removeChild(returnToMain);
    leftBottomBtn.appendChild(cancelChangesBtn);

    rightBottomBtn.removeChild(editNoteBtn);
    rightBottomBtn.appendChild(saveChangedNoteBtn);
}

//save edited note
async function saveChangedNote() {
    let data = buildDataObject();
    let req = await fetch (`https://localhost:3000/api/notes/${targetID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let answer = await req.json();
    if (answer.edited){
        goToHomePage();
    }
}
