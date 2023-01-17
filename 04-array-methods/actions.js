import { data, inventors, people } from './data.js';

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const inventors16 = inventors.filter(i => i.year >= 1500 && i.year < 1600);

console.log('Inventors born during the 16th century');
console.table(inventors16);

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const inventorsNames = inventors.map(i => `${i.first} ${i.last}`);
console.log('Inventor names')
console.log(inventorsNames);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const inventorsByAge = inventors.sort((i1, i2) => i1.year - i2.year);

console.log('Inventors by age');
console.table(inventorsByAge);

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const inventorsTotalLifespan = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);

console.log('Inventors total lifespan');
console.log(inventorsTotalLifespan);

// 5. Sort the inventors by years lived
const inventorsByLifespan = inventors
  .map(i => ({ ...i, lifespan: i.passed - i.year }))
  .sort((i1, i2) => i1.lifespan - i2.lifespan);

console.log('Inventors by lifespan');
console.table(inventorsByLifespan);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// Retrieving data from Wiki API
// https://www.mediawiki.org/wiki/API:Get_the_contents_of_a_page
// Help from https://stackoverflow.com/questions/28224312/mediawiki-api-how-do-i-list-all-pages-of-a-category-and-for-each-page-show-all/29050988#29050988
fetch('https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:Boulevards_in_Paris&prop=categories&cllimit=max&gcmlimit=max&format=json&origin=*')
  .then(r => {
    if (r.ok) {
      return r.json();
    }

    throw new Error(`Response error: ${r.statusText}`);
  })
  .then(d => {
    const data = Object.values(d.query.pages)
      .map(p => p.title)
      .filter(r => r.includes('de'));

    console.log(data);
  }).catch(err => console.error(err));


// 7. sort Exercise
console.log('Sort the people alphabetically by last name');
const peopleByLastName = people.map(p => {
  const [last, first] = p.split(', ');
  return { first, last };
}).sort((p1, p2) => p1.last - p2.last);

console.table(peopleByLastName);

// 8. Reduce Exercise
console.log('Sum up the instances of each of these');
const totals = data.reduce((map, el) => {
  if (map[el]) {
    map[el]++;
  } else {
    map[el] = 1;
  }

  return map;
}, {});

console.log(totals);
