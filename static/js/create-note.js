
const cancelBtn = document.querySelector("#cancelBtn");
const saveNoteBtn = document.querySelector("#saveNoteBtn");

cancelBtn.addEventListener("click", cancelNote);
saveNoteBtn.addEventListener("click", saveNote);

function cancelNote() {
    const exitCard = document.createElement("div");
    exitCard.className = "confirm-exit-wrapper-list";
    let body = document.querySelector('html');
    let height = body.offsetHeight;
    exitCard.style.height = `${height}px`;
    exitCard.innerHTML = `<div class="alert alert-info text-center text-dark">
                                <span> Залишити цю сторінку без збереження? </span>
                                <div class="row mt-3">
                                    <div class="col">
                                        <button class="btn btn-danger" id="confirmExitBtn">Так</button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning" id="cancelExitBtn">Ні</button>
                                    </div>        
                                </div>
                        </div>`;
    document.body.appendChild(exitCard);

    const confirmExitBtn = document.querySelector("#confirmExitBtn");
    const cancelExitBtn = document.querySelector("#cancelExitBtn");

    confirmExitBtn.addEventListener('click', function(){
        window.location.href = `/`;
    });

    cancelExitBtn.addEventListener('click', function () {
       document.body.removeChild(exitCard)
    })
}

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

    if (data.text === "") { throw new Error("А смисл зберігати пусту нотатку?")}

    let req = await fetch('https://fem1ns.herokuapp.com/api/notes', {
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
