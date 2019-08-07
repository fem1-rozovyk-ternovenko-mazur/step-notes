const cancelNewList = document.querySelector('#cancelNewList');
const saveNewList = document.querySelector('#saveNewList');
const addNewItem = document.querySelector('#addNewItem');
//const writeListItem = document.querySelector('#writeListItem'); /*-- лишняя */
const listArea = document.querySelector('#listArea');
const todoList = [];


cancelNewList.addEventListener('click', function(){
//нужна ф-ция  очистить массив с заполненными пунктами, а так же очистить инпуты названия заметки и пункт
    //перейти на гавную стараницу
    window.location.href ="/";
});

saveNewList.addEventListener('click', function(){
//нужна ф-ция  послать запрос на запись заметки в БД, а так же очистить инпуты нзвания заметки и пункт
    //перейти на гавную стараницу
    window.location.href ="/";
});




addNewItem.addEventListener('click', function () {
    let valueListItem = document.querySelector('#writeListItem').value;
    let div = document.createElement('div');
    let checkbox = document.createElement("input");
    let listText = document.createTextNode(valueListItem);
    let label = document.createElement('label');
    let spanRemove = document.createElement('span');
    div.className = "list-group-item item-wrap"; /*- можно вносить строкой все нужные классы*/
    label.className = 'label-wrap';
    checkbox.type = 'checkbox';
    checkbox.className = 'mr-3';
    spanRemove.className = "remove";
    spanRemove.innerText = "X";
    label.appendChild(checkbox);
    label.appendChild(listText);
    div.appendChild(label);
    div.appendChild(spanRemove);
    if (valueListItem === ""){
        alert("Порожній рядок не можна вносити!")
    }else{
        listArea.appendChild(div);
    }
    clearInputItem();
});

listArea.addEventListener('click', function (e) {
    let target = e.target;
     if (target.className === "remove"){
         target.parentElement.remove();
     }
     if(target.className === "list-group-item item-wrap") {
         console.log("YESS");
         // if (target.checked) {
         //     target.parentElement.className = "label-wrap crossed-text"
         //
         //
         // } else {
         //     target.parentElement.className ="label-wrap"
         //
         // }

     }
})

       // lineWithItems += `<div class="list-group-item" data-item="item${Math.floor(100 + Math.random() * 900)}"><input type ="checkbox"><span class="ml-2">${todoList[key].todo}</span><span class="ml-5">X</span></div>`


//как будет выглядеть объект созданной карточки
/*
{
    id:"",
    type: "list",
    title: "",
    body:[{text:"", checked: false/true}],
}*/

// добавить Модальное окошко как у Алины.


function clearInputItem() {
    document.querySelector('#writeListItem').value = null;
}