var angemeldet = localStorage.getItem('angemeldet')

if (angemeldet) {
    for (e of document.getElementsByClassName("anmelden"))
        e.style.display = "none";
    for (e of document.getElementsByClassName("registrieren"))
        e.style.display = "none";
}
else {
    for (e of document.getElementsByClassName("einstellungen"))
        e.style.display = "none";
}