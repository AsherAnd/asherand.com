import express from "express";
import mysql from "mysql";
import cors from "cors";

function getJSON(query, res) {
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
}

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "asherand",
});

app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to the backend!");
});

app.get("/experience", (req, res) => {
  getJSON("SELECT * from experiences ORDER BY `id` desc", res);
});

app.get("/projects", (req, res) => {
  getJSON("SELECT * FROM projects", res);
});

app.get("/footers", (req, res) => {
  getJSON("SELECT * FROM footers", res);
});

app.listen(3050, () => {
  console.log("Welcome to the backend!");
});
