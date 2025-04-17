const editOrloginCon = document.getElementById('editOrlogin');
const editOrloginBTN = editOrloginCon?.appendChild(document.createElement('a'))
let token = sessionStorage.getItem("token");
console.log(token)
if(!token || token === "undefined"){
    if(editOrloginBTN) {
        Object.assign(editOrloginBTN, {
            href: "./login.html",
            className: "login"
        })
        editOrloginBTN.innerText = "Login"
    
    }
} else {
    if(editOrloginBTN){
        Object.assign(editOrloginBTN, {
            href: "./edit-user.html",
        })
        editOrloginBTN.innerHTML = `<img id="edit-gear" src="./assets/edit.png" alt="edit">`
    
    }
}

const form = {
    email:  document.querySelector('#email') as HTMLInputElement,
    password: document.querySelector('#password') as HTMLInputElement,
}
const loginTry = document.getElementById('login');
loginTry?.addEventListener('click', fetchLoginData);
const getFormValidation = document.getElementById('input-login') as HTMLFormElement;

async function fetchLoginData(e: Event) {
    try{
        if (!getFormValidation.checkValidity()) {
            return;
          }
        e.preventDefault();
        if (form && form.email && form.password) {
            const response = await fetch('https://u05-restfulapi-chokladglasyr.onrender.com/login', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email.value.trim(),
                    password: form.password.value.trim()
                })
            })
            const data = await response.json();
            sessionStorage.setItem("token", data.accessToken);
            window.location.href = "./index.html";
        }        
    }catch(error: unknown) {
        if(error instanceof Error) {
            console.error('Something went wrong', error);
            return;
        }
    }
}
