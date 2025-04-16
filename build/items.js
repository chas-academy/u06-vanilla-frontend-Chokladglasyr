"use strict";
// import { API_BASE_URL } from "./list";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            itemsData.forEach((item) => {
                const itemCard = itemContainer === null || itemContainer === void 0 ? void 0 : itemContainer.appendChild(document.createElement('div'));
                itemCard === null || itemCard === void 0 ? void 0 : itemCard.setAttribute("class", "item-card");
                if (itemCard) {
                    const itemText = itemCard === null || itemCard === void 0 ? void 0 : itemCard.appendChild(document.createElement('div'));
                    itemText.setAttribute("id", "item-text");
                    if (item.link) {
                        const itemLink = itemCard === null || itemCard === void 0 ? void 0 : itemCard.appendChild(document.createElement('a'));
                        // itemLink.innerText += "Link: Buy now";
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
                    itemBtns === null || itemBtns === void 0 ? void 0 : itemBtns.setAttribute("class", "item-btns");
                    const editItemBtn = itemBtns === null || itemBtns === void 0 ? void 0 : itemBtns.appendChild(document.createElement('a'));
                    const deleteItemBtn = itemBtns === null || itemBtns === void 0 ? void 0 : itemBtns.appendChild(document.createElement('a'));
                    if (editItemBtn && deleteItemBtn) {
                        editItemBtn.setAttribute("class", "editItemBtn");
                        editItemBtn.innerText = "Edit";
                        deleteItemBtn.setAttribute("class", "deleteItemBtn");
                        deleteItemBtn.innerText = "Delete";
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
