const express = require("express");
const path = require("path");
const fs = require("fs");
const auth = require("./auth");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

let settings = require("./settings.json");

// Admin login to update scale ↔ raspberry mapping
app.post("/api/set-config", auth, (req, res) => {
  settings = req.body;
  fs.writeFileSync("settings.json", JSON.stringify(settings, null, 2));
  res.status(200).send("Settings updated");
});

// Fetch layout & weights
app.get("/api/layout", (req, res) => {
  res.json(settings);
});

// Raspberry sends weights
app.post("/api/submit-weight", (req, res) => {
  const { raspberryId, scaleId, weight, tare } = req.body;
  if (!settings[raspberryId]) settings[raspberryId] = {};
  settings[raspberryId][scaleId] = { weight, tare, time: new Date() };
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
