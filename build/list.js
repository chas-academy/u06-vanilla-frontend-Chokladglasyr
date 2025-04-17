"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_BASE_URL = "https://u05-restfulapi-chokladglasyr.onrender.com/";
let accessToken = sessionStorage.getItem("token");
const listContainer = document.getElementById('list-container');
const editOrloginContainer = document.getElementById('editOrlogin');
const editOrloginBtn = editOrloginContainer === null || editOrloginContainer === void 0 ? void 0 : editOrloginContainer.appendChild(document.createElement('a'));
console.log(accessToken);
// if(!accessToken || accessToken === "undefined"){
//     if(editOrloginBtn) {
//         Object.assign(editOrloginBtn, {
//             href: "./login.html",
//             className: "login"
//         })
//         editOrloginBtn.innerText = "Login"
//     }
// } else {
//     if(editOrloginBtn){
//         Object.assign(editOrloginBtn, {
//             href: "./edit-user.html",
//         })
//         editOrloginBtn.innerHTML = `<img id="edit-gear" src="./assets/edit.png" alt="edit">`
//     }
// }
// -------------------------------------- Fetch list --------------------------------//
fetchListData();
function fetchListData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lists = yield fetch(`${API_BASE_URL}lists`, {
                headers: {
                    "Authorization": `${accessToken}`,
                }
            });
            if (!lists.ok)
                throw new Error('Ooops');
            const listsData = yield lists.json();
            listsData.forEach((list, index) => {
                const listCard = listContainer === null || listContainer === void 0 ? void 0 : listContainer.appendChild(document.createElement('div'));
                if (listCard) {
                    listCard.setAttribute("class", "list-card");
                    listCard.setAttribute("id", `list-card-${index}`);
                    const listText = listCard.appendChild(document.createElement('a'));
                    Object.assign(listText, {
                        className: "list-text",
                        href: `./items.html?listId=${list._id}`,
                        target: "_self",
                        id: `list-text-${index}`
                    });
                    const listTitle = listText.appendChild(document.createElement('p'));
                    listTitle.setAttribute("id", `title-${index}`);
                    const listDescript = listText.appendChild(document.createElement('p'));
                    listDescript.setAttribute("id", `description-${index}`);
                    listTitle.innerText += `${list.title}`;
                    listDescript.innerText += `${list.description}`;
                    if (list.username) {
                        const listOwner = listText.appendChild(document.createElement('p'));
                        listOwner.innerText += `Made by: ${list.username}`;
                    }
                    const listBtns = listCard === null || listCard === void 0 ? void 0 : listCard.appendChild(document.createElement('div'));
                    Object.assign(listBtns, {
                        className: "list-btns",
                        id: `list-btns-${index}`
                    });
                    if (!accessToken || accessToken === "undefined") {
                        const listImg = listCard.appendChild(document.createElement('div'));
                        listImg.innerHTML = `<img id="listimg" src="./assets/wishlist.png" alt="logo">`;
                        listBtns.setAttribute("style", "display:none;");
                    }
                    listBtns === null || listBtns === void 0 ? void 0 : listBtns.setAttribute("class", "list-btns");
                    const editListBtn = listBtns === null || listBtns === void 0 ? void 0 : listBtns.appendChild(document.createElement('a'));
                    const deleteListBtn = listBtns === null || listBtns === void 0 ? void 0 : listBtns.appendChild(document.createElement('a'));
                    if (editListBtn && deleteListBtn) {
                        Object.assign(editListBtn, {
                            className: "editListBtn",
                            id: `editListBtn-${index}`,
                        });
                        editListBtn.innerText = "Edit";
                        Object.assign(deleteListBtn, {
                            className: "deleteListBtn",
                            id: `deleteListBtn-${index}`,
                        });
                        deleteListBtn.innerText = "Delete";
                        // -------------------------------------- Edit list --------------------------------//
                        const editList = document.getElementById(`editListBtn-${index}`);
                        editList === null || editList === void 0 ? void 0 : editList.addEventListener("click", () => {
                            editListFunction(list._id, list.userId, list.title, list.description, index);
                        });
                        const deleteList = document.getElementById(`deleteListBtn-${index}`);
                        deleteList === null || deleteList === void 0 ? void 0 : deleteList.addEventListener("click", () => {
                            deleteListFunction(list._id, list.userId);
                        });
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Something went wrong', error);
                return;
            }
        }
    });
}
// -------------------------------------- Create list --------------------------------//
const newList = document.getElementById('add-new-list');
const addListForm = {
    listDescription: document.querySelector('#list-description'),
    listTitle: document.querySelector('#list-title'),
};
function addList(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            e.preventDefault();
            const response = yield fetch(`${API_BASE_URL}lists`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Authorization": `${accessToken}`,
                },
                body: JSON.stringify({
                    description: addListForm.listDescription.value.trim(),
                    title: addListForm.listTitle.value.trim()
                })
            });
            const data = yield response.json();
            if (!response.ok) {
                alert("Oops, something went wrong, try again!");
            }
            window.location.href = './list.html';
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Something went wrong', error);
                return;
            }
        }
    });
}
newList === null || newList === void 0 ? void 0 : newList.addEventListener("click", addList);
// -------------------------------------- Edit list --------------------------------//
function editListFunction(listId, userId, title, description, index) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTitle = document.createElement('input');
            newTitle.setAttribute("id", "title");
            const newDescription = document.createElement('input');
            newDescription.setAttribute("id", "description");
            const titleValue = title;
            const descriptValue = description;
            Object.assign(newTitle, {
                value: `${titleValue}`,
            });
            Object.assign(newDescription, {
                value: `${descriptValue}`,
            });
            const textContainer = document.getElementById(`list-text-${index}`);
            textContainer === null || textContainer === void 0 ? void 0 : textContainer.removeAttribute("href");
            textContainer === null || textContainer === void 0 ? void 0 : textContainer.replaceChildren(newTitle, newDescription);
            const btnContainer = document.getElementById(`list-btns-${index}`);
            const saveBtn = document.createElement('a');
            Object.assign(saveBtn, {
                id: "saveBtn",
                className: "saveBtn"
            });
            saveBtn.innerText = "Save";
            btnContainer === null || btnContainer === void 0 ? void 0 : btnContainer.replaceChildren(saveBtn);
            saveBtn.addEventListener("click", updateList);
            function updateList(e) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        e.preventDefault();
                        const response = yield fetch(`${API_BASE_URL}lists/${userId}/${listId}`, {
                            method: "PUT",
                            headers: {
                                Accept: "application/json",
                                "Content-type": "application/json",
                                "Authorization": `${accessToken}`,
                            },
                            body: JSON.stringify({
                                title: newTitle.value.trim(),
                                description: newDescription.value.trim(),
                            })
                        });
                        const data = yield response.json();
                        if (!response.ok) {
                            alert(data.message);
                        }
                        window.location.href = "./list.html";
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            console.error("Something went wrong", error);
                            return;
                        }
                    }
                });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Something went wrong", error);
                return;
            }
        }
    });
}
// -------------------------------------- Delete list --------------------------------//
function deleteListFunction(listId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (confirm("Confirm to delete list.")) {
                const response = yield fetch(`${API_BASE_URL}lists/${userId}/${listId}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        "Authorization": `${accessToken}`,
                    }
                });
                const data = yield response.json();
                console.log(data);
                alert(data.message);
            }
            else {
            }
            window.location.href = "./list.html";
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Something went wrong", error);
                return;
            }
        }
    });
}
