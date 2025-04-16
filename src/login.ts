const form = {
    email:  document.querySelector('#email') as HTMLInputElement,
    password: document.querySelector('#password') as HTMLInputElement,
}
const loginTry = document.getElementById('login');
loginTry?.addEventListener('click', fetchLoginData);

async function fetchLoginData(e: Event) {
    try{
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
