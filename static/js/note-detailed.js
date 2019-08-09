const editNoteBtn = document.querySelector("#editNoteBtn");
const deleteNoteBtn = document.querySelector("#deleteNoteBtn");

let target = document.querySelector(".card");
let targetID = Number(target.id);
// alert (typeof targetID);
alert (nts)

editNoteBtn.addEventListener("click", editNote);
deleteNoteBtn.addEventListener("click", confirmNoteDeletion);

function editNote() {
    alert("wanna change me?")
}
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
