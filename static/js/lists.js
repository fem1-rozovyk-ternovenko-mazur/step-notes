const toHomePage = document.querySelector('#toHomePage');
const editList = document.querySelector('#editList');
const deleteList = document.querySelector('#deleteList');
const cardBody = document.querySelector('.card-body');
const cardTitle = document.querySelector('.card-title').innerText;
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

    //clearInputItem()
    addNewItem.addEventListener('click', function () {
        let valueListItem = document.querySelector('#writeListItem').value;
        let li = document.createElement('li');
        let checkbox = document.createElement("input");
        let listText = document.createTextNode(valueListItem);
        let label = document.createElement('label');
        let spanRemove = document.createElement('span');
        li.className = "list-group-item item-wrap";
        label.className = 'label-wrap';
        checkbox.type = 'checkbox';
        checkbox.name = 'check';
        checkbox.className = 'mr-3';
        spanRemove.className = "remove";
        spanRemove.innerText = "X";
        label.appendChild(checkbox);
        label.appendChild(listText);
        li.appendChild(label);
        li.appendChild(spanRemove);
        if (valueListItem === ""){
            alert("Порожній рядок не можна вносити!")
        }else{
            listArea.appendChild(li);
        }
        clearInputItem();
    });

    listArea.addEventListener('click', function (e) {
        let target = e.target;
        if (target.className === "remove"){
            target.parentElement.remove();
        }else {
            const checkbox = document.querySelectorAll('input[type = checkbox]');
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].onchange = function () {
                    if (this.checked != true) {
                        this.labels[0].className ="label-wrap";
                    } else {
                        this.labels[0].className ="label-wrap crossed-text ";
                    }
                }

            }
        }
    });


    const deleteList = document.querySelector("#deleteListFromEdit");
    const toHomePage = document.querySelector('#toHomePageFromEdit');
    const saveEditList = document.querySelector('#saveChangedList');


    //На главную, снова
    toHomePage.addEventListener('click', function () {
        window.location.href = "/";
    });

    //Удалить список, снова
    deleteList.addEventListener('click', function () {
        deleteThisList();
    });

    //сохранить измененный список, новое
    saveEditList.addEventListener('click', function () {
        saveEditNote();
    });


    //формирование объекта отредактированной карточки
    async function saveEditNote() {
        let id = targetID;
        let listTitle = document.querySelector(".list-title").value;
        let listItem = [];
        let listArea = document.querySelectorAll('.label-wrap');

        for(let i=0; i<listArea.length; i++){
            let temp ={};
            let textItem = listArea[i].textContent;
            let check = listArea[i].firstChild.checked;
            temp.todo =  textItem;
            temp.check =  check;
            listItem.push(temp);
        }
        sortByStatus(listItem);
        let data = {
            id: id,
            type: "list",
            title: listTitle,
            body: listItem,
        };
        console.log(data);
        let req = await fetch(`http://localhost:3000/api/lists/${targetID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        let answer = await req.json();
        if (answer.edited){
            window.location.href = '/'
        }
    }
}


//делает страшные дела.
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
        if (e.classList.contains("crossed-text")){
            let listValue =`<li class="list-group-item item-wrap"><label class="label-wrap crossed-text"><input type="checkbox" name="check" class="mr-3" checked>${e.innerText}</label><span class="remove">X</span></li>`;
            sting += listValue;
            }else {
            let listValue =`<li class="list-group-item item-wrap"><label class="label-wrap"><input type="checkbox" name="check" class="mr-3">${e.innerText}</label><span class="remove">X</span></li>`;
        sting += listValue;}
    });
    return sting;
};


function clearInputItem() {
    console.log("Почистил. Не беспокойся бро");
    document.querySelector('#writeListItem').value = null;
}

// отмеченные пункты списка показывай внизу списка
function sortByStatus(e){
    e.sort(compare);
}

function compare( a, b ) {
    if ( a.check < b.check ){
        return -1;
    }
    if ( a.check > b.check ){
        return 1;
    }
    return 0;
}
