// import { API_BASE_URL } from "./list";

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
        
        itemsData.forEach((item: {link: String, description: String, price: Number, photo: String, userId: Number})=> {
            const itemCard = itemContainer?.appendChild(document.createElement('div'));
            itemCard?.setAttribute("class", "item-card")
            if (itemCard) {
                const itemText = itemCard?.appendChild(document.createElement('div'));
                itemText.setAttribute("id", "item-text")
                if (item.link) {
                    const itemLink = itemCard?.appendChild(document.createElement('a'));
                    // itemLink.innerText += "Link: Buy now";
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
                itemBtns?.setAttribute("class", "item-btns")
                const editItemBtn = itemBtns?.appendChild(document.createElement('a'));
                const deleteItemBtn = itemBtns?.appendChild(document.createElement('a'));
                if (editItemBtn && deleteItemBtn) {
                    editItemBtn.setAttribute("class", "editItemBtn")
                    editItemBtn.innerText = "Edit";
    
                    deleteItemBtn.setAttribute("class", "deleteItemBtn");
                    deleteItemBtn.innerText = "Delete";
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