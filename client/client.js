

function start() {
    
    if (!window.localStorage.getItem("angemeldet")) {
       location.href="./account.html"
    } else {
        api.getCard()
    }
}

//TODO: Was macht das hier
// function anmelden() { 
//     window.localStorage.setItem("name", document.getElementById("clientname").value)
//     document.getElementsByClassName("abfrage")[0].style.display = "block";
//     document.getElementById("anmelden").style.display = "none";
//     start()
// }

function like() {

    if (!card.Like.includes(clientname)) {
        card.Like.push(clientname)
    } else {
        card.Like.splice(card.Like.indexOf(clientname), 1)
    }
    //save(card)
    refreschUI()
}


function refreschUI() {

console.log(card)
console.log(card.Frage)
console.log(Object.getOwnPropertyNames(card))
console.log(card[1])
    if (card.stat == "fertig") {
        document.getElementsByClassName("abfrage")[0].style.display = "none";
        document.getElementById("cardfertig").style.display = "block";
        document.getElementById("cardfertigbody").appendChild(document.getElementById("filter"))
    }

    else{
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
    api.getCard()

}


function zeigeAntwort() {
    let antwortElements = document.getElementsByClassName("antwort")

    for (element of antwortElements) {
        element.style.display = "block";
    }
    document.getElementById("zeigeAntwort").style.display = "none"
}

start()