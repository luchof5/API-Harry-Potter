const $divCards = document.querySelector('.grid');
const $btns = document.querySelectorAll('.btn');

const url = 'https://hp-api.onrender.com/api/characters';

fetch(url)
    .then(response => response.json())
    .then(database => showData(database));
    

function showData(data) {
    console.log(data);
    $divCards.innerHTML = '';
    data.forEach(character => {
        if(!character.image) {
            character.image = '../public/perfil.png'
        }
        if(character.house) {
            $divCards.innerHTML += `<div class="card">
            <h4>${character.name}</h4>
            <img class="imgCards" src="${character.image}" alt="imagen de ${character.name}">
            <p class="character-house ${character.house.toLowerCase()}">Casa: ${character.house}</p>
            </div>
            `;
        }
    }); 
};

$btns.forEach($btn => {
    $btn.addEventListener('click', (e) => {
        const btnHouse = e.currentTarget.id.toLowerCase();
        $divCards.innerHTML = '';
        fetch(url)
        .then(response => response.json())
        .then(database => {
            if (btnHouse === 'all') {
                showData(database);
            } else {
               const filteredData = database.filter(data => data.house.toLowerCase() === btnHouse);
            showData(filteredData);
            }       
            
        });
    });
});