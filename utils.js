// import { pokeData } from './data/pokemon.js';

export function findByName(someArray, someId) {

    for (let i = 0; i < someArray.length; i++) {
        const item = someArray[i];
        if (item.pokemon === someId) {
            return someArray[i];
        }
    }
}

// export function setLocalStorage(key, value) {
//     const stringyItem = JSON.stringify(value);
//     localStorage.setItem(key, stringyItem);
//     return value;

// }

export function get_localStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// sets an item to localStorage in the correct format
export function set_localStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}