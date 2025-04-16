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
const form = {
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
};
const loginTry = document.getElementById('login');
loginTry === null || loginTry === void 0 ? void 0 : loginTry.addEventListener('click', fetchLoginData);
function fetchLoginData(e) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
