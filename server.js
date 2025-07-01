const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy list of Raspberry/scale combinations
const availableScales = [
  { id: 'rpi1-com1', label: 'Raspberry Pi 1 - Scale 1' },
  { id: 'rpi1-com2', label: 'Raspberry Pi 1 - Scale 2' },
  { id: 'rpi2-com1', label: 'Raspberry Pi 2 - Scale 1' }
];

// Session (non-persistent)
app.use(session({
  secret: 'scale-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    req.session.isAdmin = true;
    return res.sendStatus(200);
  }
  res.status(401).send('Invalid credentials');
});

app.get('/api/scales', (req, res) => {
  res.json(availableScales);
});

app.post('/api/set-scales', (req, res) => {
  if (!req.session.isAdmin) return res.status(403).send('Forbidden');
  const { selectedScales } = req.body;
  req.session.selectedScales = selectedScales;
  res.sendStatus(200);
});

app.get('/api/get-scales', (req, res) => {
  res.json(req.session.selectedScales || [availableScales[0]]);
});

app.get('/api/weight/:scaleId', (req, res) => {
  const scaleId = req.params.scaleId;
  const dummyData = {
    weight: Math.floor(Math.random() * 100),
    tare: Math.floor(Math.random() * 10)
  };
  res.json(dummyData);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
