const $divCards = document.querySelector('.grid');

const url = 'https://hp-api.onrender.com/api/characters';

fetch(url)
    .then(response => response.json())
    .then(data => showData(data));

function showData(data) {
    console.log(data);
   
    data.forEach(character => { 
        if(character.image !== '') {
        $divCards.innerHTML += `<div>
        <h4>${character.name}</h4>
        <img class="imgCards" src="${character.image}" alt="imagen de ${character.name}">
        <p>Casa: ${character.house}</p>
        <p>Nacimiento: ${character.dateOfBirth}</p>
        <p>Genero: ${character.gender}</p>
        <p>Actor: ${character.actor}</p>
        </div>
        `;
        }
    }); 
};