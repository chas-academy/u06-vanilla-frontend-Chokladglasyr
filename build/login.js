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
const editOrloginCon = document.getElementById('editOrlogin');
const editOrloginBTN = editOrloginCon === null || editOrloginCon === void 0 ? void 0 : editOrloginCon.appendChild(document.createElement('a'));
const createNewListBtn = document.getElementById('new-list');
const createNewItemBtn = document.getElementById('new-item');
let token = sessionStorage.getItem("token");
// console.log(token)
if (!token || token === "undefined") {
    if (editOrloginBTN) {
        Object.assign(editOrloginBTN, {
            href: "./login.html",
            className: "login"
        });
        editOrloginBTN.innerText = "Login";
        createNewListBtn === null || createNewListBtn === void 0 ? void 0 : createNewListBtn.setAttribute("style", "display: none;");
        createNewItemBtn === null || createNewItemBtn === void 0 ? void 0 : createNewItemBtn.setAttribute("style", "display: none;");
    }
}
else {
    if (editOrloginBTN) {
        Object.assign(editOrloginBTN, {
            href: "./edit-user.html",
        });
        editOrloginBTN.innerHTML = `<img id="edit-gear" src="./assets/edit.png" alt="edit">`;
    }
}
const form = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
    confirmed_password: document.querySelector('#confirmed-password')
};
const loginTry = document.getElementById('login');
loginTry === null || loginTry === void 0 ? void 0 : loginTry.addEventListener('click', fetchLoginData);
const getFormValidation = document.getElementById('input-login');
const singupTry = document.getElementById('signup');
singupTry === null || singupTry === void 0 ? void 0 : singupTry.addEventListener('click', fetchRegisterData);
const getFormValidationSignup = document.getElementById('input-signup');
function fetchLoginData(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!getFormValidation.checkValidity()) {
                return;
            }
            e.preventDefault();
            if (form && form.email && form.password) {
                const response = yield fetch('https://u05-restfulapi-chokladglasyr.onrender.com/login', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        email: form.email.value.trim(),
                        password: form.password.value.trim()
                    })
                });
                const data = yield response.json();
                sessionStorage.setItem("token", data.accessToken);
                if (!response.ok) {
                    alert("Oops, something went wrong, try again!");
                    window.location.href = "./login.html";
                }
                window.location.href = "./index.html";
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
function fetchRegisterData(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!getFormValidationSignup.checkValidity()) {
                return;
            }
            e.preventDefault();
            if (form && form.name && form.email) {
                const response = yield fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/register`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name.value.trim(),
                        email: form.email.value.trim(),
                        password: form.password.value.trim(),
                        confirmed_password: form.confirmed_password.value.trim()
                    })
                });
                const data = yield response.json();
                // if(!response.ok) {
                //     alert("Oops, something went wrong, try again!");
                // }
                window.location.href = './login.html';
                if (data.message) {
                    alert(data.message);
                    window.location.href = './signup.html';
                }
                else {
                    alert("Welcome, now you can log in!");
                    window.location.href = './login.html';
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
