const toHomePage = document.querySelector('#toHomePage');
const editList = document.querySelector('#editList');
const deleteList = document.querySelector('#deleteList');
const cardBody = document.querySelector('.card-body');
const cardTitle = document.querySelector('.card-title').innerText;
const cardListItem = document.querySelectorAll('.list-group-item');

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
    deleteThisList();
});


//Удалить заметку
async function deleteThisList() {
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
};


/* === EDIT LIST ===*/

function editThisList() {
    getListTemplate();
    const deleteList = document.querySelector("#deleteListFromEdit");
    const toHomePage = document.querySelector('#toHomePageFromEdit');
    //На главную, снова
    toHomePage.addEventListener('click', function () {
        console.log("ИДи на главную СУКА");
        window.location.href = "/";
    });

    //Удалить список, снова
    deleteList.addEventListener('click', function () {
        deleteThisList();
    });

    //сохранить измененный список, новое

}

function getListTemplate() {

    const deleteBtn = `<div class="row"><div class="col text-right"><button class="btn btn-danger mb-2" id="deleteListFromEdit">Видалити</button></div></div>`;

    const editTitle = `<div class="row"><div class="input-group mb-3 mt-3"><input type="text" class="form-control list-title" placeholder="Вiдредагуй ім'я свого списка" value="${cardTitle}"></div>`;

    const addNewItem = `<div class="input-group mb-3"><div class="input-group-prepend"><button class="btn btn-info" type="button" id="addNewItem">Додати пункт</button></div><input type="text" class="form-control" id="writeListItem" placeholder="Захопити світ ..." aria-describedby="button-addon1"></div></div>`;

    const listItems = `<div class="row"><div class="col"><ul class="list-group list-group-flush" id="listArea">${getlistItems()}</ul></div></div>`;

    const cancelBtn = `<div class="row mt-3"><div class="col"><button class="btn btn-primary" id="toHomePageFromEdit">Скасувати </button></div>`;

    const saveEditListBtn = `<div class="col text-right"><button class="btn btn-success" id="saveChangedList">Зберегти</button></div></div>`;

    cardBody.innerHTML = deleteBtn + editTitle + addNewItem + listItems + cancelBtn + saveEditListBtn;
}

//формируеут список элементов
function getlistItems() {
    let sting = ``;
    cardListItem.forEach((e)=>{
        let listValue =`<li class="list-group-item item-wrap"><label class="label-wrap"><input type="checkbox" name="check" class="mr-3">${e.innerText}</label><span class="remove">X</span></li>`;
        sting += listValue;
    });
    return sting;
};
