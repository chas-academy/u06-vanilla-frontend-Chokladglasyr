// import { API_BASE_URL } from "./list";

fetchItemsData();

async function fetchItemsData() {
    const itemContainer = document.getElementById('items-container');

    try{
        const param = new URLSearchParams(window.location.search);
        const listId = param.get('listId')
        console.log(listId);
          
        const items = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/items/${listId}`);
        const itemsData = await items.json();
        console.log(itemsData)
        if(itemsData.length === 0) {
            const errorMessage = itemContainer?.appendChild(document.createElement('p'));
            if(errorMessage){
                errorMessage.setAttribute("class", "errorMessage");
                errorMessage.innerText = "No items found for this list."
            }
        }
        itemsData.forEach((item: {link: String, description: String, price: Number, photo: String, userId: Number})=> {
            const itemCard = itemContainer?.appendChild(document.createElement('div'));
            if (itemCard) {
                const itemText = itemCard?.appendChild(document.createElement('div'));
                if (item.link) {
                    const itemLink = itemText?.appendChild(document.createElement('a'));
                    itemLink.innerText += "Buy now";
                    itemLink.setAttribute("href", `${item.link}`)
                }
                const itemDescript = itemText?.appendChild(document.createElement('p'));
                itemDescript.innerText += `${item.description}`
                if(item.price) {
                    const itemPrice = itemText?.appendChild(document.createElement('p'));
                    itemPrice.innerText += `${item.price}`
                }
                const itemPhoto = itemCard.appendChild(document.createElement('img'));
                Object.assign(itemPhoto, {
                    className: "item-photo",
                    src: "./assets/wishlist.png",
                })
                if (item.photo){
                    itemPhoto.setAttribute("src", `${item.photo}`)
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