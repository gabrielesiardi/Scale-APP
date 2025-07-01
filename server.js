const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

let sessionScales = {
  left: null,
  right: null
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to save scale selections
app.post('/api/set-scales', (req, res) => {
  const { left, right } = req.body;
  sessionScales.left = left;
  sessionScales.right = right;
  res.sendStatus(200);
});

// Endpoint to get current scale selections
app.get('/api/get-scales', (req, res) => {
  res.json(sessionScales);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
