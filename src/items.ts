
let accToken = sessionStorage.getItem("token");
fetchItemsData();

async function fetchItemsData() {
    const itemContainer = document.getElementById('items-container');
    
    try{
        const param = new URLSearchParams(window.location.search);
        const listId = param.get('listId')
        // console.log(listId);
        const listData = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/lists/listid?id=${listId}`);
        const userName = await listData.json();
        const title = document.getElementById('title');
        if(title) {
            if(userName === undefined) {
                title.innerText = `${userName[0].username}'s list`
            } else {
                title.innerText = "A list";
            }
        } 
        const items = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/${listId}`);
        const itemsData = await items.json();
        // console.log(itemsData)
        if(itemsData.length === 0) {
            const errorMessage = itemContainer?.appendChild(document.createElement('p'));
            if(errorMessage){
                errorMessage.setAttribute("class", "errorMessage");
                errorMessage.innerText = "No items found for this list."
            }
        }
        
        itemsData.forEach((item: {link: String, description: String, price: Number, photo: String, userId: String, _id: String, listname: String}, index: number)=> {
            const itemCard = itemContainer?.appendChild(document.createElement('div'));
            if (itemCard){
                Object.assign(itemCard, {
                    id: `item-card-${index}`,
                    className: 'item-card'
                })

            }
            if (itemCard) {
                const itemText = itemCard?.appendChild(document.createElement('div'));
                itemText.setAttribute("id", `item-text`)
                if (item.link) {
                    const itemLink = itemCard?.appendChild(document.createElement('a'));

                    itemLink.innerText += `${item.link}`;
                    Object.assign(itemLink, {
                        id: "item-link",
                    })
                    if(item.link.length > 53){
                        itemLink.style.fontSize = "11.5px";
                    }
                    itemLink.setAttribute("href", `${item.link}`)
                } else {
                    const itemLink = itemCard?.appendChild(document.createElement('p'));
                    Object.assign(itemLink, {
                        id: "item-nolink",
                    })
                    itemLink.innerText += "There is no link to this item."
                }
                const itemDescript = itemText?.appendChild(document.createElement('p'));
                itemDescript.innerText += `Description: ${item.description}`
                if(item.price) {
                    const itemPrice = itemText?.appendChild(document.createElement('p'));
                    itemPrice.innerText += `Price: ${item.price}`
                }
                const itemPhoto = itemCard.appendChild(document.createElement('img'));
                Object.assign(itemPhoto, {
                    className: "item-photo",
                    src: "./assets/photoplaceholder.png",
                    id: "item-photo",
                })
                if (item.photo){
                    itemPhoto.setAttribute("src", `${item.photo}`)
                }
                const itemBtns = itemCard?.appendChild(document.createElement('div'));
                if(!accToken || accToken === "undefined") {
                    itemBtns.setAttribute("style", "display:none;")
                }
                if(itemBtns) {
                    Object.assign(itemBtns, {
                        id: `item-btns-${index}`,
                        className: 'item-btns'
                    })

                }
                const editItemBtn = itemBtns?.appendChild(document.createElement('a'));
                const deleteItemBtn = itemBtns?.appendChild(document.createElement('a'));
                if (editItemBtn && deleteItemBtn) {
                    Object.assign(editItemBtn, {
                        className: 'editItemBtn',
                        id: `editItemBtn-${index}`
                    })
                    editItemBtn.innerText = "Edit";

                    const updateItem = document.getElementById(`editItemBtn-${index}`);
                    updateItem?.addEventListener("click", () => {
                        updateItemFunction(item._id, item.userId, item.link, item.description, item.price, item.photo, index)
                    })
                    
                    Object.assign(deleteItemBtn, {
                        className: 'deleteItemBtn',
                        id: `deleteItemBtn-${index}`
                    })
                    deleteItemBtn.innerText = "Delete";

                    const deleteItem = document.getElementById(`deleteItemBtn-${index}`);
                    deleteItem?.addEventListener('click', () => {
                        deleteItemFunction(item._id, item.userId)
                    })
                }
            }            
        })
    }catch(error: unknown) {
        if(error instanceof Error) {
            console.error('Something went wrong', error);
            return;
        }
    }
}
const param2 = new URLSearchParams(window.location.search);
const listId2 = param2.get('listId')
const createItemBtn = document.getElementById('new-item');
createItemBtn?.setAttribute("href", `./additem.html?listId=${listId2}`)

// ------------------------------------- Edit item --------------------------------//
async function updateItemFunction(id: String, userId: String, link: String, description: String, price: Number, photo: String, index: Number) {
    try{
        const textContainer = document.getElementById(`item-card-${index}`)
        textContainer?.setAttribute("style","display: flex;")
        const formContainer = textContainer?.appendChild(document.createElement('div'))
        if (formContainer) {
            formContainer.setAttribute("class", "formContainer")
            textContainer?.replaceChildren(formContainer)
            const newLink = formContainer.appendChild(document.createElement('input'));
            Object.assign(newLink, {
                id: 'link',
                value: `${link}`,
                className: 'inputFields',
            })
            if(!link){
                newLink.setAttribute("placeholder", "Link:")
            }
            const newDescription = formContainer.appendChild(document.createElement('input'));
            Object.assign(newDescription, {
                id: 'description',
                placeholder: "Description:",
                className: 'inputFields'
            })
            if(description){
                newDescription.setAttribute("value", `${description}`)
            }
            const newPrice = formContainer.appendChild(document.createElement('input'));
            Object.assign(newPrice, {
                id: 'price',
                placeholder: "Price",
                className: 'inputFields'
            })
            if(price || price === 0){
                newPrice.setAttribute("value", `${price}`)
            } 
            let newPhoto: HTMLInputElement;
            if(photo){
                newPhoto = formContainer.appendChild(document.createElement('input'));
                Object.assign(newPhoto, {
                    id: 'photo',
                    value: `${photo}`,
                    className: 'inputFields'
                })

            }
            const btnContainer = document.getElementById(`item-btns-${index}`)
            const saveBtn = formContainer.appendChild(document.createElement('a'));
            Object.assign(saveBtn, {
                id: 'saveBtnItem',
                className: 'saveBtn',
                
            })
            saveBtn.innerText = 'Save';

    
            btnContainer?.replaceChildren(saveBtn)
            saveBtn.addEventListener("click", updateItem);
            async function updateItem(e: Event) {
                try{
                    const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/${userId}/${id}`, {
                        method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                            "Authorization": `${accToken}`
                        },
                        body: JSON.stringify({
                            description: newDescription.value.trim(),
                            link: newLink.value.trim(),
                            price: newPrice.value.trim() || 0,
                            
                            
                        })
                })
                const data = await response.json();
                if(!response.ok) {
                    alert(data.message);
                }
               window.location.reload();

                } catch(error: unknown) {
                    if(error instanceof Error) {
                        console.error("Something went wrong", error);
                        return;
                    }
                }
            }
        }
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.error('Something went wrong', error);
            return;
        }
    }
}
// -------------------------------------- Delete item --------------------------------//
async function deleteItemFunction(id: String, userId: String) {
    try{
        if(confirm("Confirm to delete item.")) {
            const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/${userId}/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Authorization": `${accToken}`
                }
            })
            const data = await response.json();
            alert(data.message)
        }
        window.location.reload();
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.error('Something went wrong', error);
            return;
        }
    }
}