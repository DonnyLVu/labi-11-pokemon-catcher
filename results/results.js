import { get_localStorage } from '../utils.js';



const restartButton = document.querySelector('button');
restartButton.addEventListener('click', () => {
    console.log('reset');
    localStorage.clear();   
    window.location = '../index.html';
});


function renderTable() {
    const table = document.querySelector('tbody');
    const pokemonResults = get_localStorage('LOCALSTORAGE') || [];

    for (let i = 0; i < pokemonResults.length; i++) {
        const result = pokemonResults[i];
        const tr = renderLineItems(result);
        
        table.append(tr);
        
    }
}

renderTable();

function renderLineItems(pokeTeam) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const captured = document.createElement('td');
    const encountered = document.createElement('td');

    captured.textContent = pokeTeam.captured;
    encountered.textContent = pokeTeam.encountered;

    tdName.textContent = pokeTeam.id;

    tr.append(tdName, captured, encountered);

    return tr;
}


const resultsData = get_localStorage('LOCALSTORAGE');
const onlyCaptures = resultsData.filter((pokeTeam) => pokeTeam.captured);

const nameOfPokemon = onlyCaptures.map((pokeTeam) => {
    return pokeTeam.id;
});
const captured = onlyCaptures.map((pokeTeam) => {
    return pokeTeam.captured;

});


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: nameOfPokemon,
        datasets: [{
            label: 'Pokemon Game',
            data: captured,
            backgroundColor: [
                'rgba(3, 7, 30, 0.2)',
                'rgba(55, 6, 23, 0.2)',
                'rgba(16, 4, 215, 0.2)',
                'rgba(17, 2, 8, 0.2)',
                'rgba(28, 0, 0, 0.2)',
                'rgba(220, 47, 2, 0.2)',
                'rgba(22, 93, 4, 0.2)',
                'rgba(24, 140, 6, 0.2)',
                'rgba(250, 163, 7, 0.2)',
                'rgba(25, 186, 8, 0.2)'
            ],
            borderColor: [
                'rgba(3, 7, 30, 0.2)',
                'rgba(55, 6, 23, 0.2)',
                'rgba(16, 4, 215, 0.2)',
                'rgba(17, 2, 8, 0.2)',
                'rgba(28, 0, 0, 0.2)',
                'rgba(220, 47, 2, 0.2)',
                'rgba(22, 93, 4, 0.2)',
                'rgba(24, 140, 6, 0.2)',
                'rgba(250, 163, 7, 0.2)',
                'rgba(25, 186, 8, 0.2)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});