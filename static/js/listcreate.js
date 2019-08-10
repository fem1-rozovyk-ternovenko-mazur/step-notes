const cancelNewList = document.querySelector('#cancelNewList');
const saveNewList = document.querySelector('#saveNewList');
const addNewItem = document.querySelector('#addNewItem');
const listArea = document.querySelector('#listArea');
const listTitle = document.querySelector('.list-title');


cancelNewList.addEventListener('click', function(){
    cancelNote();
});

saveNewList.addEventListener('click', function(){
    //если пользователь не внес название списка, вываливать предупреждение об ошибке
    if (listTitle.value ===""){
        alert("Треба заповнити назву списку")
    }else {
        //сохранить список и перейти на главную стараницу
        saveNote();
    }
});

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

//формирование объекта созданной карточки
async function saveNote() {
    let id = Date.now();
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
    let req = await fetch('http://localhost:3000/api/lists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        let answer = await req.json();
        if (answer.created){
            window.location.href = '/'
        }

}

function clearInputItem() {
    document.querySelector('#writeListItem').value = null;
}

// Модальное окошко, если захотел выйти без сохранения (как у Алины)
function cancelNote() {
    const exitCard = document.createElement("div");
    exitCard.className = "confirm-exit-wrapper-list";
    let container = document.querySelector('.container');
    let height = container.offsetHeight;
    height += 10;
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
        (function clearAllInputs() {
            document.querySelector('.list-title').value = null;
            clearInputItem();
        })();
        window.location.href = "/";
    });

    cancelExitBtn.addEventListener('click', function () {
        document.body.removeChild(exitCard)
    })
}

// отмеченные пункты списка показывай внизу списка
function sortByStatus(e){
    e.sort((a, b) => a.check > b.check ? 1 : -1);
}