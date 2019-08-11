const toHomePage = document.querySelector('#toHomePage');
const editList = document.querySelector('#editList');
const deleteList = document.querySelector('#deleteList');
const cardBody = document.querySelector('.card-body');
const cardTite = document.querySelector('.card-title').innerText;
const cardListItem = document.querySelectorAll('.list-group-item')[0].innerText;

console.log(cardListItem[0].innerText);
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

    const template = `             
             <div class="row">
                <div class="col text-right">
                    <button class="btn btn-danger mb-2" id="deleteList">Видалити</button>
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
                        <ul class="list-group list-group-flush" id="listArea">
                        <li class="list-group-item item-wrap">
                        <label class="label-wrap">
                        <input type="checkbox" name="check" class="mr-3">${cardListItem}</label>
                        <span class="remove">X</span>
                        </li>
                        
</ul>
                    </div>
                </div>
             <div class="row mt-3">
                <div class="col">
                    <button class="btn btn-primary" id="toHomePage">Скасувати </button>
                </div>
                <div class="col text-right">
                    <button class="btn btn-success" id="saveChangedList">Зберегти</button>
                </div>
        </div>`;
    cardBody.innerHTML = template;
}
