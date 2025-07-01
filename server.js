const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let availableScales = ['Raspberry1-Scale1', 'Raspberry1-Scale2', 'Raspberry2-Scale1'];
let selectedScales = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

function isAuthenticated(req) {
  return req.session && req.session.authenticated;
}

// Serve main UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    req.session.authenticated = true;
    res.redirect('/settings');
  } else {
    res.redirect('/login?error=1');
  }
});

// Settings page (protected)
app.get('/settings', (req, res) => {
  if (!isAuthenticated(req)) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.post('/save-settings', (req, res) => {
  if (!isAuthenticated(req)) {
    return res.sendStatus(403);
  }
  selectedScales = req.body.selectedScales || [];
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// APIs
app.get('/api/scales', (req, res) => {
  res.json(availableScales);
});

app.get('/api/selected', (req, res) => {
  res.json(selectedScales);
});

app.get('/api/weight/:scaleId', (req, res) => {
  const { scaleId } = req.params;
  res.json({ weight: Math.floor(Math.random() * 300), tare: Math.floor(Math.random() * 10) });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
