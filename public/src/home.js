function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const result = books.filter((book) => book.borrows[0].returned === false).length;
  return result;
}

function getMostCommonGenres(books) {
  const countBooksPerGenre = books.reduce((sums, entry) => {
    sums[entry.genre] = (sums[entry.genre] || 0) + 1;
    return sums;
  }, {});
  let result = [];
  for (const [key, value] of Object.entries(countBooksPerGenre)) {
    result.push({
      'name': key,
      'count': value,
    });
    }
  return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularBooks(books) {
  const result = books.reduce((counts, book) => {
    counts.push({
      name: book.title,
      count: book.borrows.length,
    });
    return counts;
  }, []);
  return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // const result = books.reduce((counts, book) => {
  //   const authorId = book.authorId;
  //   const author = authors.find((author) => author.id === authorId);
  //   const authorName = author.name.first + ' ' + author.name.last;
  //   const found = counts.find((count) => count.name === authorName);
  //   if (typeof found === 'undefined') {
  //     counts.push({
  //       name: authorName,
  //       count: 1,
  //     });
  //   } else {
  //     found.count++;
  //   }
  //   return counts;
  // }, []);
  // return result.sort((a, b) => b.count - a.count).slice(0, 5);

  // const popularAuthors = books.reduce((sums, entry) => {
  //   sums[entry.authorId] = (sums[entry.authorId] || 0) + 1;
  //   return sums;
  // }, {});
  // let result = [];
  // for (const [key, value] of Object.entries(popularAuthors)) {
  //   const author = authors.find((author) => String(author.id) === key);
  //   result.push({
  //     'name': author.name.first + ' ' + author.name.last,
  //     'count': value,
  //   });
  // }
  const popularity = books.reduce((counts, book) => {
    counts.push({
      name: book.authorId,
      count: book.borrows.length,
    });
    return counts;
  }, []);
  
  for (let i=0; i<popularity.length; i++) {
    const author = authors.find((author) => author.id === popularity[i].name);
    console.log(author);
    popularity[i].name = author.name.first + ' ' + author.name.last;
  }
  return popularity.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
