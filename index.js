const express = require("express")
const app = express();
const port = 3000


app.use(express.static('./client'))
app.use(express.json())

app.post("/add",(req,res)=>{
    console.log(req.body)
})

app.listen(port, ()=>{console.log("server wird gestartet")})