//TODO erstelen der karten ID über zufälligen string ähnlich dem Benutzertoken vielleicht übernimmt das aber auch das Backend


function vorschlagen() {
    let frage = document.getElementById("frageinput").value;
    let antwort = document.getElementById("antwortinput").value;
    let fach = document.getElementById("fachselect").value;
    let thema = document.getElementById("themaselect").value;
    let korrekturen = [] // bleibt leer ... leere korrekturen gibt an, dass es sich bis auf weiteres nur um einenvorschlag handelt
    //TODO fetch POST

    send({
        "Frage": frage,
        "Antwort": antwort,
        "Fach": fach,
        "Thema": thema,
        "Korrekturen": korrekturen
    })
    verwerfen()
}
function hinzufügen() {
    let frage = document.getElementById("frageinput").value;
    let antwort = document.getElementById("antwortinput").value;
    let fach = document.getElementById("fachselect").value;
    let thema = document.getElementById("themaselect").value;
    let korrekturen = ["authr"];//TODO  den benutzer hinzufügen

    send({
        "Frage": frage,
        "Antwort": antwort,
        "Fach": fach,
        "Thema": thema,
        "Korrekturen": korrekturen
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
    let rawResponse = await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    });

}