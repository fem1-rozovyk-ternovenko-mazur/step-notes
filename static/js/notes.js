
const cancelBtn = document.querySelector("#cancelBtn");
const saveNoteBtn = document.querySelector("#saveNoteBtn");

const exitCard = document.createElement("div");
exitCard.innerHTML = `
<div class="confirm-exit-wrapper">
    <div class="alert alert-info text-center text-dark">
        <span> Точно НЕ ЗБЕРІГАТИ нотатку? </span>
        <div class="row mt-3">
            <div class="col">
                <button class="btn btn-danger" id="confirmExitBtn"> Так, хочу просто піти </button>
            </div>
            <div class="col">
                <button class="btn btn-warning" id="cancelExitBtn"> Ні, доробити нотатку </button>
            </div>        
        </div>
    </div>
</div>
`;

cancelBtn.addEventListener("click", cancelNote);
saveNoteBtn.addEventListener("click", saveNote);


function cancelNote() {
    document.body.appendChild(exitCard);
}
function saveNote(e) {
    let id = e.target.id;
    alert(`ti zhmiaknul na ${id}, sho nada`);
    console.log(`${id} nazhali, gho nada`);
    window.location.href = `/`;
}