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
app.get("/userExists/:user", (req, res) => {

    res.end(JSON.stringify(api.userExists(req.params.user)))
})
app.get("/adduser/:username", (req, res) => {
    res.end(JSON.stringify(api.addUser(req.params.username)))
})
app.get("/faecher", (req, res) => {
    res.end(JSON.stringify(api.getFächer()))
})
app.get("/themen/:fach", (req, res) => {
    res.end(JSON.stringify(api.getThemen(req.params.fach)))
    console.log(api.getThemen(req.params.fach))
})


app.listen(port, () => { console.log("server wird gestartet") })

