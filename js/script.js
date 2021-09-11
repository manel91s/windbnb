import { consultApartments } from './fetchApartments.js';
const sectionCards = document.querySelector('.site-section_cards');

addEventListeners();

function addEventListeners() {
    window.addEventListener('DOMContentLoaded', domLoaded);
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

