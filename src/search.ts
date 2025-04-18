const searchBtn = document.getElementById('goSearch');
const searchUsername = document.querySelector("#username") as HTMLInputElement;
const searchResults = document.getElementById('search-results')

searchBtn?.addEventListener("click", searchLists);

async function searchLists(e: Event) {
    try{
        console.log(searchUsername.value)
        e.preventDefault();
        const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/search?name=${searchUsername.value}`)
        const data = await response.json()
        console.log(data)
        if(!response.ok) {
            alert(data.message)
        } else {
            data.forEach((list: {title: string, description: string, username: string, _id: string, userId: string}, index: number) => {
                const listCard = searchResults?.appendChild(document.createElement('div'));
                if(listCard) {
                    listCard.setAttribute("class", "list-card");
                    listCard.setAttribute("id", `list-card-${index}`);
    
                    const listText = listCard.appendChild(document.createElement('a'));
                    Object.assign(listText, {
                        className: "list-text",
                        href: `./items.html?listId=${list._id}`,
                        target: "_self",
                        id: `list-text-${index}`
                    })
                    const listTitle = listText.appendChild(document.createElement('p'));
                    listTitle.setAttribute("id", `title-${index}`)
                    const listDescript = listText.appendChild(document.createElement('p'));
                    listDescript.setAttribute("id", `description-${index}`)
                    listTitle.innerText += `${list.title}`;
                    listDescript.innerText += `${list.description}`;
                    if (list.username) {
                        const listOwner = listText.appendChild(document.createElement('p'))
                        listOwner.innerText += `Made by: ${list.username}`
                    }
                    const listImg = listCard.appendChild(document.createElement('div'));
                    listImg.innerHTML = `<img id="listimg" src="./assets/wishlist.png" alt="logo">`
                    
                }
        })
        }
    } catch(error: unknown) {
        if(error instanceof Error) {
            console.error("Something went wrong", error);
            return;
        }
    }
}
const searchPriceBtn = document.getElementById('searchNow');
const searchName = document.querySelector("#name") as HTMLInputElement;
const maxPrice = document.querySelector("#maxprice") as HTMLInputElement;
const results = document.getElementById('results')

searchPriceBtn?.addEventListener("click", searchListsByPrice)

async function searchListsByPrice(e: Event) {
    try{
        if(results){
            results.innerHTML="";

        }
        e.preventDefault();
        const response = await fetch(`https://u05-restfulapi-chokladglasyr.onrender.com/search?name=${searchName.value.trim()}&maxPrice=${maxPrice}`)
        const data = await response.json()
        console.log(data)
        if(!response.ok) {
            alert(data.message)
        } else {
            data.forEach((item: {link: String, description: String, price: Number, photo: String, userId: String, _id: String, listname: String}, index: number)=> {
                const itemCard = results?.appendChild(document.createElement('div'));
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
                }
            })
        }
    } catch(error: unknown) {
        if(error instanceof Error) {
            console.error("Something went wrong", error);
            return;
        }
    }
}