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


module.exports = {

}