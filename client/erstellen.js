

//angemeldet Prüfen
if(!localStorage.getItem("angemeldet")){
    location.href= "./account.html"
}

function vorschlagen() {
    let frage = document.getElementById("frageinput").value;
    let antwort = document.getElementById("antwortinput").value;
    let fach = document.getElementById("fachselect").value;
    let thema = document.getElementById("themaselect").value;
    let korrekturen = [] // bleibt leer ... leere korrekturen gibt an, dass es sich bis auf weiteres nur um einenvorschlag handelt

    send({
        "Frage": frage,
        "Antwort": antwort,
        "Fach": fach,
        "Thema": thema,
        "Korrekturen": korrekturen,
        "author":user.name,
        "Zustand": "vorschlag"
    })
    verwerfen()
}
function hinzufügen() { //TODO rückmeldung ob die karte hinzugefügt wurde
    let frage = document.getElementById("frageinput").value;
    let antwort = document.getElementById("antwortinput").value;
    let fach = document.getElementById("fachselect").value;
    let thema = document.getElementById("themaselect").value;
  
    send({
        "Frage": frage,
        "Antwort": antwort,
        "Fach": fach,
        "Thema": thema,
        "author":user.name 
    })
    verwerfen()
}
function verwerfen() {
    document.getElementById("frageinput").value = "";
    document.getElementById("antwortinput").value = "";
    document.getElementById("fachselect").value = 0;
    document.getElementById("themaselect").value = 0;
}

async function send(card) {
await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    });

}