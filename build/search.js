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
const searchBtn = document.getElementById('goSearch');
const searchUsername = document.querySelector("#username");
const searchResults = document.getElementById('search-results');
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", searchLists);
function searchLists(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(searchUsername.value);
            e.preventDefault();
            const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/search?name=${searchUsername.value}`);
            const data = yield response.json();
            console.log(data);
            if (!response.ok) {
                alert(data.message);
            }
            else {
                data.forEach((list, index) => {
                    const listCard = searchResults === null || searchResults === void 0 ? void 0 : searchResults.appendChild(document.createElement('div'));
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
                        const listImg = listCard.appendChild(document.createElement('div'));
                        listImg.innerHTML = `<img id="listimg" src="./assets/wishlist.png" alt="logo">`;
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
const searchPriceBtn = document.getElementById('searchNow');
const searchName = document.querySelector("#name");
const maxPrice = document.querySelector("#maxprice");
const results = document.getElementById('results');
searchPriceBtn === null || searchPriceBtn === void 0 ? void 0 : searchPriceBtn.addEventListener("click", searchListsByPrice);
function searchListsByPrice(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (results) {
                results.innerHTML = "";
            }
            if (!maxPrice) {
            }
            e.preventDefault();
            const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/filteruser?name=${searchName.value.trim()}&maxPrice=${maxPrice.value.trim()}`);
            const data = yield response.json();
            console.log(data);
            if (!response.ok) {
                alert(data.message);
            }
            else {
                data.forEach((item, index) => {
                    const itemCard = results === null || results === void 0 ? void 0 : results.appendChild(document.createElement('div'));
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
