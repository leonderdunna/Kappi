const express = require("express")
const app = express();
const port = 3000
const api = require('./api/api.js')





app.use(express.static('./client'))
app.use(express.json())

app.post("/add", (req, res) => {
    card = req.body
    card.Like = []
    cards.push(card);
    api.karteSpeichern(cards)
})
app.get("/card", (req, res) => {
    if (cards.length < 1) res.end(JSON.stringify({ "stat": "fertig" }))
    res.end(JSON.stringify(cards[0]))
})

//app.listen(port, () => { console.log("server wird gestartet") })
// setInterval(()=>{
// console.log(cards)},10000)


