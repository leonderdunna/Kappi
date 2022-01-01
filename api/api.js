const database = require('../database/database.js')

function newPassword() {
    return (Math.random() + 1).toString(36).substring(7);
}
function getFälligeKarten(user) {
    //TODO 
    cards = cards.filter((e) => {
        e["Fällig"] < Date.now()
    })
}

cards = []
//NUR zum ausprobieren
database.getAlleKarten().then((c) => {
    cards = c
})

function getFächer() {
    let f = []
    for (c of cards) {
        if (!f.indexOf(c.Fach) != -1) {
            f.push(c.Fach)
        }
    }
    return f
}

function getThemen(fach) {
    let t = []
    console.log(cards)
    console.log(fach)
    cs = cards.filter((c) => {console.log(c.Fach); return true })//TODO warum ist das Array cs immer Leer??????
    console.log(cs)
    for (c of cs) {
        if (!t.indexOf(c.Thema != -1))
            r.push(c.Thema)
    }
    return t
}

function userExists(user) {

    if (database.user[user]) return true; return false
}
function anmeldedatenÜberprüfen(name, password) {

}

function addUser(name) {
    console.log(name)
    if (userExists(name)) return false;
    pass = newPassword()
    database.addUser(name, pass)
    return pass
}

module.exports = {
    "cards": cards,
    "userExists": userExists,
    "addUser": addUser,
    "getFächer": getFächer,
    "getThemen": getThemen
}