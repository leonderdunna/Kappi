



//RUBRIKEN
//Rubriken werden erstmal als zahl gespeichert, macht es vielleicht einfacher in den Statistiken später diagramme zu erstellen
const RUBRIK_NEU = 0;
const RUBRIK_LERNEN = 1;
const RUBRIK_ERNEUT_LERNEN = 2;
const RUBRIK_JUNG = 3;
const RUBRIK_ALT = 4;

//ANTWORTEN
const ANTWORT_NOCHMAL = 0;
const ANTWORT_SCHWIERIG = 1;
const ANTWORT_GUT = 2;
const ANTWORT_EINFACH = 3;

var user;
if (localStorage.getItem("angemeldet")) {
    user = JSON.parse(localStorage.getItem("user"))
}


var server = "http://localhost:3000/"
if (localStorage.getItem("server"))
    server = localStorage.getItem("server")

async function getCard(manuell) {
    //card = await fetch()
    if (manuell) {
        c = await fetch(server + 'card/' + user.name)
        return c.json()
    }
    fetch(server + 'card/' + user.name)//TODO user.name nötigenfalls ändern
        .then(response => response.json())
        .then(data => { console.log(data); card = data; refreschUI(); console.log(card) })
        .catch(err => console.error(err));
}

async function lernen(id, antwort) {
    await fetch(server + "lernen", { method: 'POST', body: JSON.stringify({ "id": id, "antwort": antwort, "username": user.name, "passwort": user.passwort }) })
    getCard()
}


async function userExists(user, registrieren = false) {
    r = await fetch(server + 'userExists/' + user)
    r = r.json()
    if (registrieren && r) {
        fetch(server + "adduser/" + user).then(r => r.json()).then(
            (r) => {
                if (r) {
                    document.getElementById("passwort").textContent = r

                    for (e of document.getElementsByClassName("anmelden"))
                        e.style.display = "none";
                    for (e of document.getElementsByClassName("registrieren"))
                        e.style.display = "none";

                    document.getElementById("registrierungAbschließen").style.display = "block"
                    angemeldet = true
                    localStorage.setItem("angemeldet", true)

                    user = { "name": user, "passwort": r }
                    localStorage.setItem("user", JSON.stringify(user))

                }
            }
        )
    }
    return r
}

function registrieren() {
    //TODO ist der benutzer schon benutzt?
    userExists(benutzernameRegistrieren, true)
}

function speichern(variable, wert) {
    localStorage.setItem(variable, wert)
    location.reload()
}
async function getFächer() {
    f = await fetch(server + "faecher")
    f = f.json()
    return f
}
async function getThemen(fach) {
    t = await fetch(server + "themen/" + fach)
    t = t.json()
    return t
}
async function überprüfePasswort(n, p) {
    a = await fetch(server + "anmelden/" + n + "/" + p)
    a = a.json()
    return a
}

api = {
    "getCard": getCard,
    "userExists": userExists,
    "registrieren": registrieren
}