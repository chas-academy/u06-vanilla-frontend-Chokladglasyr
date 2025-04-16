const API_BASE_URL = "https://u05-restfulapi-chokladglasyr.onrender.com/"
let accessToken = sessionStorage.getItem("token");

// -------------------------------------- Fetch list --------------------------------//
fetchListData();
async function fetchListData() {
    const listContainer = document.getElementById('list-container');
    try {
        // console.log(accessToken);

        const lists = await fetch(`${API_BASE_URL}lists`, {
            headers: {
                "Authorization": `${accessToken}`,
            }
        });
        if (!lists.ok) throw new Error('Ooops');

        const listsData = await lists.json();
        // console.log(listsData)
        listsData.forEach((list: {title: string, description: string, username: string, _id: number}) => {
            const listCard = listContainer?.appendChild(document.createElement('div'));
            if(listCard) {
                listCard.setAttribute("class", "list-card");

                const listText = listCard.appendChild(document.createElement('a'));
                Object.assign(listText, {
                    className: "list-text",
                    href: `./items.html?listId=${list._id}`,
                    target: "_self"
                })
                const listTitle = listText.appendChild(document.createElement('p'));
                const listDescript = listText.appendChild(document.createElement('p'));
                listTitle.innerText += `${list.title}`;
                listDescript.innerText += `${list.description}`;
                if (list.username) {
                    const listOwner = listText.appendChild(document.createElement('p'))
                    listOwner.innerText += `Made by: ${list.username}`
                }
                const listBtns = listCard?.appendChild(document.createElement('div'));
                listBtns?.setAttribute("class", "list-btns")
                const editListBtn = listBtns?.appendChild(document.createElement('a'));
                const deleteListBtn = listBtns?.appendChild(document.createElement('a'));
                if (editListBtn && deleteListBtn) {
                    editListBtn.setAttribute("class", "editListBtn")
                    editListBtn.innerText = "Edit";
    
                    deleteListBtn.setAttribute("class", "deleteListBtn");
                    deleteListBtn.innerText = "Delete";
                }
            }
        });
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
                alert("Oops, something went wrong, try again!");
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

