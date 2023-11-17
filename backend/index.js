const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const env = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const db = mysql.createConnection(configuration);

app.get("/", (req, res) => {
  return res.send("Hello From University Backend");
});

app.get("/clubs", (req, res) => {
  const sql = `SELECT name from club`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/depts", (req, res) => {
  const sql = `Select name from department`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// login
app.post("/login", (req, res) => {
  const { clubName, email, password } = req.body;
  const sql = `Select * from member where club=? and email=? and password=?`;

  db.query(sql, [clubName, email, password], (err, data) => {
    if (err) return res.send("Error occurred during login");

    if (data.length === 0) return res.status(500).send("User not found!");

    return res.json(data);
  });
});

// Registering
app.post("/register", (req, res) => {
  const {
    clubName,
    name,
    email,
    password,
    gender,
    dateOfBirth,
    designation,
    contactNo,
    dept,
  } = req.body;

  const sql = `INSERT INTO incoming_request (name, designation, email, dob, department, gender, club, password, contact_no) VALUES (?,?,?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      name,
      designation,
      email,
      dateOfBirth,
      dept,
      gender,
      clubName,
      password,
      contactNo,
    ],
    (err, _) => {
      if (err) return res.send("Sorry! Please try again");

      return res
        .status(200)
        .send(
          "🎉Your membership request is submitted successfully. You will receive a confirmation email soon"
        );
    }
  );
});

app.get("/upcomingEvents/:email", (req, res) => {
  const { email } = req.params;
  const sql = `SELECT e.*
    FROM event e
    LEFT JOIN participate p ON e.event_id = p.event_id AND p.email =?
    LEFT JOIN volunteer v ON e.event_id = v.event_id AND v.email = ?
    WHERE p.event_id IS NULL AND v.event_id IS NULL`;

  db.query(sql, [email, email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/participatingEvents/:email", (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT e.* FROM participate p LEFT JOIN event e ON e.event_id=p.event_id WHERE p.email=?";

  db.query(sql, [email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/volunteerEvents/:email", (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT e.* FROM volunteer v LEFT JOIN event e ON e.event_id=v.event_id WHERE v.email=?";

  db.query(sql, [email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/events/:club", (req, res) => {
  const { club } = req.params;
  const sql = `SELECT * FROM club where name !=?`;

  db.query(sql, [club], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/participate", (req, res) => {
  const { event_id, club, email } = req.body;

  const sql = "INSERT INTO participate (club, email, event_id) VALUES (?,?,?)";

  db.query(sql, [club, email, event_id], (err, data) => {
    if (err) return res.send("Sorry! Please try again");

    return res.send("🎉Participation Confirmed");
  });
});

app.post("/volunteer", (req, res) => {
  const { event_id, club, email } = req.body;

  const sql = "INSERT INTO volunteer (club, email, event_id) VALUES (?,?,?)";

  db.query(sql, [club, email, event_id], (err, data) => {
    if (err) return res.send("Sorry! Please try again");

    return res.send("🎉Volunteering Confirmed");
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on 7000!");
});
