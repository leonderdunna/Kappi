//angemeldet Prüfen
if (localStorage.getItem("angemeldet")) {
    for (e of document.getElementsByClassName("card")) {
        e.style.display = "block"
    }
}

async function loadEinstellungen() {
    if (localStorage.getItem("angemeldet")) {

        fetch(server + "einstellungen/" + user.name).then(r => r.json()).then((einstellungen) => {

            console.log(einstellungen)
            document.getElementById("neueProTag").value = einstellungen.neueKartenProTag

            lernenSchritte = einstellungen.lernenSchritte.map((e) => { return e / 60000 })

            document.getElementById("lernenSchritte").value = JSON.stringify(lernenSchritte)
            document.getElementById("startLeichtigkeit").value = einstellungen.startLeichtigkeit * 100
            document.getElementById("startBeiEinfach").value = einstellungen.startBeiEinfach / (1000 * 60 * 60 * 24)
            document.getElementById("startBeiGut").value = einstellungen.startBeiGut / (60000 * 60 * 24)

            document.getElementById("kartenProTag").value = einstellungen.wiederholungenProTag
            document.getElementById("bonusBeiEinfach").value = einstellungen.bonus * 100
            document.getElementById("maxIntervall").value = einstellungen.maximumIntervall / (60000 * 60 * 24)
            document.getElementById("minIntervall").value = einstellungen.minimumIntervall / (60000 * 60 * 24)

            // "startLeichtigkeit": DEFAULT_LEICHTIGKEIT,
            // "neueKartenProTag": NEUE_KARTEN_PRO_TAG,
            // "lernenSchritte": [LERNEN_SCHRITT_1, LERNEN_SCHRITT_2],
            // "startBeiEinfach": START_BEI_EINFACH,
            // "statBeiGut": START_BEI_GUT,
            // "wiederholungenProTag": WIEDERHOLUNGEN_PRO_TAG,
            // "bonus": BONUS,
            // "minimumIntervall": MINIMUM_INTERVALL,
            // "maximumIntervall": MAXIMUM_INTERVALL,
            // "faktorNachErneutemLernen": FAKTOR_NACH_ERNEUTEM_LERNEN,
            // "erneutLernenSchritte": [ERNEUT_LERNEN_SCHRITT_1]


        })
    }
}
function speichern() {
    fetch(server + "einstellungen/" + user.name).then(r => r.json()).then((einstellungen) => {

        einstellungen.minimumIntervall = (document.getElementById("minIntervall").value - 0) * 60000 * 60 * 24
        einstellungen.maximumIntervall = (document.getElementById("maxIntervall").value - 0) * 60000 * 60 * 24
        einstellungen.bonus = (document.getElementById("bonusBeiEinfach").value - 0) / 100
        einstellungen.wiederholungenProTag = document.getElementById("kartenProTag").value - 0
        einstellungen.startBeiGut = (document.getElementById("startBeiGut").value - 0) * 60000 * 60 * 24
        einstellungen.startBeiEinfach = (document.getElementById("startBeiEinfach").value - 0) * 1000 * 60 * 60 * 24
        einstellungen.startLeichtigkeit = (document.getElementById("startLeichtigkeit").value - 0) / 100
        lernenSchritte = JSON.parse(document.getElementById("lernenSchritte").value)
        einstellungen.lernenSchritte = lernenSchritte.map((e) => { return e * 60000 })
        einstellungen.neueKartenProTag=document.getElementById("neueProTag").value -0


        console.log("einstellungen.js: neue eintellungen werden gesendet")
        console.log(einstellungen)
        fetch(server + "set/einstellungen/"+user.name, {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(einstellungen)
        })
    })
}
loadEinstellungen()