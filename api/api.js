import database from '../database/database.js'



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
    return database.cards.map((e) => { return e.id })
}

function getFächer() {
    let f = []
    for (c of database.cards) {
        if (!(f.indexOf(c.Fach) != -1))
            f.push(c.Fach)
    }
    return f
}

function getThemen(fach) {

    let t = []
    cs = database.cards.filter((e) => {
        return e.Fach == fach
    })

    for (c of cs) {

        if (!(t.indexOf(c.Thema) != -1))
            t.push(c.Thema)
    }

    return t
}

function userExists(user) {

    if (_user[user]) return true; return false
}


function addUser(username) {
    if (userExists(username)) return false;
    pass = newPassword()
    console.log("api adduser:")
    console.log(user)
    user[username] = { "passwort": pass }
    generateUserStatus(username)
    database.addUser(username, pass)

    return pass
}

async function generateUserStatus(username) {
    let cardIds = database.cards.map((e) => { return e.id })
    console.log("karten:")
    console.log(cardIds)
    user[username].status = []
    for (id of cardIds) {
        user[username].status.push({
            "id": id,
            "fällig": 0,
            "leichtigkeit": DEFAULT_LEICHTIGKEIT,
            "intervall": DEFAULT_START_INTERVALL,
            "gelernt": []
        })
    }

}
function überprüfePasswort(n, p) {
    console.log("Passwort: " + p)
    console.log("benutzername: " + n)
    console.log("userExists: " + userExists(n))
    console.log(_user[n].passwort)
    console.log(_user)
    if (userExists(n)) {

        return _user[n].passwort == p
    }
    else return false
}

export default {
    "cards": database.cards,
    "userExists": userExists,
    "addUser": addUser,
    "getFächer": getFächer,
    "getThemen": getThemen,
    "überprüfePasswort": überprüfePasswort,
    "DEFAULT_START_INTERVALL": DEFAULT_START_INTERVALL,
    "DEFAULT_LEICHTIGKEIT": DEFAULT_LEICHTIGKEIT,
    "getFälligeKarten": getFälligeKarten
}


//TEST
setTimeout(() => {
    addUser("versuch")

}, 5000)