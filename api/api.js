const { user } = require('../database/database.js');
const database = require('../database/database.js')



//Standardwerte
const DEFAULT_LEICHTIGKEIT = 250;
const DEFAULT_START_INTERVALL = 1000 * 60 * 60
const NEUE_KARTEN_PRO_TAG = 10


function newPassword() {

    //Erstellt eine zufällige 5stellige zeichenkette
    return (Math.random() + 1).toString(36).substring(7);
}
function getFälligeKarten(userName) {
    //TODO 
    let cs = user[userName].status.filter((e) => {
        return e["fällig"] < Date.now()
    })
    cs = cs.sort((a, b) => { if (a.fällig < b.fällig) return 1; else return -1 })
    console.log(cs)

}

function getErledigteKarten(username, bedingungen) {
    let startzeit = Date.now() - 1000 * 60 * 60 * 24
    let endzeit = Date.now()
    cs = []

    for (card of user[username].status) {
        if (card.gelernt.length > 0)
            if (card.gelernt.at(-1) < endzeit && card.gelernt.at(-1) > startzeit)
                cs.push(card)
    }

    if (bedingungen.neu) {
        cs.filter((e) => {
            return e.fällig == 0
        })
    }

    //TODO weitere bedingungen könnten kommen

    return cs

}

function getCardIds() {
    return cards.map((e) => { return e.id })
}

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


function addUser(name) {
    if (userExists(name)) return false;
    pass = newPassword()
    database.addUser(name, pass)
    return pass
}
function überprüfePasswort(n, p) {
    console.log("Passwort: " + p)
    console.log("benutzername: " + n)
    console.log("userExists: " + userExists(n))
    console.log(database.user[n].passwort)
    console.log(database.user)
    if (userExists(n)) {

        return database.user[n].passwort == p
    }
    else return false
}

module.exports = {
    "cards": cards,
    "userExists": userExists,
    "addUser": addUser,
    "getFächer": getFächer,
    "getThemen": getThemen,
    "überprüfePasswort": überprüfePasswort,
    "DEFAULT_START_INTERVALL": DEFAULT_START_INTERVALL,
    "DEFAULT_LEICHTIGKEIT": DEFAULT_LEICHTIGKEIT
}