
const express = require("express")
const bodyParser = require('body-parser');

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const data =[
    {name:"hans", age: 17},
    {name:"paul", age: 17},
    {name:"peter", age: 17},
    {name:"sepp", age: 17},
]


app.get("/people", (req, res)=>
{
    res.send(data);
});

app.post("/people",(req,res)=>{
    console.log(req.body);
    res.send("thanks");
});

app.listen(port, ()=>{
    console.log("Server is running on port: " + port);
});
