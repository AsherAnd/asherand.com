import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

function getJSON(db, query, res) {
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
}

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST_URL,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
});

app.use(cors());
app.use("/assets", express.static("./assets"));

app.get("/api", (req, res) => {
  res.json("Welcome to the backend!");
});

app.get("/api/experience", (req, res) => {
  getJSON(db, "SELECT * from experiences ORDER BY `id` desc", res);
});

app.get("/api/experience/:id", (req, res) => {
  getJSON(db, `SELECT * FROM experiences WHERE id= ${req.params.id}`, res);
});

app.get("/api/projects", (req, res) => {
  getJSON(db, "SELECT * FROM projects", res);
});

app.get("/api/projects/:title", (req, res) => {
  getJSON(db, `SELECT * FROM projects WHERE title= "${req.params.title}"`, res);
});

app.get("/api/footers", (req, res) => {
  getJSON(db, "SELECT * FROM footers", res);
});

app.get("/api/footers/:id", (req, res) => {
  getJSON(db, `SELECT * FROM footers WHERE id= ${req.params.id}`, res);
});

app.listen(process.env.PORT, () => {
  console.log("Welcome to the backend!");
});
