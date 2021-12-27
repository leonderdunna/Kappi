const express = require("express")
const app = express();
const port = 3000
const database = require("./database/database")


function getFälligeKarten() {
    cards = cards.filter((e) => {
        e["Fällig"] < Date.now()
    })
}

cards = []
//NUR zum ausprobieren
 database.getAlleKarten().then((r)=>{cards = r})



app.use(express.static('./client'))
app.use(express.json())

app.post("/add", (req, res) => {
    card = req.body
    card.Like =[]
    cards.push(card);
    console.log(cards)
})
app.get("/card", (req, res) => {
    if (cards.length < 1) res.end(JSON.stringify({ "stat": "fertig" }))
    res.end(JSON.stringify(cards[0]))
})

app.listen(port, () => { console.log("server wird gestartet") })


database.addUser("helmuth")