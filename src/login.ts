const editOrloginCon = document.getElementById('editOrlogin');
const editOrloginBTN = editOrloginCon?.appendChild(document.createElement('a'))

const createNewListBtn = document.getElementById('new-list')
const createNewItemBtn = document.getElementById('new-item');
let token = sessionStorage.getItem("token");

setTimeout(() =>sessionStorage.clear(), 60 * 60 * 1000)
// console.log(token)
if(!token || token === "undefined"){
    if(editOrloginBTN) {
        Object.assign(editOrloginBTN, {
            href: "./login.html",
            className: "login"
        })
        editOrloginBTN.innerText = "Login"
        createNewListBtn?.setAttribute("style", "display: none;")
        createNewItemBtn?.setAttribute("style", "display: none;")
    
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
    name: document.querySelector('#name') as HTMLInputElement,
    email:  document.querySelector('#email') as HTMLInputElement,
    password: document.querySelector('#password') as HTMLInputElement,
    confirmed_password: document.querySelector('#confirmed-password') as HTMLInputElement
}
const loginTry = document.getElementById('login');
loginTry?.addEventListener('click', fetchLoginData);
const getFormValidation = document.getElementById('input-login') as HTMLFormElement;

const singupTry = document.getElementById('signup')
singupTry?.addEventListener('click', fetchRegisterData);
const getFormValidationSignup = document.getElementById('input-signup') as HTMLFormElement;

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
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email.value.trim(),
                    password: form.password.value.trim()
                })
            })
            const data = await response.json();
            sessionStorage.setItem("token", data.accessToken);

            if(!response.ok) {
                alert("Oops, something went wrong, try again!");
                window.location.href = "./login.html";
            }
            window.location.href = "./index.html";
        }        
    }catch(error: unknown) {
        if(error instanceof Error) {
            console.error('Something went wrong', error);
            return;
        }
    }
}

async function fetchRegisterData(e: Event) {
    try{
        if (!getFormValidationSignup.checkValidity()) {
            return;
          }
        e.preventDefault();
        if(form && form.name && form.email) {
            const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name.value.trim(),
                    email: form.email.value.trim(),
                    password: form.password.value.trim(),
                    confirmed_password: form.confirmed_password.value.trim()
                })
            });
            const data = await response.json();
            // if(!response.ok) {
            //     alert("Oops, something went wrong, try again!");
            // }
            window.location.href = './login.html';
            if(data.message) {
                alert(data.message);
                window.location.href = './signup.html';
            } else {
                alert("Welcome, now you can log in!");
                window.location.href = './login.html';
            }

        }
    } catch(error: unknown) {
        if(error instanceof Error) {
            console.error('Something went wrong', error);
            return;
        }
    }
}

// async function getNewAccessToken() {

//     try {
//       const response = await fetch('https://u05-restfulapi-chokladglasyr.onrender.com/refresh', {
//         method: 'POST',
//         headers: {
//             "Accept": "application/json",
//             "Content-type": "application/json",
//             "Authorization": `${token}`
//         },  
//         credentials: 'include', 
//       });
  
//       const data = await response.json();
//       console.log(data)
//       if (data.accessToken) {
//         sessionStorage.setItem("token", data.accessToken); 
//       } else {
//         console.error("No access token returned");
//       }
//     } catch (error) {
//       console.error("Token refresh failed", error);
//     }
//   }
// setInterval(() => {
//     fetch('/refresh', {
//       method: 'POST',
//       credentials: 'include'
//     })
//     .then(res => res.json())
//     .then(data => {
//       sessionStorage.setItem("token", data.accessToken);
//     })
//     .catch(err => {
//       console.error("Failed to refresh token:", err);
//     });
//   }, 10 * 60 * 1000); 