const $divCards = document.querySelector('.grid');
const $btns = document.querySelectorAll('.btn');

const url = 'https://hp-api.onrender.com/api/characters';

fetch(url)
    .then(response => response.json())
    .then(database => showData(database));
    
// Tomamos los datos de la api y los mostramos en pantalla
function showData(data) {
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
                    <img class="imgCards" src="${character.image ? character.image : '../assets/perfil.png'}" alt="imagen de ${character.name}">
                    <p class="character-house"><span>${character.house}</span></p>
                    <p class="character-house"><span>${actor}:</span> ${character.actor}</p>
                </div>
            </a>
            `;
        }
    }); 
};

// Iteramos los botones para filtrar segun la casa Hogwarts
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

// Mostrar el botón al desplazarse y desplazarse hacia arriba
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
