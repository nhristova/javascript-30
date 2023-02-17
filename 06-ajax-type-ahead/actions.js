import { citiesDataBackup } from './data.js';
/*
{
city: "New York"
growth_from_2000_to_2013: "4.8%"
latitude: 40.7127837
longitude: -74.0059413
population: "8405837"
rank: "1"
state: "New York"
}
*/

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];
fetch(endpoint)
  .then(response => {
    if (response.ok) {
      return response.json()
    }

    console.log(`Error fecthing data from endpoint ${endpoint}`);
    return citiesDataBackup;
  })
  .then(data => {
    cities = data;
  });

const findMatches = (searchTerm, collection) => {
  /*
  const regex = new RegExp(searchTerm, 'gi')
  return collection.filter(c => c.city.match(regex) || c.state.match(regex))
  */
  return collection.filter(c => c.city.toLowerCase().includes(searchTerm) || c.state.toLowerCase().includes(searchTerm));
}

const displayMatches = function () {
  const matches = findMatches(this.value, cities);
  const elements = matches.reduce((html, c) => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = c.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = c.state.replace(regex, `<span class="hl">${this.value}</span>`);

    return `${html}
      <li class="city">
        <span>${cityName}, ${stateName}</span>
        <span class="population">${Number(c.population).toLocaleString()}</span>
      </li>`
  }, '');

  results.innerHTML = elements;
}

const search = document.getElementById('search')
const results = document.getElementById('results');

search.focus();
search.addEventListener('input', displayMatches);
