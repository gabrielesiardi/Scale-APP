const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  session({
    secret: "secureScaleSessionKey",
    resave: false,
    saveUninitialized: true
  })
);

// Serve index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve settings if logged in
app.get("/settings", (req, res) => {
  if (req.session.isAuthenticated) {
    res.sendFile(path.join(__dirname, "public", "settings.html"));
  } else {
    res.redirect("/");
  }
});

// Login (POST)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    req.session.isAuthenticated = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// API: Save selected scales
app.post("/set-scales", (req, res) => {
  req.session.selectedScales = req.body.scales;
  res.json({ success: true });
});

// API: Get selected scales
app.get("/get-scales", (req, res) => {
  res.json({ scales: req.session.selectedScales || [] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
