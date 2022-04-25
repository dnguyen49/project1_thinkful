function findAccountById(accounts, id) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) {
      return accounts[i];
    }
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a,b) => (a.name.last > b.name.last) ? 1 : ((b.name.last > a.name.last) ? -1 : 0));
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  for (let i=0; i<books.length; i++) {
    result += books[i].borrows.filter((borrow) => borrow.id === account.id).length;
  }
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  console.log(account.id);
  let results = [];
  for (let i=0; i<books.length; i++) {
    const found = books[i].borrows.find((borrow) => borrow.id === account.id && borrow.returned === false);
    if (typeof found!=='undefined') {
      const authorId = books[i].authorId;
      const author = authors.find((author) => author.id === authorId).name;
      books[i]['author'] = {};
      books[i]['author']['name'] = author;
      results.push(books[i]);
    }
  }
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
