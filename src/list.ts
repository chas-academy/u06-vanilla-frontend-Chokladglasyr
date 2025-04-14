const API_BASE_URL = "https://u05-restfulapi-chokladglasyr.onrender.com/"

// -------------------------------------- Fetch list --------------------------------//
fetchListData();
async function fetchListData() {
    const listContainer = document.getElementById('list-container');
    try {
        const lists = await fetch(`${API_BASE_URL}lists`);
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
                // const listBtns = listCard?.appendChild(document.createElement('div'));
                // listBtns?.setAttribute("class", "list-btns")
                // const editListBtn = listBtns?.appendChild(document.createElement('a'));
                // const deleteListBtn = listBtns?.appendChild(document.createElement('a'));
                // if (editListBtn && deleteListBtn) {
                //     editListBtn.setAttribute("class", "editListBtn")
                //     editListBtn.innerText = "Edit";
    
                //     deleteListBtn.setAttribute("class", "deleteListBtn");
                //     deleteListBtn.innerText = "Delete";
                // }
            }
        });
        }catch (error: unknown) {
            if(error instanceof Error) {
                console.error('Something went wrong', error)
                return;
            }
        }   
    }
