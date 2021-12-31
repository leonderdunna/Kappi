
const server = "http://localhost:3000/"

function getCard() {
    //card = await fetch()
    fetch(server + 'card')
        .then(response => response.json())
        .then(data => { console.log(data); card = data; refreschUI(); console.log(card) })
        .catch(err => console.error(err));
}

async function userExists(user) {
    r = await fetch(server + 'userExists/' + user)
    r = r.json()
    return r
}

function registrieren() {
//TODO ist der benutzer schon benutzt?
    fetch(server + "adduser/" + benutzernameRegistrieren).then(r => r.json()).then(
        (r) => {
            console.log(r)
            document.getElementById("passwort").textContent =r

            for (e of document.getElementsByClassName("anmelden"))
                e.style.display = "none";
            for (e of document.getElementsByClassName("registrieren"))
                e.style.display = "none";

            document.getElementById("registrierungAbschließen").style.display="block"
            angemeldet=true
            localStorage.setItem("angemeldet",true)
        }
    )

}

api = {
    "getCard": getCard,
    "userExists": userExists,
    "registrieren": registrieren
}