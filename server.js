const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secure-key',
  resave: false,
  saveUninitialized: false
}));

// In-memory "database"
const settings = {
  left: { raspberry: null, scale: null },
  right: { raspberry: null, scale: null }
};

const USERS = {
  admin: 'adminpass' // replace with secure credentials or use environment variables
};

// Routes
app.post('/api/submit', (req, res) => {
  const { sscc, weight, tare } = req.body;
  console.log(`SSCC=${sscc}, Weight=${weight}, Tare=${tare}`);
  res.sendStatus(200);
});

app.get('/api/config', (req, res) => {
  res.json(settings);
});

app.post('/api/config', (req, res) => {
  if (!req.session.isAdmin) return res.status(401).send('Unauthorized');
  const { left, right } = req.body;
  settings.left = left;
  settings.right = right;
  res.sendStatus(200);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] === password) {
    req.session.isAdmin = true;
    return res.sendStatus(200);
  }
  res.status(401).send('Invalid credentials');
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.sendStatus(200));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
