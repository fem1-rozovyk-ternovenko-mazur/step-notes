const cancelNewList = document.querySelector('#cancelNewList');
const saveNewList = document.querySelector('#saveNewList');
const addNewItem = document.querySelector('#addNewItem');
const listArea = document.querySelector('#listArea');
const listTitle = document.querySelector('.list-title');


cancelNewList.addEventListener('click', function(){
//нужна ф-ция  очистить массив с заполненными пунктами, а так же очистить инпуты названия заметки и пункт
    clearInputItem();
    cancelNote();

});

saveNewList.addEventListener('click', function(){
//нужна ф-ция  послать запрос на запись заметки в БД, а так же очистить инпуты нзвания заметки и пункт

    //если пользователь не внес название списка, вываливать предупреждение об ошибке
    if (listTitle.value ===""){
        alert("Треба заповнити назву списку")
    }else {
        //перейти на гавную стараницу
        window.location.href ="/";
    }


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
    checkbox.name = 'check';
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

function clearInputItem() {
    document.querySelector('#writeListItem').value = null;
}

// Модальное окошко, если захотел выйти без сохранения (как у Алины)
function cancelNote() {
    const exitCard = document.createElement("div");
    exitCard.className = "confirm-exit-wrapper-list";
    let height = document.querySelector('.container').offsetHeight+25;
    console.log(height);
    exitCard.style.height = `${height}px`;
    exitCard.innerHTML = `<div class="alert alert-info text-center text-dark">
                                <span> Точно НЕ ЗБЕРІГАТИ список справ? </span>
                                <div class="row mt-3">
                                    <div class="col">
                                        <button class="btn btn-danger" id="confirmExitBtn"> Так, хочу просто піти </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning" id="cancelExitBtn"> Ні, доробити нотатку </button>
                                    </div>        
                                </div>
                        </div>`;
    document.body.appendChild(exitCard);

    const confirmExitBtn = document.querySelector("#confirmExitBtn");
    const cancelExitBtn = document.querySelector("#cancelExitBtn");

    confirmExitBtn.addEventListener('click', function () {
        //перейти на гавную стараницу
        window.location.href = "/";
    });

    cancelExitBtn.addEventListener('click', function () {
        document.body.removeChild(exitCard)
    })
}

//формирование объекта созданной карточки




//tак будет выглядеть объект созданной карточки
/*
{
    id:"",
    type: "list",
    title: "",
    body:[{text:"", checked: false/true}],
}*/
