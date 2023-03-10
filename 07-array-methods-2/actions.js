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

let commentsCurr = [...comments]

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
const comment = commentsCurr.find(c => c.id === 823423);
console.log('Comment found: ', comment);

// Array.prototype.findIndex()
// Find the comment with this ID

const commentId = commentsCurr.findIndex(c => c.id === 823423);
console.log('Comment index: ', commentId);
// delete the comment with the ID of 823423
const commentsFiltered = commentsCurr.filter(({ id }) => id !== 823423);
console.log('Filtered comments: ', commentsFiltered);


// fill in tables with data
const peopleHtml = people.map(p => `<tr><td>${p.name}</td><td>${p.year}</td></tr>`).join('');
document.getElementById('people-list').insertAdjacentHTML('beforeend', peopleHtml);

const getCommentRow = (c, index = 0) => `<tr>
  <td>${index}</td><td>${c.id}</td>
  <td>${c.text} <span data-id="${c.id}" class="btn-delete" title="delete">❌</span></td>
</tr>`;
const getCommentsHtml = (comments) => comments.map(getCommentRow).join('');
const commentsTable = document.getElementById('comments-table');
commentsTable.insertAdjacentHTML('beforeend', getCommentsHtml(commentsCurr));

// handle user actions
// People
const messagesPeople = {
  everytrue: `Everyone is`,
  everyfalse: `Not everyone is`,
  sometrue: `Some people are`,
  somefalse: `No one is`,
}

const containerMsgPeople = document.getElementById('results-people');

const checkPeople = function (event) {
  event.preventDefault();

  const age = parseInt(this.input.value);
  if (isNaN(age)) {
    containerMsgPeople.innerHTML = `<p class="error">Input must be a number</p>`;
    return;
  }

  // let result = this.action.value === 'every' ? checkAll(currentYear, age) : checkSome(currentYear, age);
  // accessing array method with bracket notation
  let result = people[this.action.value](p => p.year <= (currentYear - age));

  containerMsgPeople.innerHTML = `<p class="result">${messagesPeople[this.action.value + result]} over ${age} years old.<p>`;
}

// Comments

const messagesComments = {
  find: (value, data) => `Found a comment for '${value}'`,
  findIndex: (value, data) => `Element containing '${value}' is at index: ${data}`,
  filter: (value, data) => `Found ${data.length} elements containing '${value}'`,
  none: (value) => `<p class="error">No results for search value '${value}'</p>`,
  empty: 'Input must not be empty',
};

const containerMsgComments = document.getElementById('results-comments');

const searchComments = function (event) {
  event.preventDefault();
  const input = this.input.value;
  const action = this.action.value;

  if (action === 'reset') {
    commentsCurr = comments;
    commentsTable.innerHTML = getCommentsHtml(commentsCurr);
    containerMsgComments.innerHTML = '';
    return;
  }

  if (!input) {
    containerMsgComments.innerHTML = messagesComments.empty;
    return;
  }

  const result = commentsCurr[action](c => c.id.toString().includes(input) || c.text.includes(input));
  
  if (!result || result === -1 || result.length === 0) {
    containerMsgComments.innerHTML = messagesComments.none(input);
    return;
  } else {
    containerMsgComments.innerHTML = messagesComments[action](input, result);
  }
  
  if (Array.isArray(result)) {
    commentsCurr = result;
    commentsTable.innerHTML = getCommentsHtml(result);
  } else if (typeof result === 'object') {
    commentsTable.innerHTML = getCommentRow(result);
  }
}

const deleteComment = function (event) {
  const id = event.target.getAttribute('data-id');
  
  if (id) { 
    commentsCurr = commentsCurr.filter(c => c.id !== +id);
    commentsTable.innerHTML = getCommentsHtml(commentsCurr);
  }
}

document.getElementById('people-actions').addEventListener('submit', checkPeople);
document.getElementById('comments-actions').addEventListener('submit', searchComments);
commentsTable.addEventListener('click', deleteComment);