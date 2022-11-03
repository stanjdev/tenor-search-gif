const express = require('express');
const handlebars = require('express-handlebars');
const Tenor = require('tenorjs').client({
  "Key": "M0CEO4N4KXT1",
  "Filter": "high",
  "Locale": "en_US",
})
const bodyParser = require('body-parser');

// https://www.npmjs.com/package/express-sanitizer
const expressSanitizer = require('express-sanitizer');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSanitizer());

// Middleware
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');

// Routes
app.get('/', (req, res) => {
  term = ""
  if (req.query.term) {
    term = req.query.term
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, "10")
    .then((response) => {
      const gifs = response;
      res.render('home', { gifs })
    }).catch(console.error);
});

// EXPRESS-SANITIZER POST REQ.BODY SEARCH TERM
app.post('/', (req, res) => {
  term = ""
  if (req.body.post_term) {
    term = req.sanitize(req.body.post_term);
  }
  Tenor.Search.Query(term, "10")
    .then((response) => {
      const gifs = response;
      res.render('home', { gifs, term })
    }).catch(console.error);
});

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name;
  res.render('greetings', { name });
})

// Start Server

app.listen(3000, () => {
  console.log('Gif search listening on port localhost:3000');
})
