var server = "http://localhost:3000/"
if (localStorage.getItem("server"))
    server = localStorage.getItem("server")

function getCard() {
    //card = await fetch()
    fetch(server + 'card')
        .then(response => response.json())
        .then(data => { console.log(data); card = data; refreschUI(); console.log(card) })
        .catch(err => console.error(err));
}

async function userExists(user, registrieren = false) {
    r = await fetch(server + 'userExists/' + user)
    r = r.json()
    if (registrieren && r) {
        fetch(server + "adduser/" + user).then(r => r.json()).then(
            (r) => {

                document.getElementById("passwort").textContent = r

                for (e of document.getElementsByClassName("anmelden"))
                    e.style.display = "none";
                for (e of document.getElementsByClassName("registrieren"))
                    e.style.display = "none";

                document.getElementById("registrierungAbschließen").style.display = "block"
                angemeldet = true
                localStorage.setItem("angemeldet", true)
                localStorage.setItem("name", user)
                localStorage.setItem("passwort", r)
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
    console.log(t)
    return t

}

api = {
    "getCard": getCard,
    "userExists": userExists,
    "registrieren": registrieren
}