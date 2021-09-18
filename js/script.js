import { consultApartments } from './fetchApartments.js';

const btnSearch = document.querySelectorAll('.btn');
const sectionCards = document.querySelector('.site-section_cards');
const headerFinder = document.querySelector('.siteheader_finder');
const findeMobile = document.querySelector('.siteheader_findemobile');
const closeMenu   = document.querySelector('.close_menu');
const locationCity = document.querySelector('#location');
const guests = document.querySelector('#guests');
const listCountrys = document.querySelectorAll('.list-country li');
const listGuests = document.querySelectorAll('.list-guest li');
const divLocation = document.querySelector(".box-location");
const divGuests = document.querySelector(".box-guests");
const inputLocation = document.querySelector("#location");
const inputGuests = document.querySelector("#guests");
const listCountry = document.querySelector('.list-country');
const listGuest = document.querySelector('.list-guest');
const buttonCountAdults = document.querySelectorAll('.number-adults > div');
const buttonCountChildrens = document.querySelectorAll('.number-childrens > div');

let totalGuests = 0;


let countAdults = document.querySelector('#nAdults');
let countChildren = document.querySelector('#nChildrens');

let apartments = [];
const filter = {
    location : '',
    guests   : ''
}


addEventListeners();

function addEventListeners() {
    headerFinder.addEventListener('click', showMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    window.addEventListener('DOMContentLoaded', domLoaded);
    inputLocation.addEventListener('input', addInfoFilter);
    inputGuests.addEventListener('input', addInfoFilter);

    listCountrys.forEach((country) => {
        country.addEventListener('click', putInput);
    })
    listGuests.forEach((guest) => {
        guest.addEventListener('click', putInput);
    })

    buttonCountAdults.forEach((adult, index) => {
        adult.addEventListener('click', () => {
            let cont = parseInt(countAdults.textContent);
            countGuests(cont, index, countAdults);
        })
    })
    buttonCountChildrens.forEach((children, index) => {
        children.addEventListener('click', () => {
            let cont = parseInt(countChildren.textContent);
            countGuests(cont, index, countChildren);
        })
    })
    btnSearch.forEach((btn) => {
        btn.addEventListener('click', searchApartments);
    })

}

//Función para sumar las personas por habitación
function countGuests(cont, index, reference) {

    if(cont >= 0 ) {
        if(index == 1) {
            totalGuests++;
            cont++;
        }else {
            if(cont == 0) {
                return;
            }else{
                totalGuests--;
                cont--;
            }
        }
        filter['guests'] = totalGuests;
        reference.innerHTML = cont;
        inputGuests.value = totalGuests;
    }
}

function addInfoFilter(e) {
    focusBox(e);
    showList(e);
    filter[e.target.name] = e.target.value
    console.log(filter);
}

function showList(e) {
    if(e.target.classList.contains('ilocation')){
        listGuest.classList.remove('v-visible');
        listCountry.classList.add('v-visible');

        if(window.matchMedia("(max-width:768px)").matches) {
            printListForMobile('location');
        }   

    }else{
        listCountry.classList.remove('v-visible');
        listGuest.classList.add('v-visible');

        if(window.matchMedia("(max-width:768px)").matches) {
            printListForMobile('guests');
        }  
    }
}

function printListForMobile(input) {

    let lists =  listCountry.parentElement || listGuest.parentElement;

    while(lists.firstChild) {
        lists.removeChild(lists.firstChild);
    }

    if(input === 'location') {
        lists.appendChild(listCountry);
    }else{
        lists.appendChild(listGuest);
    }
}

function putInput(e) {
    if(e.target.classList.contains('text-country')) {
        locationCity.value = e.target.textContent;
        filter['location'] = e.target.textContent;
        console.log(filter);
    }else if(e.target.classList.contains('text-guest')){
        inputGuests.value = e.target.textContent;
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

    detectClickOnScreen();
}

function focusBox(e) {
        if(e.target.classList.contains('menu-city') || e.target.classList.contains('info-locality') || e.target.classList.contains('ilocation')){
        divGuests.classList.remove('border-menu');
        divLocation.classList.add('border-menu');
        locationCity.focus();  
        inputGuests.removeAttribute('disabled')
        }

    if(e.target.classList.contains('info-guests') || e.target.classList.contains('guests') || e.target.classList.contains('iguest')) {
        divLocation.classList.remove('border-menu');
        divGuests.classList.add('border-menu');
        guests.focus();
        e.target.setAttribute("disabled", "");
        e.target.style.backgroundColor = 'transparent';

        if(totalGuests != e.target.value) {
            e.target.value = parseInt(totalGuests);
        }
    }
}

function detectClickOnScreen() {

    document.querySelector('body').addEventListener('click',(e) => {
        
        let Y = e.clientY;

        if(window.matchMedia("(min-width:768px)").matches) {
            if(Y >= 430) {
                closeMobileMenu();
            }
        }else {
            if(Y >= 750) {
                closeMobileMenu();
            }
        }
    })
}



function closeMobileMenu() {

    fadeOutMenu();

    findeMobile.style.top = '-730px';

    setTimeout(() => {
        findeMobile.style.visibility = 'hidden';
    }, 1000);
}

async function domLoaded() {
    apartments = await consultApartments();
    printApartments(apartments);
   
}

function searchApartments(e) {
    e.preventDefault();
    
    const { location, guests } = filter;

    if(location === '' || typeof(location) !== 'string') {
        printAlert('error', 'Field location is required or type string')
        return;
    }else if(guests == '0') {
        printAlert('error', 'Field guests has to be greather than 0')
        return;
    }

    
    const filterApartments = apartments.filter((apartment) => { return apartment.city === location.substring(0, location.indexOf(',')) && guests <= apartment.maxGuests})
    
    printApartments(filterApartments);
    closeMobileMenu();

}

function printAlert(type, msg) {

    const div = document.createElement('div');
    const form = document.querySelector('#search-form');
    div.classList.add('alert');

    const error = document.querySelector('div.alert');
    
    if(error) {
        error.remove();
    }
    
    if(type === 'error') {
        div.textContent = msg;
    }

    form.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);

}

function printApartments(apartments) {
    
    clearHTML();

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

function clearHTML() {
    while(sectionCards.firstChild) {
        sectionCards.removeChild(sectionCards.firstChild);
    }
}




