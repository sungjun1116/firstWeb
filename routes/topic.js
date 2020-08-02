const express = require('express')
const router = express.Router()
const path = require('path')
const template = require('../lib/template')
const db = require('../lib/db')


router.get('/create', (req, res) => {
  db.query(`SELECT * FROM AUTHOR`, (err, authors) => {
    if (err) {
      next(err)
    }
    const title = 'Create';
    const list = template.list(req.list);
    const html = template.HTML(title, list,
      `<form action="/topic/create" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              ${template.authorSelect(authors)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`,
      ``
    );
    res.send(html);
  });
});

router.post('/create', (req, res, next) => {
  const post = req.body;
  const title = post.title;
  const description = post.description;
  const author = post.author;
  db.query(`Insert INTO TOPIC (title, description, created, author_id) 
  VALUES(?,?,NOW(),?)`, [title, description, author], (err, result) => {
    if (err) {
      next(err)
    }
    res.redirect(`/topic/${result.insertId}`);
  });
});

router.get('/update/:pageId', (req, res, next) => {
  const filteredId = path.parse(req.params.pageId).base;
  db.query(`SELECT * FROM topic WHERE id=?`, [filteredId], (err, topic) => {
    if (err) {
      next(err)
    }
    db.query(`SELECT * FROM AUTHOR`, (err2, authors) => {
      if (err2) {
        next(err2)
      }
      const title = topic[0].title;
      const list = template.list(req.list);
      const html = template.HTML(title, list,
        `<form action="/topic/update" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p>
                <textarea name="description" placeholder="description">${topic[0].description}</textarea>
              </p>
              <p>
                ${template.authorSelect(authors, topic[0].author_id)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>`, `<a href="/topic/create">create</a>`
      );
      res.send(html);
    });
  });
});

router.post('/update', (req, res, next) => {
  const post = req.body;
  const id = post.id;
  const title = post.title;
  const description = post.description;
  const author = post.author;
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`, [title, description, author, id], (err, result) => {
    if (err) {
      next(err);
    }
    res.redirect(`/topic/${id}`);
  });
});

router.post('/delete', (req, res, next) => {
  const post = req.body
  const id = post.id;
  const filteredId = path.parse(id).base;
  db.query(`DELETE FROM topic WHERE id = ?`, [filteredId], (err, result) => {
    if (err) {
      next(err)
    }
    res.redirect(`/`);
  });
});

router.get('/:pageId', (req, res, next) => {
  const filteredId = path.parse(req.params.pageId).base;
  const query = db.query(`SELECT * FROM topic join author on topic.author_id =author.id WHERE topic.id=?`, [filteredId], (err, topic) => {
    if (err) {
      next(err);
    };
    const title = topic[0].title;
    const description = topic[0].description;
    const list = template.list(req.list);
    const html = template.HTML(title, list,
      `<h2>${title}</h2>${description} <p>by ${topic[0].name}</p>`,
      `<a href="/topic/create">create</a>
        <a href="/topic/update/${filteredId}">update</a>
        <form action="/topic/delete" method="post">
          <input type="hidden" name="id" value="${filteredId}">
          <input type="submit" value="delete">
        </form>`
    );
    console.log(query.sql);
    res.send(html);
  });
});

module.exports = router;
