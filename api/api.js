const { addUser } = require('../database/database.js');
const database = require('../database/database.js')

function newPassword() {
    return (Math.random() + 1).toString(36).substring(7);
}
function getFälligeKarten() {
    cards = cards.filter((e) => {
        e["Fällig"] < Date.now()
    })
}

cards = []
//NUR zum ausprobieren
database.getAlleKarten().then((r) => {
    if (r)
        cards = r.map((e) => { return JSON.parse(e[0]) })
})


function userExists(user) {
    if (database.user[user]) return true; return false
}
function anmeldedatenÜberprüfen(name, password) {

}

function addUser(name) {
    if (userExists(name)) return false;
    pass = newPassword()
    database.addUser(name,pass)
    return pass
}

module.exports = {
    "cards": cards,
    "userExists": userExists,
    "addUser":addUser
}