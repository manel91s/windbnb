import { consultApartments } from './fetchApartments.js';
const sectionCards = document.querySelector('.site-section_cards');
const headerFinder = document.querySelector('.siteheader_finder');
const findeMobile = document.querySelector('.siteheader_findemobile');
const closeMenu   = document.querySelector('.close_menu');
const locationCity = document.querySelector('#location');
const guests = document.querySelector('#guests');
const listCountrys = document.querySelectorAll('.list-country li');
const siteSection = document.querySelector('.site-section');

addEventListeners();

function addEventListeners() {
    listCountrys.forEach((country) => {
        country.addEventListener('click', putClickLocation);
    })
    headerFinder.addEventListener('click', showMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    window.addEventListener('DOMContentLoaded', domLoaded);
}

function putClickLocation(e) {
    if(e.target.classList.contains('text-country')) {
        locationCity.value = e.target.textContent;
    }
}

function fadeInMenu() {
    if(window.matchMedia("(min-width:768px)").matches) {
        siteSection.style.zIndex = '-1';
        $(".active-bg").fadeIn(1000,"linear")
    }
}

function fadeOutMenu() {
    if(window.matchMedia("(min-width:768px)").matches) {
        siteSection.style.zIndex = 'auto';
        $(".active-bg").fadeOut(1000,"linear")
    }
}

function showMenu(e) {
    
    fadeInMenu();

    findeMobile.style.visibility = 'visible';
    findeMobile.style.top = '0px';

    if(e.target.classList.contains('menu-city') || e.target.classList.contains('info-locality')){
        locationCity.focus();
    }

    if(e.target.classList.contains('info-guests') || e.target.classList.contains('guests')) {
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


