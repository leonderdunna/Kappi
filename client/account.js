

var angemeldet = localStorage.getItem('angemeldet')
var benutzernameRegistrieren
var user;

if (angemeldet) {
    for (e of document.getElementsByClassName("anmelden"))
        e.style.display = "none";
    for (e of document.getElementsByClassName("registrieren"))
        e.style.display = "none";

    user = JSON.parse(localStorage.getItem("user"))

    document.getElementById("nameLabel").textContent = "Benutzername: " + user.name


} else {
    for (e of document.getElementsByClassName("angemeldet"))
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

function abmelden(){
    localStorage.clear();
    location.reload();
}
function passwortAnzeigen(){
    document.getElementById("passwortLabel").textContent="Passwort: "+user.passwort
    setTimeout(()=>{
        document.getElementById("passwortLabel").innerHTML ='Passwort: <a onclick="passwortAnzeigen()" href="#" class="btn btn-primary my-3">Passwort anzeigen</a>'
    },3000)
}

function anmelden(n, p) {
    überprüfePasswort(n, p).then((r) => {
        console.log(r)
        if (r) {
            
            user = { "name": n, "passwort": p }
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("angemeldet","true")
            location.reload()
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