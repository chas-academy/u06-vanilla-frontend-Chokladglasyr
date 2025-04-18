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
let accToken = sessionStorage.getItem("token");
fetchItemsData();
function fetchItemsData() {
    return __awaiter(this, void 0, void 0, function* () {
        const itemContainer = document.getElementById('items-container');
        try {
            const param = new URLSearchParams(window.location.search);
            const listId = param.get('listId');
            // console.log(listId);
            const listData = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/lists/listid?id=${listId}`);
            const userName = yield listData.json();
            const title = document.getElementById('title');
            if (title) {
                if (userName === undefined) {
                    title.innerText = `${userName[0].username}'s list`;
                }
                else {
                    title.innerText = "A list";
                }
            }
            const items = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/${listId}`);
            const itemsData = yield items.json();
            // console.log(itemsData)
            if (itemsData.length === 0) {
                const errorMessage = itemContainer === null || itemContainer === void 0 ? void 0 : itemContainer.appendChild(document.createElement('p'));
                if (errorMessage) {
                    errorMessage.setAttribute("class", "errorMessage");
                    errorMessage.innerText = "No items found for this list.";
                }
            }
            itemsData.forEach((item, index) => {
                const itemCard = itemContainer === null || itemContainer === void 0 ? void 0 : itemContainer.appendChild(document.createElement('div'));
                if (itemCard) {
                    Object.assign(itemCard, {
                        id: `item-card-${index}`,
                        className: 'item-card'
                    });
                }
                if (itemCard) {
                    const itemText = itemCard === null || itemCard === void 0 ? void 0 : itemCard.appendChild(document.createElement('div'));
                    itemText.setAttribute("id", `item-text`);
                    if (item.link) {
                        const itemLink = itemCard === null || itemCard === void 0 ? void 0 : itemCard.appendChild(document.createElement('a'));
                        itemLink.innerText += `${item.link}`;
                        Object.assign(itemLink, {
                            id: "item-link",
                        });
                        if (item.link.length > 53) {
                            itemLink.style.fontSize = "11.5px";
                        }
                        itemLink.setAttribute("href", `${item.link}`);
                    }
                    else {
                        const itemLink = itemCard === null || itemCard === void 0 ? void 0 : itemCard.appendChild(document.createElement('p'));
                        Object.assign(itemLink, {
                            id: "item-nolink",
                        });
                        itemLink.innerText += "There is no link to this item.";
                    }
                    const itemDescript = itemText === null || itemText === void 0 ? void 0 : itemText.appendChild(document.createElement('p'));
                    itemDescript.innerText += `Description: ${item.description}`;
                    if (item.price) {
                        const itemPrice = itemText === null || itemText === void 0 ? void 0 : itemText.appendChild(document.createElement('p'));
                        itemPrice.innerText += `Price: ${item.price}`;
                    }
                    const itemPhoto = itemCard.appendChild(document.createElement('img'));
                    Object.assign(itemPhoto, {
                        className: "item-photo",
                        src: "./assets/photoplaceholder.png",
                        id: "item-photo",
                    });
                    if (item.photo) {
                        itemPhoto.setAttribute("src", `${item.photo}`);
                    }
                    const itemBtns = itemCard === null || itemCard === void 0 ? void 0 : itemCard.appendChild(document.createElement('div'));
                    if (!accToken || accToken === "undefined") {
                        itemBtns.setAttribute("style", "display:none;");
                    }
                    if (itemBtns) {
                        Object.assign(itemBtns, {
                            id: `item-btns-${index}`,
                            className: 'item-btns'
                        });
                    }
                    const editItemBtn = itemBtns === null || itemBtns === void 0 ? void 0 : itemBtns.appendChild(document.createElement('a'));
                    const deleteItemBtn = itemBtns === null || itemBtns === void 0 ? void 0 : itemBtns.appendChild(document.createElement('a'));
                    if (editItemBtn && deleteItemBtn) {
                        Object.assign(editItemBtn, {
                            className: 'editItemBtn',
                            id: `editItemBtn-${index}`
                        });
                        editItemBtn.innerText = "Edit";
                        const updateItem = document.getElementById(`editItemBtn-${index}`);
                        updateItem === null || updateItem === void 0 ? void 0 : updateItem.addEventListener("click", () => {
                            updateItemFunction(item._id, item.userId, item.link, item.description, item.price, item.photo, index);
                        });
                        Object.assign(deleteItemBtn, {
                            className: 'deleteItemBtn',
                            id: `deleteItemBtn-${index}`
                        });
                        deleteItemBtn.innerText = "Delete";
                        const deleteItem = document.getElementById(`deleteItemBtn-${index}`);
                        deleteItem === null || deleteItem === void 0 ? void 0 : deleteItem.addEventListener('click', () => {
                            deleteItemFunction(item._id, item.userId);
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
const param2 = new URLSearchParams(window.location.search);
const listId2 = param2.get('listId');
const createItemBtn = document.getElementById('new-item');
createItemBtn === null || createItemBtn === void 0 ? void 0 : createItemBtn.setAttribute("href", `./additem.html?listId=${listId2}`);
// ------------------------------------- Edit item --------------------------------//
function updateItemFunction(id, userId, link, description, price, photo, index) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const textContainer = document.getElementById(`item-card-${index}`);
            textContainer === null || textContainer === void 0 ? void 0 : textContainer.setAttribute("style", "display: flex;");
            const formContainer = textContainer === null || textContainer === void 0 ? void 0 : textContainer.appendChild(document.createElement('div'));
            if (formContainer) {
                formContainer.setAttribute("class", "formContainer");
                textContainer === null || textContainer === void 0 ? void 0 : textContainer.replaceChildren(formContainer);
                const newLink = formContainer.appendChild(document.createElement('input'));
                Object.assign(newLink, {
                    id: 'link',
                    value: `${link}`,
                    className: 'inputFields',
                });
                if (!link) {
                    newLink.setAttribute("placeholder", "Link:");
                }
                const newDescription = formContainer.appendChild(document.createElement('input'));
                Object.assign(newDescription, {
                    id: 'description',
                    placeholder: "Description:",
                    className: 'inputFields'
                });
                if (description) {
                    newDescription.setAttribute("value", `${description}`);
                }
                const newPrice = formContainer.appendChild(document.createElement('input'));
                Object.assign(newPrice, {
                    id: 'price',
                    placeholder: "Price",
                    className: 'inputFields'
                });
                if (price || price === 0) {
                    newPrice.setAttribute("value", `${price}`);
                }
                let newPhoto;
                if (photo) {
                    newPhoto = formContainer.appendChild(document.createElement('input'));
                    Object.assign(newPhoto, {
                        id: 'photo',
                        value: `${photo}`,
                        className: 'inputFields'
                    });
                }
                const btnContainer = document.getElementById(`item-btns-${index}`);
                const saveBtn = formContainer.appendChild(document.createElement('a'));
                Object.assign(saveBtn, {
                    id: 'saveBtnItem',
                    className: 'saveBtn',
                });
                saveBtn.innerText = 'Save';
                btnContainer === null || btnContainer === void 0 ? void 0 : btnContainer.replaceChildren(saveBtn);
                saveBtn.addEventListener("click", updateItem);
                function updateItem(e) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/${userId}/${id}`, {
                                method: "PUT",
                                headers: {
                                    Accept: "application/json",
                                    "Content-type": "application/json",
                                    "Authorization": `${accToken}`
                                },
                                body: JSON.stringify({
                                    description: newDescription.value.trim(),
                                    link: newLink.value.trim(),
                                    price: newPrice.value.trim() || 0,
                                })
                            });
                            const data = yield response.json();
                            if (!response.ok) {
                                alert(data.message);
                            }
                            window.location.reload();
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
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Something went wrong', error);
                return;
            }
        }
    });
}
// -------------------------------------- Delete item --------------------------------//
function deleteItemFunction(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (confirm("Confirm to delete item.")) {
                const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/${userId}/${id}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        "Authorization": `${accToken}`
                    }
                });
                const data = yield response.json();
                alert(data.message);
            }
            window.location.reload();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Something went wrong', error);
                return;
            }
        }
    });
}
