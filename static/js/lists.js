const toHomePage = document.querySelector('#toHomePage');
const editList = document.querySelector('#editList');
const deleteList = document.querySelector('#deleteList');
const cardBody = document.querySelector('.card-body');
const cardTitle = document.querySelector('.card-title').innerText;
const cardListItem = document.querySelectorAll('.list-text');
const card = document.querySelector(".card");
const targetID = card.id;
console.log(targetID);

toHomePage.addEventListener('click', function () {
    goToHomePage();
});

editList.addEventListener('click', function () {
    editThisList();
});

deleteList.addEventListener('click', function () {
    ifDelete();
});

//delete This List
async function deleteThisList() {
    let data = {
        id: targetID
    };
    console.log(data);
    let req = await fetch (`http://localhost:3000/api/lists/${targetID}`, {
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
};


/* === EDIT LIST ===*/
function editThisList() {
    getListTemplate();
    addNewItem.addEventListener('click', addListItem);
    listArea.addEventListener('click', editListItem);

    const deleteList = document.querySelector("#deleteListFromEdit");
    const toHomePage = document.querySelector('#toHomePageFromEdit');
    const saveEditList = document.querySelector('#saveChangedList');

    toHomePage.addEventListener('click', function () {
        ifCancel();
    });

    deleteList.addEventListener('click', function () {
        ifDelete()
    });

    saveEditList.addEventListener('click', function () {
        saveEditNote();
    });

    //save edited list
    async function saveEditNote() {
       let data = buildDataObject();
        let req = await fetch(`http://localhost:3000/api/lists/${targetID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        let answer = await req.json();
        if (answer.edited){
            goToHomePage();
        }
    }
}

//compiles a list editing template
function getListTemplate() {

    const deleteBtn = `<div class="row"><div class="col text-right"><button class="btn btn-danger mb-2" id="deleteListFromEdit">Видалити</button></div></div>`;

    const editTitle = `<div class="row"><div class="input-group mb-3 mt-3"><input type="text" class="form-control list-title" placeholder="Вiдредагуй ім'я свого списка" value="${cardTitle}"></div>`;

    const addNewItem = `<div class="input-group mb-3"><div class="input-group-prepend"><button class="btn btn-info" type="button" id="addNewItem">Додати пункт</button></div><input type="text" class="form-control" id="writeListItem" placeholder="Захопити світ ..." aria-describedby="button-addon1"></div></div>`;

    const listItems = `<div class="row"><div class="col"><ul class="list-group list-group-flush" id="listArea">${getlistItems()}</ul></div></div>`;

    const cancelBtn = `<div class="row mt-3"><div class="col"><button class="btn btn-primary" id="toHomePageFromEdit">Скасувати </button></div>`;

    const saveEditListBtn = `<div class="col text-right"><button class="btn btn-success" id="saveChangedList">Зберегти</button></div></div>`;

    cardBody.innerHTML = deleteBtn + editTitle + addNewItem + listItems + cancelBtn + saveEditListBtn;
}

//makes a list of elements
function getlistItems() {
    let sting = ``;
    cardListItem.forEach((e)=>{
        if (e.classList[1] === "crossed-text"){
            let listValue =`<li class="list-group-item item-wrap"><label class="label-wrap crossed-text"><input type="checkbox" name="check" class="mr-3" checked>${e.innerText}</label><span class="remove">X</span></li>`;
            sting += listValue;
            }else {
            let listValue =`<li class="list-group-item item-wrap"><label class="label-wrap"><input type="checkbox" name="check" class="mr-3">${e.innerText}</label><span class="remove">X</span></li>`;
        sting += listValue;
        }
    });
    return sting;
}
