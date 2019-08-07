// Елемент списка нотаток
let notesList = document.getElementById('notesList');
// console.log(notesList);

// Кнопка Додати нотатку

const addNoteBtn = document.querySelector("#addNoteButton");

addNoteBtn.addEventListener("click", () => {
    window.location.href = '/notes';
    let id = Date.now();
    notesList.appendChild(getCardTemplate(id, "", "", true));
    getCardBody(id).setAttribute("data-created", "false")
});


// Кнопка Додати список

const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", () => {
    window.location.href = '/lists'
});

// Перехід на нотатку по кліку

const cardItem = document.getElementById('notesList');
console.log(cardItem);
let cardToRedirect = '.card-body, .card-title, .card-text';
cardItem.addEventListener('click',  function(e) {
    // let id = e.target;
    let id = e.target.dataset.id;
    if(e.target.matches(cardToRedirect)){
        window.location.href = '/note'
    } else if (e.target.classList.contains('btn-danger')) {
        console.log('delete');
        deleteNote(id)
    }
});


// Видалення нотатки з головної - опціонально, бо воно так і проситься

// const deleteNoteBtn = document.getElementById('deleteNoteBtn');
//
//
// deleteNoteBtn.addEventListener('click', () => {
//     deleteNote();
// })
//
// async function deleteNote(id) {
//     let data = {
//         id: id
//     }
//     let req = await fetch("http://localhost:3000/delete", {
//         method: "POST",
//         headers: {
//             "Content-Type":"application/json"
//         },
//         body: JSON.stringify(data)
//     })
//     let answer = await req.json()
//     console.log(answer)
//
//     if(answer.deleted){
//         let currentCol = getCol(id)
//         currentCol.remove()
//     }
// }
//
// function getCol(id){
//     return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
// }
