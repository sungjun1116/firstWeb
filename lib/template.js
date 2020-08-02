exports.HTML = (title, list, body, control) => {
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB2 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
}

exports.list = topics => {
  let list = '<ul>';
  let i = 0;
  while (i < topics.length) {
    list = list + `<li><a href="/topic/${topics[i].id}">${topics[i].title}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

exports.authorSelect = (authors, author_id) => {
  let tag = '';
  let i = 0;
  while (i < authors.length) {
    let selected;
    if (author_id === authors[i].id) {
      selected = ' selected'
    }
    tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`
    i++;
  }
  return `<select name="author">
      ${tag}
      </select>
      `
}
// module.exports = {
//   HTML: (title, list, body, control) => {
//     return `
//     <!doctype html>
//     <html>
//     <head>
//       <title>WEB2 - ${title}</title>
//       <meta charset="utf-8">
//     </head>
//     <body>
//       <h1><a href="/">WEB</a></h1>
//       ${list}
//       ${control}
//       ${body}
//     </body>
//     </html>
//     `;
//   }, list: (topics) => {
//     let list = '<ul>';
//     let i = 0;
//     while (i < topics.length) {
//       list = list + `<li><a href="/topic/${topics[i].id}">${topics[i].title}</a></li>`;
//       i = i + 1;
//     }
//     list = list + '</ul>';
//     return list;
//   }, authorSelect: (authors, author_id) => {
//     let tag = '';
//     let i = 0;
//     while (i < authors.length) {
//       let selected;
//       if (author_id === authors[i].id) {
//         selected = ' selected'
//       }
//       tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`
//       i++;
//     }
//     return `<select name="author">
//     ${tag}
//     </select>
//     `
//   }
// }
