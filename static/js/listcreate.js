const cancelNewList = document.querySelector('#cancelNewList');
const saveNewList = document.querySelector('#saveNewList');
const addNewItem = document.querySelector('#addNewItem');
const listArea = document.querySelector('#listArea');
const listTitle = document.querySelector('.list-title');

cancelNewList.addEventListener('click', function(){
    ifCancel();
});

saveNewList.addEventListener('click', function(){
    //if the user has not entered the name of the list, throw out an error warning
    if (listTitle.value ===""){
        alert("Треба заповнити назву списку")
    }else {
        //save list and go to the home page
        saveList();
    }
});

addNewItem.addEventListener('click', function () {
    addListItem();
});

listArea.addEventListener('click',  function (event) {
    editListItem(event);
});

//save new list
async function saveList() {
    let data = buildDataObject();
    let req = await fetch('http://awesome-cat-notes.herokuapp.com/api/lists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        let answer = await req.json();
        if (answer.created){
            goToHomePage();
        }
}
