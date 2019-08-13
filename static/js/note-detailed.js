const editNoteBtn = document.querySelector("#editNoteBtn");
const deleteNoteBtn = document.querySelector("#deleteNoteBtn");
const returnToMain = document.querySelector("#returnToMain");

let target = document.querySelector(".card");
let targetID = Number(target.id);

editNoteBtn.addEventListener("click", editNote);
deleteNoteBtn.addEventListener("click", confirmNoteDeletion);

function confirmNoteDeletion(){
    const confirmDeletionCard = document.createElement("div");
    confirmDeletionCard.className = "confirm-wrapper";
    let body = document.querySelector('html');
    let height = body.offsetHeight;
    confirmDeletionCard.style.height = `${height}px`;
    confirmDeletionCard.innerHTML = `<div class="alert alert-info text-center text-dark">
                                <span> Ви точно бажаєте видалити цю нотатку? </span>
                                <div class="row mt-3">
                                    <div class="col">
                                        <button class="btn btn-danger" id="confirmDeletionBtn"> Так</button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning" id="cancelDeletionBtn"> Ні</button>
                                    </div>        
                                </div>
                            </div>`;

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

    let req = await fetch (`https://fem1ns.herokuapp.com/api/notes/${targetID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
         body: JSON.stringify(data)
    });
    console.log(req);
    let answer = await req.json();
     if (answer.deleted){
        window.location.href = '/'
    }
}

function editNote() {
    getEditFields();
    getEditBtns();

    cancelChangesBtn.addEventListener("click", function () {
        confirmEditingCancellation()

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
            <label for="newTitle"> Змінити назву </label>
            <textarea class="form-control" id="newTitle" rows="1"> ${originalNoteTitle} </textarea>
    `;

    // for Text
    const noteTxtContainer = document.querySelector("#noteTxtContainer");
    const noteTxt = document.querySelector("#noteTxt");
    let originalNoteTxt = noteTxt.innerText;

    let editNoteTxt = document.createElement("div");
    editNoteTxt.className = "form-group";
    editNoteTxt.innerHTML = `
           <label for="newTxt"> Змінити текст </label>
           <textarea class="form-control" id="newTxt" rows="3" > ${originalNoteTxt}</textarea> 
    `;

    // Magic:
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

    // Magic
    leftBottomBtn.removeChild(returnToMain);
    leftBottomBtn.appendChild(cancelChangesBtn);

    rightBottomBtn.removeChild(editNoteBtn);
    rightBottomBtn.appendChild(saveChangedNoteBtn);
}

function confirmEditingCancellation(){

    const confirmEditingCard = document.createElement("div");
    confirmEditingCard.className = "confirm-wrapper";
    let body = document.querySelector('html');
    let height = body.offsetHeight;
    confirmEditingCard.style.height = `${height}px`;
    confirmEditingCard.innerHTML = `<div class="alert alert-info text-center text-dark">
                                <span>  Залишити цю сторінку без збереження? </span>
                                <div class="row mt-3">
                                    <div class="col">
                                        <button class="btn btn-danger" id="confirmEditingCancelationBtn"> Так</button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning" id="cancelEditingCancelationBtn"> Ні</button>
                                    </div>        
                                </div>
                            </div>`;

    document.body.appendChild(confirmEditingCard);

    const confirmEditingCancelationBtn = document.querySelector("#confirmEditingCancelationBtn");
    const cancelEditingCancelationBtn = document.querySelector("#cancelEditingCancelationBtn");

    confirmEditingCancelationBtn.addEventListener("click", function () {
        window.location.href = `/notes/${targetID}`
    });
    cancelEditingCancelationBtn.addEventListener("click", function (){document.body.removeChild(confirmEditingCard)})
}

async function saveChangedNote() {
    let newTitle = document.querySelector("#newTitle").value;
    let  newTxt = document.querySelector("#newTxt").value;

    let data = {
        id: targetID,
        type: "note",
        title: newTitle,
        text: newTxt,
    };

    let req = await fetch (`https://fem1ns.herokuapp.com/api/notes/${targetID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let answer = await req.json();
    if (answer.edited){
        window.location.href = '/'
    }
}