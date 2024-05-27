const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const data = [
  { name: "hans", age: 17, id: 0 },
  { name: "paul", age: 17, id: 1 },
  { name: "peter", age: 17, id: 2 },
  { name: "sepp", age: 17, id: 3 },
];

app.get("/people", async (req, res) => {
  try {
    let result = await db.query("SELECT * from people");
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

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
