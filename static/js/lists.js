const toHomePage = document.querySelector('#toHomePage');
const editList = document.querySelector('#editList');
const deleteList = document.querySelector('#deleteList');
const cardBody = document.querySelector('.card-body');
const cardTite = document.querySelector('.card-title').innerText;
const cardListItem = document.querySelectorAll('.list-group-item');

console.log(cardListItem);
let target = document.querySelector(".card");
let targetID = Number(target.id);

toHomePage.addEventListener('click', function () {
    window.location.href = "/";
});

editList.addEventListener('click', function () {
    editThisList();
});

deleteList.addEventListener('click', function () {
    (async function deleteList() {
        let data = {
            id: targetID
        };
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
    })();
});


/* === EDIT LIST ===*/

function editThisList() {
    // alert('Редактировать список');

    const template = `             <div class="row">
                    <div class="col">
                        <button class="btn btn-danger" id="cancelNewList">Відміна</button>
                    </div>
                    <div class="col text-right">
                        <button class="btn btn-success"  id="saveNewList">Зберегти</button>
                    </div>
                </div>
                <div class="row">
                    <div class="input-group mb-3 mt-3">
                            <input type="text" class="form-control list-title" placeholder="Вiдредагуй ім'я свого списка" value="${cardTite}">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <button class="btn btn-info" type="button" id="addNewItem">Додати пункт</button>
                        </div>
                        <input type="text" class="form-control" id="writeListItem" placeholder="Захопити світ ..." aria-describedby="button-addon1">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <ul class="list-group list-group-flush" id="listArea"></ul>
                    </div>
                </div>`;
    cardBody.innerHTML = template;
}
