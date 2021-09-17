let li = document.getElementById("addTodo")
let todo = document.getElementById("todo")




firebase.database().ref("/todos").on("child_added", function (snap){

    let data = snap.val()

    let row = document.createElement("li")
    let items = document.createElement("ul")

    let li1 = document.createElement("li")
    let li2 = document.createElement("li")
    let li3 = document.createElement("li")
    let deleteBtn = document.createElement("img")
    let editBtn = document.createElement("img")



    // added todo input here
    li1.appendChild(document.createTextNode(data.todos))
    items.appendChild(li1)
    todo.value = ""


    // delete button created while adding the todo items

    deleteBtn.setAttribute("onclick", "deleteBtn(this)")
    deleteBtn.setAttribute("id", data.key)
    deleteBtn.setAttribute("src", "icon/delete.png")
    li2.appendChild(deleteBtn)
    items.appendChild(li2)




    // edit button created while adding the todo items


    editBtn.setAttribute("onclick", "editBtn(this)")
    editBtn.setAttribute("src", "icon/edit.png")
    editBtn.setAttribute("id", data.key)

    li3.appendChild(editBtn)
    items.appendChild(li3)


    row.appendChild(items)
    li.appendChild(row)

});









const adddTodo = () => {

    if (todo.value == "" || todo.value == " ") {

    }
    else {

        let key = firebase.database().ref("/todos").push().key
        let data = {
            key: key,
            todos: todo.value
        }
        firebase.database().ref("/todos").child(key).set(data)

    }
}

const deleteAllBtn = () => {
    firebase.database().ref("/todos").remove()
    li.innerHTML = ""

}

const deleteBtn = (e) => {
    let deleteTodo = e
    firebase.database().ref("/todos").child(e.id).remove()
    deleteTodo.parentNode.parentNode.parentNode.remove()
}



const editBtn = (e) => {
    let editTodo = e.parentNode.parentNode.children[0]
    let setEdit = prompt("Update the Todo Item ", editTodo.innerHTML)

    firebase.database().ref("/todos").child(e.id).set({
        key: e.id,
        todo: setEdit
    })



    editTodo.innerHTML = setEdit



}

