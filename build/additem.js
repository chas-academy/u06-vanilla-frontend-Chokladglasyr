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
let accessToken2 = sessionStorage.getItem("token");
// -------------------------------------- Create item --------------------------------//
const newItem = document.getElementById('add-new-item');
const param = new URLSearchParams(window.location.search);
const listId = param.get('listId');
const addItemForm = {
    description: document.querySelector('#item-description'),
    link: document.querySelector('#item-link'),
    price: document.querySelector('#item-price')
};
function addItem(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            e.preventDefault();
            // if (!getFormValidation.checkValidity()) {
            //     return;
            //   }
            const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/create/${listId}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Authorization": `${accessToken2}`
                },
                body: JSON.stringify({
                    description: addItemForm.description.value.trim(),
                    link: addItemForm.link.value.trim() || "",
                    price: addItemForm.price.value.trim() || 0
                })
            });
            console.log(addItemForm.description.value);
            const data = yield response.json();
            if (!response.ok) {
                alert(data.message);
            }
            else {
                alert("New item added succesfully!");
            }
            window.location.href = `./items.html?listId=${listId}`;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Something went wrong", error);
                return;
            }
        }
    });
}
newItem === null || newItem === void 0 ? void 0 : newItem.addEventListener("click", addItem);
