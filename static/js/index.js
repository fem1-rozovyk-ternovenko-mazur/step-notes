// Кнопка Додати нотатку
let addNote = document.getElementById('addNoteButton');


//Елемент списка нотаток
let notesList = document.getElementById('notesList');
console.log(notesList);

// Кнопка Додати список справ
let addList = document.getElementById('addListButton');

//Елемент списка нотаток
let checkList = document.querySelector('[data-type="list"]');
// console.log(checkList);

// Додавання нової нотатки
addNote.addEventListener('click', ()=>{
    // Інпути
    let id = Date.now()
    notesList.appendChild(getCardTemplate(id, "", "", true))
    getCardBody(id).setAttribute("data-created", "false")
})

// Видалення, створення, редагування
notesList.addEventListener('click', function(e) {
    // Id нотатки
    let id = e.target.dataset.id

    if(e.target.classList.contains('btn-danger')) {
        console.log('delete')
        deleteNote(id)
    } else if(e.target.classList.contains('save-btn')){
        console.log('save')
        if(getCardBody(id).dataset.edit){
            editNote(id)
        } else{
            createNote(id)
        }
    } else if(e.target.classList.contains('edit-btn')){
        console.log('edit')
        let currentCol = getCol(id)
        let newCol = getCardTemplate(id, getTitleVal(id, false), getTextVal(id, false), true)
        currentCol.innerHTML = newCol.innerHTML
        getCardBody(id).setAttribute("data-edit", "true");
    } else if(e.target.classList.contains('card-body')){
        if(e.target.dataset.created !== "false"){
            window.location.href = `/${id}`
        }
    }
})

// Створення нотатки
async function createNote(id){
    let data = {
        id: id,
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    console.log(data)
    let req = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    console.log(answer)
    if(answer.created){
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }

}

async function editNote(id){
    let data = {
        id: id,
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    console.log(data)
    let req = await fetch("http://localhost:3000/edit", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    console.log(answer)
    if(answer.edited){
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }
}

//Видалення нотатки

async function deleteNote(id) {
    let data = {
        id: id
    }
    let req = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()
    console.log(answer)

    if(answer.deleted){
        let currentCol = getCol(id)
        currentCol.remove()
    }
}


function getCardTemplate( id, title, text, editStatus){

    const inputElems = `
        <div class="form-group">
            <label for="note-title">Title</label>
            <input type="text" class="form-control" id="note-title" value="${title}">
        </div>
        <div class="form-group">
            <label for="note-text">Text</label>
            <textarea class="form-control" id="note-text" rows="3" >${text}</textarea>
        </div>`
    const textElems = `
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>`

    let submitBtn,
        neededContentElems

    if(editStatus){
        submitBtn = `
        <button class="btn btn-primary save-btn" data-id="${id}">Save</button>
        `
        neededContentElems = inputElems
    } else {
        submitBtn = `
        <button class="btn btn-success edit-btn" data-id="${id}">Edit</button>
        `
        neededContentElems = textElems
    }


    const cardContainer = `
            <div class="card">
                <div class="card-body" data-id="${id}">
                    <div class="text-right">
                        <button type="button" data-id="${id}" class="btn btn-danger">-</button>
                    </div>
                    ${neededContentElems}
                    ${submitBtn}
                </div>
            </div>`

    const wrapper = document.createElement('div')
    wrapper.className = 'col-4'
    wrapper.innerHTML = cardContainer
    return wrapper
}


function getTitleVal(id, editStatus){
    const tag = editStatus ? "input" : "h5"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)
    if(editStatus){
        return elem.value
    } else{
        return elem.innerText
    }
}

function getTextVal(id, editStatus){
    const tag = editStatus ? "textarea" : "p"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)
    if(editStatus){
        return elem.value
    } else{
        return elem.innerText
    }
}

function getCol(id){
    return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}

function getCardBody(id){
    return document.querySelector(`.card-body[data-id="${id}"]`)
}