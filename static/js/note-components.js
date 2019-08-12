//directs to the Home page ===/*===DUBLICATE===*/===

function goToHomePage() {
    window.location.href = "/";
}

// modal window if you want to exit without saving
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
        goToHomePage();
    });

    cancelExitBtn.addEventListener('click', function () {
        document.body.removeChild(exitCard)
    })
}
