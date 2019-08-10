const toHomePage = document.querySelector('#toHomePage');
const editList = document.querySelector('#editList');
const deleteList = document.querySelector('#deleteList');
let target = document.querySelector(".card");
let targetID = target.id;
toHomePage.addEventListener('click', function () {
    window.location.href = "/";
});

editList.addEventListener('click', function () {
    alert('Редактировать список');
});

deleteList.addEventListener('click', function () {
    confirmNoteDeletion();
});


function confirmNoteDeletion(){

    const confirmDeletionCard = document.createElement("div");
    confirmDeletionCard.className = "confirm-exit-wrapper-list";
    let body = document.querySelector('body');
    let height = body.offsetHeight;
    console.log(height);
    confirmDeletionCard.style.height = `${height}px`;
    confirmDeletionCard.innerHTML = `<div class="alert alert-info text-center text-dark">
                                <span> Точно ВИДАЛИТИ нотатку? </span>
                                <div class="row mt-3">
                                    <div class="col">
                                        <button class="btn btn-danger" id="confirmDeletionBtn"> Так, видали </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning" id="cancelDeletionBtn"> Ні, хай живе </button>
                                    </div>        
                                </div>
                            </div>`;

    document.body.appendChild(confirmDeletionCard);

    const confirmDeletionBtn = document.querySelector("#confirmDeletionBtn");
    const cancelDeletionBtn = document.querySelector("#cancelDeletionBtn");

    confirmDeletionBtn.addEventListener("click", deleteThisList);
    cancelDeletionBtn.addEventListener("click", function (){document.body.removeChild(confirmDeletionCard)})
}

async function deleteThisList() {
    let data = {
        id: targetID
    };
    console.log(data);
    console.log(data);
    let req = await fetch (`http://localhost:3000/api/lists/${targetID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let answer = await req.json();
    console.log(answer);
    if (answer.deleted){
        window.location.href = '/'
    }
}
