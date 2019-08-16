// Adding note
const addNoteBtn = document.querySelector ('#addNoteButton');
addNoteBtn.addEventListener("click", () => {
    window.location.href = '/notes';
});

// Adding list
const addListBtn = document.querySelector("#addListButton");
addListBtn.addEventListener("click", () => {
    window.location.href = '/lists'
});

// Redirecting to note or list
const cardItem = document.getElementById('notesList');

cardItem.addEventListener('click', function (e) {
    let target = e.target.closest('.card');
    let id = target.id;
    console.log(id);
    if (target.dataset.type === "note") {
            window.location.href = `/notes/${id}`
    }
    if (target.dataset.type === "list") {
            window.location.href = `/lists/${id}`
    }
});
