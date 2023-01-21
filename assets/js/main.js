const formInput = document.querySelector("#form__input");
const formButton = document.querySelector("#form__button");
const todo = document.querySelector("#to-do");
const done = document.querySelector("#done");
const deleteButton = document.querySelectorAll(".delete");
let todoAll = [];

function createToDo(event) {
    event.preventDefault()
    const {value} = formInput;
    createElement(value);
    resetFieldInputForm()
}

function createElement(value) {
    const li = `
    <li class="flex bg-blue-100 justify-between py-4 px-2">
        <p>${value}</p>
        <div class="flex gap-3 items-center">
            <button class="edit"><i class="ph-pencil edit"></i></button>
            <button class="move"><i class="ph-caret-right move"></i></button>
            <button class="delete"><i class="ph-trash delete"></i></button>
        </div>
    </li>
    `

    todo.innerHTML += li; 
}

function resetFieldInputForm() {
    formInput.value = "";
    formInput.focus();
}

function clickedDocument(event) {
    const {target} = event;
    const {localName} = target;
    const isButton = localName === "button";
    const isI = localName === "i";

    if(isI || isButton) {
        const isDelete = target.classList.contains("delete");
        const isMove = target.classList.contains("move");
        const isEdit = target.classList.contains("edit");
        let li;

        if(isI) {
            li = target.parentNode.parentNode.parentNode;
        } else {
            li = target.parentNode.parentNode;
        }

        if(isDelete) {
            const wantDelete = confirm("Deseja realmente apagar está todo?");
            if(!wantDelete) {
                return;
            } 
            removeElement(li)
        }

        if(isMove) {
            move(li)
        }

        if(isEdit) {
            const modal = document.querySelector("#modal");
            let editInput = modal.querySelector("#form__input-edit");
            editInput.value = li.innerText;
            modal.querySelector("#modal__btn-editar").addEventListener("click", (event) => editTodo({event, li, editInput, modal}));
            modalOpen(modal)
        }
    }
}

function removeElement(li) {
    li.remove();
}

function move(li) {
    const icon = li.querySelector("i.move");
    const {classList} = icon;
    const containsPhCaretRight = classList.contains("ph-caret-right");

    if(containsPhCaretRight) {
        done.appendChild(li)
        classList.add("ph-caret-left")
        classList.remove("ph-caret-right")
    } else {
        todo.appendChild(li);
        classList.add("ph-caret-right")
        classList.remove("ph-caret-left")
    }
}

function editTodo({event, li, editInput, modal}) {
    event.preventDefault()
    li.querySelector("p").innerText = editInput.value;
    closeModal(modal);
}

function modalOpen(modal) {
    modal.querySelector("#close__modal").addEventListener("click", () => closeModal(modal));
    modal.classList.remove("hidden");
    modal.classList.add("fixed", "inset-0", "h-screen", "w-screen", "px-3","z-50", "bg-black-100", "grid", "place-items-center");
}

function closeModal(modal) {
    modal.classList.remove("fixed", "inset-0", "h-screen", "w-screen", "z-50", "bg-black", "grid", "place-items-center");
    modal.classList.add("hidden");
}

formButton.addEventListener("click", createToDo);
document.querySelectorAll("ul").forEach(ul => ul.addEventListener("click", clickedDocument));