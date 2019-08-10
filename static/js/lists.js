const toHomePage = document.querySelector('#toHomePage');
const editList = document.querySelector('#editList');
const deleteList = document.querySelector('#deleteList');

let target = document.querySelector(".card");
let targetID = Number(target.id);

toHomePage.addEventListener('click', function () {
    window.location.href = "/";
});

editList.addEventListener('click', function () {
    alert('Редактировать список');
});

deleteList.addEventListener('click', function () {
    (async function deleteList() {
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
    })();
});