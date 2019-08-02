
const cancelBtn = document.querySelector("#cancelBtn");
const saveNoteBtn = document.querySelector("#saveNoteBtn");


cancelBtn.addEventListener("click", cancelNote);
saveNoteBtn.addEventListener("click", saveNote);


function cancelNote() {

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

function saveNote(e) {
    let id = e.target.id;
    alert(`ti zhmiaknul na ${id}, sho nada`);
    console.log(`${id} nazhali, gho nada`);
    window.location.href = `/`;
}