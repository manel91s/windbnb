import { consultApartments } from './fetchApartments.js';
const sectionCards = document.querySelector('.site-section_cards');
const headerFinder = document.querySelector('.siteheader_finder');
const findeMobile = document.querySelector('.siteheader_findemobile');
const closeMenu   = document.querySelector('.close_menu');
const locationCity = document.querySelector('#location');
const guests = document.querySelector('#guests');
const listCountrys = document.querySelectorAll('.list-country li');
const siteSection = document.querySelector('.site-section');
const divLocation = document.querySelector(".box-location");
const divGuests = document.querySelector(".box-guests");
const inputLocation = document.querySelector("#location");
const inputGuests = document.querySelector("#guests");
const listCountry = document.querySelector('.list-country');
const listGuest = document.querySelector('.list-guest');
const filter = {
    location : '',
    guests   : ''
}

addEventListeners();

function addEventListeners() {
    listCountrys.forEach((country) => {
        country.addEventListener('click', putClickLocation);
    })
    headerFinder.addEventListener('click', showMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    window.addEventListener('DOMContentLoaded', domLoaded);
    inputLocation.addEventListener('input', addInfoFilter);
    inputGuests.addEventListener('input', addInfoFilter);

}

function addInfoFilter(e) {
    focusBox(e);
    showList(e);
    filter[e.target.name] = e.target.value;
    
}

function showList(e) {
    if(e.target.classList.contains('ilocation')){
        listGuest.classList.remove('v-visible');
        listCountry.classList.add('v-visible');
    }else{
        listCountry.classList.remove('v-visible');
        listGuest.classList.add('v-visible');
    }
}

function putClickLocation(e) {
    if(e.target.classList.contains('text-country')) {
        locationCity.value = e.target.textContent;
    }
}

function fadeInMenu() {
    if(window.matchMedia("(min-width:768px)").matches) {
        $(".active-bg").fadeIn(1000,"linear")
    }
}

function fadeOutMenu() {
    if(window.matchMedia("(min-width:768px)").matches) {
        $(".active-bg").fadeOut(1000,"linear")
    }
}

function showMenu(e) {
    
    fadeInMenu();

    findeMobile.style.visibility = 'visible';
    findeMobile.style.top = '0px';
    focusBox(e);

}

function focusBox(e) {
        if(e.target.classList.contains('menu-city') || e.target.classList.contains('info-locality') || e.target.classList.contains('ilocation')){
        divGuests.classList.remove('border-menu');
        divLocation.classList.add('border-menu');
        locationCity.focus();
    }

    if(e.target.classList.contains('info-guests') || e.target.classList.contains('guests') || e.target.classList.contains('iguest')) {
        divLocation.classList.remove('border-menu');
        divGuests.classList.add('border-menu');
        guests.focus();
    }
}

function closeMobileMenu() {

    fadeOutMenu();

    findeMobile.style.top = '-730px';

    setTimeout(() => {
        findeMobile.style.visibility = 'hidden';
    }, 1000);
}

async function domLoaded() {
    const apartments = await consultApartments();
    printApartments(apartments);
   
}

function printApartments(apartments) {
    console.log(apartments);
    apartments.forEach(apartment => {
        const {title, superHost, rating, photo, type, beds} = apartment;

        const div = document.createElement('div');
        
        div.innerHTML+=`
            <img src="${photo}" alt="${type}"></img>
            <div class="info-apartment">
                ${superHost ? `<span class="su_border">super host</span>` : ''}
                <p class="info-type">${type} ${beds ? '.'+beds+' beds' : ''} </p>
                <p class="rating"><span class="material-icons">star</span>${rating}</p>
            </div>
            <p class="info-title">${title}</p>
        `;

        sectionCards.appendChild(div);
    });
}


