// import functions and grab DOM elements
import { LOCALSTORAGE } from './data/constants.js';
import { pokeData } from './data/pokemon.js';
// import { get_localStorage, set_localStorage } from './utils.js';
// import { ENCOUNTERED, CAPTURED } from './data/constants.js';

const radioButton = document.querySelectorAll('input');
const nextButton = document.querySelector('#next');
const images = document.querySelectorAll('label > img');
const cResults = document.getElementById('catch-results');


let ballsLeft = 10;


export function findByName(givenArray, givenId) {
    return givenArray.filter((item) => item.id === givenId)[0];
}


function getRandomPokemon(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function isRepeat(pokemon, arr) {
    return Boolean(arr.find(item => item === pokemon));
}

function checksIfRepeated(n) {
    let array = [];
    while (n > 0) {
        const threeChoice = getRandomPokemon(pokeData);
        if (isRepeat(threeChoice, array)) {
            continue;
        } else {
            array.push(threeChoice);
            n--;
        }
    }
    return array;
}

function set_localStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function get_localStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}


function initialize() {
    const pokeArray = checksIfRepeated(3);

    pokeArray.forEach((selected, i) => {
        radioButton[i].value = selected.pokemon;
        images[i].src = selected.url_image;
        const localStorageEncountered = get_localStorage(LOCALSTORAGE) || [];
        
        const encounteredPokemon = findByName(localStorageEncountered, pokeArray[i].pokemon);

        if (encounteredPokemon === undefined) {
            const addEncounteredPokemon = {
                id: pokeArray[i].pokemon,
                encountered: 1,
                captured: 0,
            };
            localStorageEncountered.push(addEncounteredPokemon);
        } else {
            encounteredPokemon.encountered++;
        }

        set_localStorage(LOCALSTORAGE, localStorageEncountered);
    });

}

function renderView() {
    if (ballsLeft === 0){
        alert (`You ran out of master balls!`);
        window.location.href = '../results/index.html';
    } else {
        ballsLeft--;
        nextButton.classList.add('hidden');
        initialize();
        for (let i = 0; i < radioButton.length; i++) {
            radioButton[i].disabled = false;
            radioButton[i].checked = false;
            images[i].style.opacity = 1;
        }

        for (let i = 0; i < radioButton.length; i++) {
            radioButton[i].addEventListener('change', (e) => {
                for (let i = 0; i < radioButton.length; i++) {
                    radioButton[i].disabled = true;
                    nextButton.classList.remove('hidden');
                }
                let userPick = e.target.value;
                cResults.textContent = `You kidnapped ${userPick}!`;
                const pokeTeam = get_localStorage(LOCALSTORAGE);
                const localPokeTeam = findByName(pokeTeam, userPick);
        
                localPokeTeam.captured++;

                set_localStorage(LOCALSTORAGE, pokeTeam);
            });
        }
    }
}



renderView();

nextButton.addEventListener('click', renderView);


// for (let i = 0; i < radioButton.length; i++) {
//     radioButton[i].addEventListener('change', (e) => {
//         for (let i = 0; i < radioButton.length; i++) {
//             radioButton[i].disabled = true;
//             nextButton.classList.remove('hidden');
//         }
//         let userPick = e.target.value;
//         cResults.textContent = `You kidnapped ${userPick}!`;
//         return;
//     });
// }