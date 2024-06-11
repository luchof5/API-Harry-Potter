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
        let person = character.name.replace(' ', '+');
        let actor = 'Actor';

        if (character.gender === 'female') {
            actor = 'Actris';
        } 
        if(!character.actor) {
            actor = 'Googlealo..';
        }
        if(character.house) {
            $divCards.innerHTML += `
            <a href="https://www.google.com/search?q=${person}&oq=harr&gs_lcrp=EgZjaHJvbWUqDwgAEEUYOxiDARixAxiABDIPCAAQRRg7GIMBGLEDGIAEMgYIARBFGDkyCggCEAAYsQMYgAQyDQgDEAAYgwEYsQMYgAQyCggEEAAYsQMYgAQyBggFEEUYPDIGCAYQRRg9MgYIBxBFGD0yBggIEEUYQdIBCDEzNDFqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8" 
            target="_blank" class="card ${character.house.toLowerCase()}">
                <div>
                    <h4>${character.name}</h4>
                    <img class="imgCards" src="${character.image ? character.image : '../public/perfil.png'}" alt="imagen de ${character.name}">
                    <p class="character-house"><span>${character.house}</span></p>
                    <p class="character-house"><span>${actor}:</span> ${character.actor}</p>
                </div>
            </a>
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