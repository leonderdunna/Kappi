var card = null;
var stat = null

function getCard() {
    //card = await fetch()
    card = {
        "Frage": "Wie hoch ist der Eifelturm?",
        "ID": 98726103948,
        "Antwort": "ca 300m",
        "Autor": "Leonard",
        "Like": ["Leonard", "Orlando", "LOL allen anderen"]
    }
    getStatus()
    refreschUI()
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
    } else if (schwierigkeit == "Einfach"){
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

function zeigeAntwort(){
   let antwortElements = document.getElementsByClassName("antwort")

   for (element of antwortElements){
       element.style.display = "block";
   }
   document.getElementById("zeigeAntwort").style.display = "none"
}