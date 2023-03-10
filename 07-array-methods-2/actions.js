const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const currentYear = new Date().getFullYear();
const age = 19;
const checkSome = (currentYear, age) => people.some(p => p.year <= (currentYear - age));
console.log(`Some people are over ${age}: `, checkSome(currentYear, age));
// Array.prototype.every() // is everyone 19 or older?
const checkAll = (currentYear, age) => people.every(p => p.year <= (currentYear - age));
console.log(`All people are over ${age}: `, checkAll(currentYear, age));

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const comment = comments.find(c => c.id === 823423);
console.log('Comment found: ', comment);

// Array.prototype.findIndex()
// Find the comment with this ID

const commentId = comments.findIndex(c => c.id === 823423);
console.log('Comment index: ', commentId);
// delete the comment with the ID of 823423
const commentsFiltered = comments.filter(({ id }) => id !== 823423);
console.log('Filtered comments: ', commentsFiltered);


// fill in tables with data
const peopleHtml = people.map(p => `<tr><td>${p.name}</td><td>${p.year}</td></tr>`).join('');
document.getElementById('people-list').insertAdjacentHTML('beforeend', peopleHtml);

const commentsHtml = comments.map(c => `<tr><td>${c.id}</td><td>${c.text}</td></tr>`).join('');
document.getElementById('comments-list').insertAdjacentHTML('beforeend', commentsHtml);

