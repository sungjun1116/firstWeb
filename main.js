const express = require('express')
const app = express()
const port = 3000
// const sanitizeHtml = require('sanitize-html')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const topicRouter = require('./routes/topic')
const indexRouter = require('./routes/index')
const db = require('./lib/db')

// Using static file service
app.use(express.static('public'));

// Using middleware
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }))  // 최신Express에선 body-parser를 따로 요청하지 않아도 req.body사용 가능
app.use(helmet())

// Writing middleware
app.get('*', (req, res, next) => {
  db.query(`SELECT * FROM TOPIC`, (err, topics) => {
    if (err) {
      next(err);
    }
    req.list = topics;
    next();
  });
});

// Router
app.use('/', indexRouter);
app.use('/topic', topicRouter);

// Error Handling
app.use((req, res, next) => {
  res.status(404).send('404 Page not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Not exist')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
