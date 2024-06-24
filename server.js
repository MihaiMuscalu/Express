const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

//Get all people
app.get("/people", async (req, res) => {
  try {
    let result = await db.query("SELECT * from people");
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Get a person by ID
app.get("/people/:PN", async (req, res) => {
  try {
    let sql = "SELECT * from people where ID=?";
    let result = await db.query(sql, [req.params.PN]);
    if (result.length === 0) {
      res.status(404).send("Person not found");
    } else {
      res.send(result[0]);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Get people by search term
app.get("/people/search/:term", async (req, res) => {
  try {
    let term = "%" + req.params.term + "%";
    let sql = "SELECT * from people where firstname LIKE ? OR lastname LIKE ?";
    let result = await db.query(sql, [term, term]);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Insert a person
app.post("/people", async (req, res) => {
  let person = req.body;
  let sql = "insert into people values(?,?,?)";
  let id = "SELECT MAX(ID) FROM people";
  try {
    let result = await db.query(sql, [
      parseInt(id) + 1,
      person.firstname,
      person.lastname,
    ]);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Update a person by ID
app.put("/people/:PN", async (req, res) => {
  try {
    let person = req.body;
    let sql = "update people set firstname=?,lastname=? where id=?";
    let result = await db.query(sql, [
      person.firstname,
      person.lastname,
      req.params.PN,
    ]);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Delete a person by ID
app.delete("/people/:PN", async (req, res) => {
  console.log(req.params.PN);
  try {
    let id = "delete from people where ID=?";
    let result = await db.query(id, [req.params.PN]);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
