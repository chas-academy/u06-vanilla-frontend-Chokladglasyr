const API_BASE_URL = "https://u05-restfulapi-chokladglasyr.onrender.com/"

let accessToken = sessionStorage.getItem("token");
const listContainer = document.getElementById('list-container');
const editOrloginContainer = document.getElementById('editOrlogin');
const editOrloginBtn = editOrloginContainer?.appendChild(document.createElement('a'))

// -------------------------------------- Fetch list --------------------------------//
fetchListData();
async function fetchListData() {
    try {
        const lists = await fetch(`${API_BASE_URL}lists`, {
            headers: {
                "Authorization": `${accessToken}`,
            }
        });

        if (!lists.ok) throw new Error('Ooops');

        const listsData = await lists.json();

        listsData.forEach((list: {title: string, description: string, username: string, _id: string, userId: string}, index: number) => {
            const listCard = listContainer?.appendChild(document.createElement('div'));
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

                const listBtns = listCard?.appendChild(document.createElement('div'));
                Object.assign(listBtns, {
                    className: "list-btns",
                    id: `list-btns-${index}`
                })
                
                if(!accessToken || accessToken === "undefined") {
                    const listImg = listCard.appendChild(document.createElement('div'));
                    listImg.innerHTML = `<img id="listimg" src="./assets/wishlist.png" alt="logo">`
                    listBtns.setAttribute("style", "display:none;")
                }
                listBtns?.setAttribute("class", "list-btns")
                const editListBtn = listBtns?.appendChild(document.createElement('a'));
                const deleteListBtn = listBtns?.appendChild(document.createElement('a'));
                if (editListBtn && deleteListBtn) {
                    Object.assign(editListBtn, {
                        className: "editListBtn",
                        id: `editListBtn-${index}`,
                    })
                    
                    editListBtn.innerText = "Edit";
                    const editList = document.getElementById(`editListBtn-${index}`);
                    editList?.addEventListener("click", () => {
                        editListFunction(list._id, list.userId, list.title, list.description, index)
                    }) 
                    Object.assign(deleteListBtn, {
                        className: "deleteListBtn",
                        id: `deleteListBtn-${index}`,
                    })
                    deleteListBtn.innerText = "Delete";
                    const deleteList = document.getElementById(`deleteListBtn-${index}`);
                    deleteList?.addEventListener("click", () => {
                        deleteListFunction(list._id, list.userId)
                    })
                }
            }
            })
        }catch (error: unknown) {
            if(error instanceof Error) {
                console.error('Something went wrong', error)
                return;
            }
        }   
    }
// -------------------------------------- Create list --------------------------------//
const newList = document.getElementById('add-new-list');
const addListForm = {
    listDescription:  document.querySelector('#list-description') as HTMLInputElement,
    listTitle: document.querySelector('#list-title') as HTMLInputElement,
}
async function addList(e: Event) {
    try {
        e.preventDefault();
            const response = await fetch(`${API_BASE_URL}lists`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Authorization": `${accessToken}`,
                },
                body: JSON.stringify({
                    description: addListForm.listDescription.value.trim(),
                    title: addListForm.listTitle.value.trim()
                })
            })
            const data = await response.json();
            if(!response.ok) {
                alert(data.message);
            }
            window.location.href = './list.html';
    }catch(error: unknown) {
        if(error instanceof Error) {
            console.error('Something went wrong', error);
            return;
        }
    }
}
newList?.addEventListener("click", addList);

// -------------------------------------- Edit list --------------------------------//

async function editListFunction(listId: string, userId: string, title: string, description: string, index: number) {
    try{
        const newTitle = document.createElement('input');
        const newDescription = document.createElement('input');
        Object.assign(newTitle, {
            value: `${title}`,
            id: "title"
        })
        Object.assign(newDescription, {
            value: `${description}`,
            id: "description"
        })
        const textContainer = document.getElementById(`list-text-${index}`)
        textContainer?.removeAttribute("href")

        textContainer?.replaceChildren(newTitle, newDescription )

        const btnContainer = document.getElementById(`list-btns-${index}`)
        const saveBtn = document.createElement('a')
        Object.assign(saveBtn, {
            id: "saveBtn",
            className: "saveBtn"
        })
        saveBtn.innerText = "Save"

        btnContainer?.replaceChildren(saveBtn)
        saveBtn.addEventListener("click", updateList);
        async function updateList(e: Event) {
            try {
                e.preventDefault();
                const response = await fetch(`${API_BASE_URL}lists/${userId}/${listId}`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        "Authorization": `${accessToken}`,
                    },
                    body: JSON.stringify({
                        title: newTitle.value.trim(),
                        description: newDescription.value.trim(),
                    })
                })
                const data = await response.json();
                if(!response.ok) {
                    alert(data.message);
                }
                
                window.location.reload()
            }catch(error: unknown) {
                if(error instanceof Error) {
                    console.error("Something went wrong", error);
                    return;
                }
            }

        } 

    } catch(error: unknown) {
        if(error instanceof Error) {
            console.error("Something went wrong", error);
            return;
        }
    }
}
// -------------------------------------- Delete list --------------------------------//
async function deleteListFunction(listId: string, userId: string) {
    try{

        if ( confirm("Confirm to delete list.")) {
            const response = await fetch(`${API_BASE_URL}lists/${userId}/${listId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Authorization": `${accessToken}`,
                }
            })
            const data = await response.json();
            
            alert(data.message)
        }
        window.location.reload();
    } catch(error: unknown) {
        if(error instanceof Error) {
            console.error("Something went wrong", error);
            return;
        }
    }
}