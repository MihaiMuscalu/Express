
const express = require("express")
const bodyParser = require('body-parser');

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


app.get("/people", (req, res)=>{
    res.send(data);
});

app.get("/people/:id", (req, res)=>{
    let id = req.params.id;
    res.send(data[id]);
});

app.post("/people",(req,res)=>{
    data.push(req.body);

    res.send(req.body);
});

app.delete("/people/:id", (req,res)=>{
    let id = req.params.id;
    data.splice(id, 1);
    res.send("done")
})

app.listen(port, ()=>{
    console.log("Server is running on port: " + port);
});
