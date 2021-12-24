var card = null;
var stat = null;
var clientname = null;

function start() {
    clientname = window.localStorage.getItem("name")
    if (!clientname) {
        document.getElementsByClassName("abfrage")[0].style.display = "none";
        document.getElementById("anmelden").style.display = "block";
    } else {
        getCard()
    }
}
function anmelden() {
    window.localStorage.setItem("name", document.getElementById("clientname").value)
    document.getElementsByClassName("abfrage")[0].style.display = "block";
    document.getElementById("anmelden").style.display = "none";
    start()
}

function like() {

    if (!card.Like.includes(clientname)) {
        card.Like.push(clientname)
    } else {
        card.Like.splice(card.Like.indexOf(clientname), 1)
    }
    //save(card)
    refreschUI()
}

function getCard() {
    //card = await fetch()
    card = {
        "stat": "ok",
        "Frage": "Wie hoch ist der Eifelturm?",
        "ID": 98726103948,
        "Antwort": "ca 300m",
        "Autor": "Leonard",
        "Like": ["Leonard", "Orlando"]
    }
    getStatus()
    refreschUI()
}
function refreschUI() {

    if (card.stat == "fertig") {
        document.getElementsByClassName("abfrage")[0].style.display = "none";
        document.getElementById("cardfertig").style.display = "block";
        document.getElementById("cardfertigbody").appendChild(document.getElementById("filter"))
    }

    if (card.ID) {
        document.getElementById("cardfrage").innerHTML = card.Frage
        document.getElementById("cardantwort").innerHTML = card.Antwort
        document.getElementById("cardid").textContent = "Karte " + card.ID
        document.getElementById("cardfach").textContent = "Fach: " + card.Fach + ", Autor: " + card.Autor
        document.getElementById("gefälltmir").textContent = "Gefällt mir: " + card.Like.length

        if (!card.Like.includes(clientname)) {
            document.getElementById("gefälltmir").classList.remove("btn-primary")
            document.getElementById("gefälltmir").classList.add("btn-outline-primary")
        } else {
            document.getElementById("gefälltmir").classList.remove("btn-outline-primary")
            document.getElementById("gefälltmir").classList.add("btn-primary")
        }

        let antwortElements = document.getElementsByClassName("antwort")

        for (element of antwortElements) {
            element.style.display = "none";
        }
        document.getElementById("zeigeAntwort").style.display = "block"
    }
}

async function antworten(schwierigkeit) {
    if (schwierigkeit == "Nochmal") {
        stat.Leichtigkeit = stat.Leichtigkeit * 0.8
        stat.Intervall = 3600000;
        stat.Fällig = Date.now();
    } else if (schwierigkeit == "Schwierig") {
        stat.Leichtigkeit = stat.Leichtigkeit * 0.9
        stat.Fällig = Date.now() + stat.Intervall
    } else if (schwierigkeit == "Gut") {
        stat.Leichtigkeit = stat.Leichtigkeit * 1.1
        stat.Intervall = stat.Intervall * stat.Leichtigkeit
        stat.Fällig = Date.now() + stat.Intervall
    } else if (schwierigkeit == "Einfach") {
        stat.Leichtigkeit = stat.Leichtigkeit * 1.3
        stat.Intervall = stat.Intervall * stat.Leichtigkeit
        stat.Fällig = Date.now() + stat.Intervall
    }
    //fetch(set/status/id POST stat{})
    getCard()

}

function getStatus() {
    //return await fetch(status/card.id...)
    stat = {
        "Intervall": 1000000000,
        "Leichtigkeit": 2.5,
        "Fällig": 284239847
    }
}

function zeigeAntwort() {
    let antwortElements = document.getElementsByClassName("antwort")

    for (element of antwortElements) {
        element.style.display = "block";
    }
    document.getElementById("zeigeAntwort").style.display = "none"
}

start()