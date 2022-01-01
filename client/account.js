

var angemeldet = localStorage.getItem('angemeldet')
var benutzernameRegistrieren

if (angemeldet) {
    for (e of document.getElementsByClassName("anmelden"))
        e.style.display = "none";
    for (e of document.getElementsByClassName("registrieren"))
        e.style.display = "none";
}


else {
    for (e of document.getElementsByClassName("einstellungen"))
        e.style.display = "none";


    setInterval(() => {
        if (benutzernameRegistrieren != document.getElementById("benutzernameinputregistrieren").value && document.getElementById("benutzernameinputregistrieren").value != "") {
            benutzernameRegistrieren = document.getElementById("benutzernameinputregistrieren").value;
            api.userExists(benutzernameRegistrieren).then((r) => {
                if (r) {
                    document.getElementById("benutzernameinputregistrieren").style.color = "red"
                    document.getElementById("benutzernameSchonVergeben").textContent = "Der Benutzername " + benutzernameRegistrieren + " ist schon vergeben."
                }
                else {
                    document.getElementById("benutzernameinputregistrieren").style.color = "black"
                    document.getElementById("benutzernameSchonVergeben").textContent = ""

                }
            })
        }
    }, 200)
}

function anmelden(n, p) {
    überprüfePasswort(n, p).then((r) => {
        if (r) {

        }
        else {
            userExists(n, false).then((r) => {
                if (!r) {
                    document.getElementById("error").textContent = "Dieser benutzername existiert noch nicht. Bitte registrieren sie sich"
                }
                else {
                    document.getElementById("error").textContent = "Passwort ist Falsch"

                }
            })
        }
    })
}