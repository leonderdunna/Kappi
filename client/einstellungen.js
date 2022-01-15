//angemeldet Prüfen
if (localStorage.getItem("angemeldet")) {
    for (e of document.getElementsByClassName("card")) {
        e.style.display = "block"
    }
}

async function loadEinstellungen() {
    if (localStorage.getItem("angemeldet")) {

        fetch(server + "einstellungen/" + user.name).then(r =>r.json() ).then((einstellungen) => {

console.log(einstellungen)
            document.getElementById("neueProTag").value = einstellungen.neueKartenProTag
            document.getElementById("lernenSchritte").value = einstellungen.lernenSchritte
            document.getElementById("startLeichtigkeit").value = einstellungen.startLeichtigkeit
            document.getElementById("startBeiEinfach").value = einstellungen.startBeiEinfach
            document.getElementById("startBeiGut").value = einstellungen.startBeiGut




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
loadEinstellungen()