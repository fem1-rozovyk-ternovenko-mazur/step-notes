 function addNoteItem() {
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
}

 function removeoNoteItem(e) {
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
}