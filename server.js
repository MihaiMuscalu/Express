
const express = require("express")
const bodyParser = require('body-parser');
const db = require("./db");

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const data =[
    {name:"hans", age: 17,id:0},
    {name:"paul", age: 17,id:1},
    {name:"peter", age: 17 ,id:2},
    {name:"sepp", age: 17,id:3}
]


app.get("/people", async (req, res)=>{
    try {
        console.log("In people");
        let result = await db.query("SELECT * from people")
        res.send(result);
    } catch (error) {
        res.status(404).send(error.message);
    }

});


app.post("/people",async (req,res)=>{
    let person = req.body;
    let sql = "insert into people values(?,?,?)";
    try {
        console.log("In people");
        let result = await db.query(sql, [2,person.firstname, person.lastname])
        res.send(result);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.delete("/people/:id", (req,res)=>{
    let id = req.params.id;
    data.splice(id, 1);
    res.send("done")
})

app.listen(port, ()=>{
    console.log("Server is running on port: " + port);
});
