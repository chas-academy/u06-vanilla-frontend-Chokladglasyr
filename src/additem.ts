let accessToken2 = sessionStorage.getItem("token");
// -------------------------------------- Create item --------------------------------//
const newItem = document.getElementById('add-new-item');
const param = new URLSearchParams(window.location.search);
const listId = param.get('listId')

const addItemForm = {
    description: document.querySelector('#item-description') as HTMLInputElement,
    link: document.querySelector('#item-link') as HTMLInputElement,
    price: document.querySelector('#item-price') as HTMLInputElement
}
async function addItem(e: Event) {
    try {
        e.preventDefault();
        // if (!getFormValidation.checkValidity()) {
        //     return;
        //   }

            const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/create/${listId}`, {
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
        })
        console.log(addItemForm.description.value)
        const data = await response.json();
        if(!response.ok) {
            alert(data.message)
        } else {
            alert("New item added succesfully!")
        }
        window.location.href = `./items.html?listId=${listId}`
    } catch(error: unknown) {
        if(error instanceof Error) {
            console.error("Something went wrong", error);
            return;
        }
    }
}
newItem?.addEventListener("click", addItem);