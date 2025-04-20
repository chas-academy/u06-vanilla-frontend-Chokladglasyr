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
let aToken = sessionStorage.getItem('token');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const saveBtn = document.getElementById('saveBtn');
getProfile();
function getProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/users/profile`, {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `${aToken}`
                }
            });
            const data = yield response.json();
            if (!response.ok) {
                alert(data.message);
            }
            nameInput === null || nameInput === void 0 ? void 0 : nameInput.setAttribute("value", `${data.name}`);
            emailInput === null || emailInput === void 0 ? void 0 : emailInput.setAttribute("value", `${data.email}`);
            saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.setAttribute("value", `${data._id}`);
            saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.addEventListener("click", updateProfile);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Something went wrong", error);
                return;
            }
        }
    });
}
function updateProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.getAttribute("value");
            const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/users/edit/${userId}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `${aToken}`
                },
                body: JSON.stringify({
                    name: nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim(),
                    email: emailInput.value.trim()
                })
            });
            if (!response.ok) {
                console.error("Something went wrong");
                return;
            }
            alert("Profile updated!");
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Something went wrong", error);
                return;
            }
        }
    });
}
