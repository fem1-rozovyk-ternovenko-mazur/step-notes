//directs to the Home page
function goToHomePage() {
    window.location.href = "/";
}

//clear input field
function clearInputItem() {
    document.querySelector('#writeListItem').value = null;
}

// show the marked list items at the bottom of the list
function sortByStatus(e){
    function compare( a, b ) {
        if ( a.check < b.check ){
            return -1;
        }
        if ( a.check > b.check ){
            return 1;
        }
        return 0;
    }
    e.sort(compare);
}

//assigns the desired id depending on the link address
function currentID (){
    let href = document.location.href;
    if (href === "https://notes-rozovyk-ternovenko-mazur.herokuapp.com/lists") {
        let id = Date.now();
        return id;
    } else {
        let id = targetID;
        return id;
    }
};

//adds a new item, editing or creating a list
function addListItem(){
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
};

//removes or checking an item, editing or creating a list
function editListItem(e) {
    let target = e.target;
    if (target.className === "remove"){
        target.parentElement.remove();
    }else {
        const checkbox = document.querySelectorAll('input[type = checkbox]');
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].onchange = function () {
                if (this.checked) {
                    this.labels[0].className ="label-wrap crossed-text ";
                } else {
                    this.labels[0].className ="label-wrap";
                }
            }

        }
    }
};

//building a list object
function buildDataObject() {
    let id = currentID();
    let listTitle = document.querySelector(".list-title").value;
    let listItem = [];
    let listArea = document.querySelectorAll('.label-wrap');

    for (let i = 0; i < listArea.length; i++) {
        let temp = {};
        let textItem = listArea[i].textContent;
        let check = listArea[i].firstChild.checked;
        temp.todo = textItem;
        temp.check = check;
        listItem.push(temp);
    }
    sortByStatus(listItem);
     let dataObject = {
        id: id,
        type: "list",
        title: listTitle,
        body: listItem,
    };
    return  dataObject;
}


// modal window if you exit without saving
function ifCancel() {
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
    confirmExitBtn.addEventListener('click', function () {
        //перейти на гавную стараницу
        (function clearAllInputs() {
            document.querySelector('.list-title').value = null;
            clearInputItem();
        })();
        goToHomePage();
    });
    cancelExitBtn.addEventListener('click', function () {
        document.body.removeChild(exitCard)
    })
}

// modal window if you try to delete list
function ifDelete(){
    const confirmDeletionCard = document.createElement("div");
    confirmDeletionCard.className = "confirm-wrapper";
    let body = document.querySelector('html');
    let height = body.offsetHeight;
    confirmDeletionCard.style.height = `${height}px`;
    confirmDeletionCard.innerHTML = `<div class="alert alert-info text-center text-dark">
                                <span> Ви точно бажаєте видалити цей список? </span>
                                <div class="row mt-3">
                                    <div class="col">
                                        <button class="btn btn-danger" id="confirmDeletionBtn"> Так</button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning" id="cancelDeletionBtn"> Ні</button>
                                    </div>        
                                </div>
                            </div>`;
    document.body.appendChild(confirmDeletionCard);
    const confirmDeletionBtn = document.querySelector("#confirmDeletionBtn");
    const cancelDeletionBtn = document.querySelector("#cancelDeletionBtn");

    confirmDeletionBtn.addEventListener("click", deleteThisList);
    cancelDeletionBtn.addEventListener("click", function (){document.body.removeChild(confirmDeletionCard)})
}