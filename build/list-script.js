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
// -------------------------------------- Fetch list --------------------------------//
fetchListData();
function fetchListData() {
    return __awaiter(this, void 0, void 0, function* () {
        const listContainer = document.getElementById('list-container');
        try {
            const lists = yield fetch(`${API_BASE_URL}lists`);
            if (!lists.ok)
                throw new Error('Ooops');
            const listsData = yield lists.json();
            // console.log(listsData)
            listsData.forEach((list) => {
                const listCard = listContainer === null || listContainer === void 0 ? void 0 : listContainer.appendChild(document.createElement('div'));
                if (listCard) {
                    listCard.setAttribute("class", "list-card");
                    const listText = listCard.appendChild(document.createElement('a'));
                    Object.assign(listText, {
                        className: "list-text",
                        href: `./items.html?${list._id}`,
                        target: "_self"
                    });
                    const listTitle = listText.appendChild(document.createElement('p'));
                    const listDescript = listText.appendChild(document.createElement('p'));
                    listTitle.innerText += `${list.title}`;
                    listDescript.innerText += `${list.description}`;
                    const listBtns = listCard === null || listCard === void 0 ? void 0 : listCard.appendChild(document.createElement('div'));
                    listBtns === null || listBtns === void 0 ? void 0 : listBtns.setAttribute("class", "list-btns");
                    const editListBtn = listBtns === null || listBtns === void 0 ? void 0 : listBtns.appendChild(document.createElement('a'));
                    const deleteListBtn = listBtns === null || listBtns === void 0 ? void 0 : listBtns.appendChild(document.createElement('a'));
                    if (editListBtn && deleteListBtn) {
                        editListBtn.setAttribute("class", "editListBtn");
                        editListBtn.innerText = "Edit";
                        deleteListBtn.setAttribute("class", "deleteListBtn");
                        deleteListBtn.innerText = "Delete";
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
// -------------------------------------- Fetch items --------------------------------//
fetchItemsData();
function fetchItemsData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield fetch('https://u05-restfulapi-chokladglasyr.onrender.com/items');
            console.log(items.json());
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Something went wrong', error);
                return;
            }
        }
    });
}
