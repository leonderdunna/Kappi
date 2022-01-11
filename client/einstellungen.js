//angemeldet Prüfen
if(localStorage.getItem("angemeldet")){
    for( e of document.getElementsByClassName("card")){
        e.style.display = "block"
    }
}

