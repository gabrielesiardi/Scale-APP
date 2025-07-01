const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let config = {
  left: null,
  right: null
};

// Get selected scales (public endpoint)
app.get('/api/config', (req, res) => {
  res.json(config);
});

// Save selected Raspberry/Scale combos (admin use)
app.post('/api/config', (req, res) => {
  const { left, right } = req.body;
  config.left = left || null;
  config.right = right || null;
  console.log('Updated config:', config);
  res.sendStatus(200);
});

// Simple non-persistent login simulation
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
