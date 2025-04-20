let aToken = sessionStorage.getItem('token')

const nameInput = document.getElementById('name') as HTMLInputElement
const emailInput = document.getElementById('email') as HTMLInputElement
const saveBtn = document.getElementById('saveBtn')

getProfile();
async function getProfile() {
    try {
        const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/users/profile`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `${aToken}`
            }
        })
        const data = await response.json();

        if(!response.ok) {
            alert(data.message)
        }
        nameInput?.setAttribute("value", `${data.name}`)
        emailInput?.setAttribute("value", `${data.email}`)
        saveBtn?.setAttribute("value", `${data._id}`)
        saveBtn?.addEventListener("click", updateProfile);
    } catch(error: unknown) {
        if(error instanceof Error) {
            console.error("Something went wrong", error)
            return;
        }
    }
}

async function updateProfile() {
    try {
        const userId = saveBtn?.getAttribute("value");

        const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/users/edit/${userId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `${aToken}`
            },
            body: JSON.stringify({
                name: nameInput?.value.trim(),
                email: emailInput.value.trim()
            })
        })

        if(!response.ok) {
            console.error("Something went wrong");
            return;
        }
        alert("Profile updated!")
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Something went wrong", error);
            return;
        }
    }
}