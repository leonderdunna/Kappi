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

//Implementierung von Konstanten für bessere Übersichtlichkeit und Wartbarkeit
const port = 3000

//Erstelen der Express app. Dem Objekt was schlussendlich alle Anfragen verarbeitet
const app = express();

app.use((req, res, next) => {
    console.log("HTTP Anfrage auf " + req.url + " von " + req.ip + " Zeit: " + new Date())
    next()
})

//Aufrufen von Funktionen die mit Express mitgeliefert werden. Static um einfach die 
// Dateien fürs Frontend durchzureichen und JSON um in eigenen Funktionen mit den 
// Requests als Javascript objekte umgehen zu können
app.use(express.static('./client'))
app.use(express.json())



//Hinzufügen von Karten durch den Client. Nötige informationen werden ergenzt 
// und die Karte in den Status aller anderen Benutzer hinzugefügt
app.post("/add", (req, res) => {//TODO auslagern in api.js && add in andere user
    card = req.body
    card.Like = []
    cards.push(card);
    api.karteSpeichern(cards)
})

//Die Funktion soll einfach eine zufällige fällige karte zurückgeben.
app.get("/card/:user", (req, res) => {//TODO fällige karten des benutzers... und auslagern in api.js
    res.send(JSON.stringify(api.getCard(req.params.user)))
})

app.get("/cardById/:id", (req, res) => {//TODO fällige karten des benutzers... und auslagern in api.js
    // console.log("testausgabe indexjs cardbyid")
    // console.log(api.getCardById(req.params.id))
    res.send(JSON.stringify(api.getCardById(req.params.id)))
})

//Abfrage ob ein benutzer Existiert, um bei der Registrierung Komplikationen zu verhindern und
// bei der Anmeldung nützlichere Fehlermeldungen zu bieten
app.get("/userExists/:user", (req, res) => {
    res.end(JSON.stringify(api.userExists(req.params.user)))
})

//Hinzufügen eines neuen Benutzers. Wenn Bereits ein Benutzer mit diesem Namen Existiert, wird false 
// als Fehlermeldung zurückgegeben, wenn es erfolgreich war wird das Passwort des neuen Benutzers 
// zurückgegeben
app.get("/adduser/:username", (req, res) => {
    res.end(JSON.stringify(api.addUser(req.params.username)))// TODO umgang wenn das Passwort zufällig false ist :)
})

//Passwortüberprüfung. gibt true zurück wenn das Passwort richtig ist und false wenn nicht
app.get("/anmelden/:username/:passwort", (req, res) => {
    res.end(JSON.stringify(api.überprüfePasswort(req.params.username, req.params.passwort)))
})


//Gibt ein Array mit allen Fächern die es in Karten gibt zurück
app.get("/faecher", (req, res) => {
    res.end(JSON.stringify(api.getFächer()))
})

//gibt ein Array mit allen Themen in einem Fach zurück
app.get("/themen/:fach", (req, res) => {
    res.end(JSON.stringify(api.getThemen(req.params.fach)))
})

app.post("/lernen", (req, res) => {
    let opt = req.body;
    api.lernen(opt.id, opt.antwort, opt.username, opt.passwort)
})

app.get("/einstellungen/:user", (req, res) => {
    res.end(JSON.stringify(api.getEinstellungen(req.params.user)))
})
app.post("/set/einstellungen/:user", (req, res) => {
    res.end(JSON.stringify(api.setEinstellungen(req.params.user, req.body.einstellungen)))
})

//Die "app" wird nun gestartet und ist unter dem in Konstanten definierten Port erreichbar
app.listen(port, () => { console.log("Server listening on port " + port) })

