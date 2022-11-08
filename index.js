require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_HOST || null);

const resolvers = require("./resolvers");

var token = null;

const checkAuth = (req, res, next) => {
  if (!req.body.token) return res.send({ error: "Błąd autoryzacji" });
  if (req.body.token !== token) return res.send({ error: "Błąd autoryzacji" });
  next();
};

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send({ serverAlive: true }));

app.post("/login", (req, res) => {
  if (!req.body.password) return res.send({ error: "Nie wprowadzono hasła" });
  if (req.body.password !== process.env.PAGE_PASSWORD)
    return res.send({ error: "Hasło jest nieprawidłowe" });
  let generatedToken = uuidv4();
  token = generatedToken;
  res.send({ token: generatedToken });
});

app.delete("/login", (req, res) => {
  token = null;
  res.send({ success: true });
});

app.post("/load", checkAuth, async (req, res) => {
  res.send(await resolvers.record.getRecords());
});

app.post("/data", checkAuth, async (req, res) => {
  res.send(await resolvers.record.addRecord(req.body));
});

app.put("/data", checkAuth, async (req, res) => {
  res.send(await resolvers.record.editRecord(req.body));
});

app.delete("/data", checkAuth, async (req, res) => {
  res.send(await resolvers.record.deleteRecord(req.body));
});

app.listen(PORT, () => console.log("Server is listening on port " + PORT));
