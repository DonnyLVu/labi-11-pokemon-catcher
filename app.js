// import functions and grab DOM elements
import { pokeData } from './data/pokemon.js';
// import { ENCOUNTERED, CAPTURED } from './data/constants.js';

const radioButton = document.querySelectorAll('input');
const nextButton = document.querySelector('#next');
const images = document.querySelectorAll('label > img');
const cResults = document.getElementById('catch-results');


// initialize state
let ballsLeft = 11;
// let pokemonCaught = 0;
// let encounters = 0;

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

        // Pokemon is a repeat, so retry the loop.
        if (isRepeat(threeChoice, array)) {
            continue;
        } else {
            // Pokemon is not a repeat, so add to array:
            array.push(threeChoice);
            n--;
        }
    }
    return array;
}

function initialize() {
    const pokeArray = checksIfRepeated(3);

    pokeArray.forEach((selected, i) => {
        radioButton[i].value = selected.pokemon;
        images[i].src = selected.url_image;
    });

}

function renderView() {
    initialize();
    ballsLeft--;
    console.log(ballsLeft);
    nextButton.classList.add('hidden');
    if (ballsLeft.length === 0) {
        alert(`You ran out of master balls!`);
    }
    
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
            console.log(userPick + ballsLeft);
            return;
        });
    }

}


renderView();

nextButton.addEventListener('click', renderView);