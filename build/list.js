"use strict";
const url = new URL(window.location.href);
console.log(url);
const main = document.getElementById('mainBody');
if (url.searchParams.has('home') && main) {
    const image = main.appendChild(document.createElement('img'));

    Object.assign(image, {
        src: './assets/wishlist.png',
        id: 'image',
    });
    const containerBtn = main.appendChild(document.createElement('div'));
    containerBtn.setAttribute("class", "buttons");
    const listBtn = containerBtn.appendChild(document.createElement('a'));
    const searchBtn = containerBtn.appendChild(document.createElement('a'));
    const filterBtn = containerBtn.appendChild(document.createElement('a'));
    Object.assign(listBtn, {
        href: '?lists',
        className: 'home-btns',
        id: 'my-lists',
        placeholder: "edit",
    });
    listBtn.innerHTML = "My lists";
    Object.assign(searchBtn, {
        href: '?search',
        className: 'home-btns',
        id: 'search'
    });
    searchBtn.innerHTML = "Search lists by users name";
    Object.assign(filterBtn, {
        href: '?filter',
        className: 'home-btns',
        id: 'filter-name'
    });
    filterBtn.innerHTML = "Search items";
}
if (url.searchParams.has('lists') && main) {
    const listCard = main.appendChild(document.createElement('div'));
    Object.assign(listCard, {
        href: '',
        className: 'list-card'
    });
}
if (url.searchParams.has('search') && main) {
    const searchDiv = main.appendChild(document.createElement('div'));
    const input = searchDiv.appendChild(document.createElement('input'));
    Object.assign(input, {
        type: 'text',
        className: 'inputFields',
    });
    // const searchNow = searchDiv.appendChild(document.)
    // 
}
