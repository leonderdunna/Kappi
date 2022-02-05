/**
 * Beschreibung: Die "Startdatei". Sie wird ausgeführt um den Server zu starten und 
 *  die verschiedenen HTTP anfragen zu verarbeiten und/oder funktionen aus der API 
 *  zuzuordnen. Vom Client werden über die Fetch() API die Daten abgefragt oder über 
 *  Post requests zum Server geschickt
 * Date: sihe git
 * Author: sieh git
 */

//Imports von anderen Modulen. Express für einen einfacheren umgang mit HTTP und die 
// api für eine bessere Struktur.
import express from "express";
import api from './api/api.js';
import database from './database/database.js';

//Implementierung von Konstanten für bessere Übersichtlichkeit und Wartbarkeit
const port = 3000

//Erstelen der Express app. Dem Objekt was schlussendlich alle Anfragen verarbeitet
const app = express();

//Aufrufen von Funktionen die mit Express mitgeliefert werden. Static um einfach die 
// Dateien fürs Frontend durchzureichen und JSON um in eigenen Funktionen mit den 
// Requests als Javascript objekte umgehen zu können
app.use(express.static('./client'))
app.use(express.json())



//Hinzufügen von Karten durch den Client. Nötige informationen werden ergenzt 
// und die Karte in den Status aller anderen Benutzer hinzugefügt
app.post("/add", (req, res) => {//TODO auslagern in api.js && add in andere user
    

    //Jede Karte bekommt eine ID um bei berechnungen nur mit ihenen und nicht mit der karte selbst 
    //rechnen zu müssen. // spaart speicher und leistung
    let hashCode = (s) => {
        return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    }

    //um nicht jedesmal req.body zu schreiben --> karte wird als card definiert
    let card = req.body

    //Ausgabe in der konsole --> für fehlerbehebung
    console.log("POST: /add von " + card.author)

    //Hohlen aller Daten aus der Datenbank
    let cards = database.getCards()
    let user = database.getUser()

    //zuweisung der ID, in die id darf die anzahl der likes nicht einbezogen werden, entsprechend wird das hinterher gemacht
    card.id = hashCode(JSON.stringify(card))

    //struktur für potentielle spätere funktion die karten zu liken
    card.Like = []

    //die karte dem datensatzt hinzufügen
    cards.push(card);

    //den entstandenene3n neuen kartensatz speichern
    database.setCards(cards)

    //fügt die ID der neuen karte in den Status von jedem Nutzer hinzu
    for (let u in user) {
        user[u].status.push({
            "id": card.id,
            //Jede neue karte wird zu beginn als neu markiert, um gleich vom algorhitmus erkannt zu werden
            "rubrik": 0
        })
    }

    //alle benutzer werden gespeichert
    database.setUser(user)

    //Dumme antwort, damit der client weiß dass die karte erzeugt wurde
    res.send("true")
})

//Die Funktion soll einfach eine zufällige fällige karte zurückgeben.
app.get("/card/:user", (req, res) => {

    console.log("GET: /card von " + req.params.user)

    //Kartde für user wird aus der api gelesen
    res.send(JSON.stringify(api.getCard(req.params.user)))
})

app.get("/cardById/:id", (req, res) => {

    console.log("GET: /cardById für die Karte "+req.params.id)
    
    // aufruf in die API die karte mit der entsprechenden id zu suchen
    res.send(JSON.stringify(api.getCardById(req.params.id)))
})

//Abfrage ob ein benutzer Existiert, um bei der Registrierung Komplikationen zu verhindern und
// bei der Anmeldung nützlichere Fehlermeldungen zu bieten
app.get("/userExists/:user", (req, res) => {

    console.log("GET: /userExists für "+req.params.user)

    res.end(JSON.stringify(api.userExists(req.params.user)))
})

//Hinzufügen eines neuen Benutzers. Wenn Bereits ein Benutzer mit diesem Namen Existiert, wird false 
// als Fehlermeldung zurückgegeben, wenn es erfolgreich war wird das Passwort des neuen Benutzers 
// zurückgegeben
app.get("/adduser/:username", (req, res) => { // TODO umschreiben zu einer POST methode. 
    res.end(JSON.stringify(api.addUser(req.params.username)))
})

//Passwortüberprüfung. gibt true zurück wenn das Passwort richtig ist und false wenn nicht
app.get("/anmelden/:username/:passwort", (req, res) => {

    console.log("GET: /anmelden user: "+ req.params.username+", password: "+req.params.passwort)

    res.end(JSON.stringify(api.überprüfePasswort(req.params.username, req.params.passwort)))
})


//Gibt ein Array mit allen Fächern die es in Karten gibt zurück
app.get("/faecher", (req, res) => {
    console.log("GET: /fächer ")
    res.end(JSON.stringify(api.getFächer()))
})

//gibt ein Array mit allen Themen in einem Fach zurück
app.get("/themen/:fach", (req, res) => {
    console.log("GET: /themen aus Fach "+ req.params.fach)
    res.end(JSON.stringify(api.getThemen(req.params.fach)))
})

app.post("/lernen", (req, res) => {
    let opt = req.body;
    
    console.log("POST: /lernen von "+opt.username+" für die Karte "+opt.id)

    api.lernen(opt.id, opt.antwort, opt.username, opt.passwort) // TODO überprüfen ob die karte noch fällig ist --> falls auf mehereren geräten gelernt wird
})

app.get("/einstellungen/:user", (req, res) => {
    console.log("GET: /einstellungen von "+ req.params.user)

    res.end(JSON.stringify(api.getEinstellungen(req.params.user)))
})
app.post("/set/einstellungen/:user", (req, res) => {
    console.log("POST: /set/einstellungen von "+req.params.user)
    res.end(JSON.stringify(api.setEinstellungen(req.params.user, req.body)))
})

//Die "app" wird nun gestartet und ist unter dem in Konstanten definierten Port erreichbar
app.listen(port, () => { console.log("Server wurde gestartet. HTTP-Anfragen werden auf Port " + port + " beantwortet") })

