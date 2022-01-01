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
        if (!(f.indexOf(c.Fach) != -1))
            f.push(c.Fach)
    }
    return f
}

function getThemen(fach) {

    let t = []
    cs = cards.filter((e) => {
        return e.Fach == fach
    })

    for (c of cs) {

        if (!(t.indexOf(c.Thema) != -1))
            t.push(c.Thema)
    }

    return t
}

function userExists(user) {

    if (database.user[user]) return true; return false
}
function anmeldedatenÜberprüfen(name, password) {

}

function addUser(name) {
    if (userExists(name)) return false;
    pass = newPassword()
    database.addUser(name, pass)
    return pass
}
function überprüfePasswort(n,p){
    console.log(user)
    return database.user.n.passwort = p
}

module.exports = {
    "cards": cards,
    "userExists": userExists,
    "addUser": addUser,
    "getFächer": getFächer,
    "getThemen": getThemen,
    "überprüfePasswort":überprüfePasswort
}