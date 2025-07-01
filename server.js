const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true
}));

// Fake credentials (you can enhance this)
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'password';

// API: Get weight data (for future use)
app.get('/api/weight', (req, res) => {
  res.json({ weight: 1234, tare: 150 });
});

// POST login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false });
});

// POST logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Serve index.html (main UI)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/settings', (req, res) => {
  const settingsPath = path.join(__dirname, 'public', 'settings.html');
  console.log('Serving settings.html from:', settingsPath);
  res.sendFile(settingsPath);
});
// Serve settings page (only for admin)
app.get('/settings', (req, res) => {
  if (!req.session.isAdmin) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
