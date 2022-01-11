//Konstanten





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


function refreschUI(c) {


    if (c) {
        document.getElementsByClassName("abfrage")[0].style.display = "none";
        document.getElementById("cardfertig").style.display = "block";
        document.getElementById("cardfertigbody").appendChild(document.getElementById("filter"))
    }

    else {
        document.getElementById("cardfrage").innerHTML = card.Frage
        document.getElementById("cardantwort").innerHTML = card.Antwort
        document.getElementById("cardid").textContent = "Karte " + card.ID
        document.getElementById("cardfach").textContent = "Fach: " + card.Fach + ", Autor: " + card.Autor
        document.getElementById("gefälltmir").textContent = "Gefällt mir: " + card.Like.length

        if (!card.Like.includes(user.name)) {
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




function zeigeAntwort() {
    let antwortElements = document.getElementsByClassName("antwort")

    for (element of antwortElements) {
        element.style.display = "block";
    }
    console.log(card)
    if (card.status.rubrik == RUBRIK_NEU || card.status.rubrik == RUBRIK_LERNEN || card.status.rubrik == RUBRIK_ERNEUT_LERNEN) {
        document.getElementById("schwierig").style.display = "none";
    }
    document.getElementById("zeigeAntwort").style.display = "none"
}

