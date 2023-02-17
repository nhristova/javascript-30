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

const findMatches = (e) => {
  const searchTerm = e.target.value;
  const filtered = cities.filter(c => c.city.toLowerCase().includes(searchTerm) || c.state.toLowerCase().includes(searchTerm));

  const elements = filtered.reduce((html, r) => {


    return `${html}
      <li class="city"><div>${r.city}, ${r.state}</div><div class="population">${Number(r.population).toLocaleString()}</div></li>`
  }, '');

  document.getElementById('results').innerHTML = elements;

}

document.getElementById('search').addEventListener('input', findMatches);