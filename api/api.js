/**
 * Beschreibung: Die API. das Kernstück des Programms. Hier wird die gesamte Programmlogik
 *  berechnet und von Hier aus werden alle teile des Programms (wie z.B. die Datenbank) 
 *  angesteuert. 
 * Autor: siehe git
 * Datum: siehe git
 * Version: sihe git
 * 
*/

//Dierekte zugriffe auf die Datenbank werden aus der Datenbank Datei vorgenommen um Fehler zu verhindern 
// und diese Datei übersichtlicher zu halten. Dazu wird die Datenbank importiert
import database from '../database/database.js'

//Standardwerte.  
//TODO Sie müssen durch die Einstellungen bearbeitet werden können


//RUBRIKEN
//Rubriken werden erstmal als zahl gespeichert, macht es vielleicht einfacher in den Statistiken später diagramme zu erstellen
const RUBRIK_NEU = 0;
const RUBRIK_LERNEN = 1;
const RUBRIK_ERNEUT_LERNEN = 2;
const RUBRIK_JUNG = 3;
const RUBRIK_ALT = 4;

//ANTWORTEN
const ANTWORT_NOCHMAL = 0;
const ANTWORT_SCHWIERIG = 1;
const ANTWORT_GUT = 2;
const ANTWORT_EINFACH = 3;

//NEU
const DEFAULT_LEICHTIGKEIT = 2.50;//%
const NEUE_KARTEN_PRO_TAG = 10
const LERNEN_SCHRITT_1 = 1000 * 60;//ms
const LERNEN_SCHRITT_2 = 1000 * 60 * 10;//ms
const START_BEI_EINFACH = 1000 * 60 * 60 * 24 * 4;//ms
const START_BEI_GUT = 1000 * 60 * 60 * 24;//ms

//JUNG / ALT
const WIEDERHOLUNGEN_PRO_TAG = 100;
const BONUS = 1.30 //%
const MINIMUM_INTERVALL = 1000 * 60 * 60 * 24;//ms
const MAXIMUM_INTERVALL = 1000 * 60 * 60 * 24 * 365 * 10//ms
const FAKTOR_NACH_ERNEUTEM_LERNEN = 0.75 //%
const ERNEUT_LERNEN_SCHRITT_1 = 1000 * 60 * 10 //ms

function lernen(id, antwort, username, passwort) {
    if (!überprüfePasswort(username, passwort)) return false;

    c = database.user[username].status.filter((e) => {
        return e.id == id
    })[0]

    let startLeichtigkeit = database.user[username].einstellungen.startLeichtigkeit;
    let startBeiEinfach = database.user[username].einstellungen.startBeiEinfach;
    let startBeiGut = database.user[username].einstellungen.startBeiGut;
    let lernenSchritte = database.user[username].einstellungen.lernenSchritte;
    let erneutLernenSchritte = database.user[username].einstellungen.erneutLernenSchritte;
    let bonus = database.user[username].einstellungen.bonus;
    let faktorNachErneutemLernen = database.user[username].einstellungen.faktorNachErneutemLernen;
    let zufall =  Math.random() * (1.05 - 0.95) + 0.95;


    if (c.rubrik == RUBRIK_NEU) {
        if (antwort == ANTWORT_EINFACH) {
            c.rubrik = RUBRIK_JUNG
            c.leichtigkeit = startLeichtigkeit;
            c.intervall = startBeiEinfach;
            c.fällig = Date.now() + c.intervall

        } else if (antwort == ANTWORT_NOCHMAL) {
            c.rubrik = RUBRIK_LERNEN;
            c.stufe = 0;
            c.fällig = Date.now() + lernenSchritte[0]
        } else if (antwort == ANTWORT_GUT) {
            c.rubrik = RUBRIK_LERNEN;
            c.stufe = 1;
            c.fällig = Date.now() + lernenSchritte[1]
        } else { return false }
    }

    else if (c.rubrik == RUBRIK_LERNEN) {
        if (antwort == ANTWORT_NOCHMAL) {
            c.stufe = 0;
            c.fällig = Date.now() + lernenSchritte[0]
        } else if (antwort == ANTWORT_GUT) {
            if (c.stufe < lernenSchritte.length - 1) {
                c.stufe++
                c.fällig = Date.now() + lernenSchritte[c.stufe]
            } else {
                c.stufe = undefined;
                c.rubrik = RUBRIK_JUNG;
                c.leichtigkeit = startLeichtigkeit;
                c.intervall = startBeiGut;
                c.fällig = Date.now() + c.intervall
            }
        } else if (antwort = ANTWORT_EINFACH) {
            c.rubrik = RUBRIK_JUNG
            c.leichtigkeit = startLeichtigkeit;
            c.intervall = startBeiEinfach;
            c.fällig = Date.now() + c.intervall
        } else { return false }
    }
    else if (c.rubrik == RUBRIK_JUNG || c.rubrik == RUBRIK_ALT) {
        if (antwort == ANTWORT_NOCHMAL) {
            c.rubrik = RUBRIK_ERNEUT_LERNEN;
            c.stufe = 0;
            c.fällig = Date.now() + erneutLernenSchritte[0]
        } else if (antwort == ANTWORT_SCHWIERIG) {
            c.intervall = c.intervall * 1.2;

            if (c.leichtigkeit >= 1.45)
                c.leichtigkeit -= 0.15;
            else
                c.leichtigkeit = 1.30;

            c.fällig = Date.now() + c.intervall;

        } else if (antwort == ANTWORT_GUT) {
            c.intervall = c.intervall * c.leichtigkeit *zufall;
            c.fällig = Date.now() + c.intervall;
        } else if (antwort == ANTWORT_EINFACH) {
            c.intervall = c.intervall * c.leichtigkeit * bonus *zufall;
            c.leichtigkeit += 0.15;
            c.fällig = Date.now() + c.intervall;
        } else return false
    } else if (c.rubrik == RUBRIK_ERNEUT_LERNEN) {
        if (antwort == ANTWORT_NOCHMAL) {
            c.stufe = 0;
            c.fällig = Date.now() + erneutLernenSchritte[0]
        } else if (antwort == ANTWORT_GUT) {
            if (c.stufe < erneutLernenSchritte.length - 1) {
                c.stufe++
                c.fällig = Date.now() + erneutLernenSchritte[c.stufe]
            } else {
                c.stufe = undefined;
                c.rubrik = RUBRIK_JUNG;
                if (c.leichtigkeit >= 1.50) {
                    c.leichtigkeit -= 0.20
                } else { c.leichtigkeit = 1.30 }
                c.intervall = c.intervall * faktorNachErneutemLernen;
                c.fällig = Date.now() + c.intervall
            }
        } else if (antwort = ANTWORT_EINFACH) {
            c.rubrik = RUBRIK_JUNG
            if (c.leichtigkeit >= 1.35) {
                c.leichtigkeit -= 0.5
            } else { c.leichtigkeit = 1.30 }
            c.intervall = c.intervall * faktorNachErneutemLernen;
            c.fällig = Date.now() + c.intervall
        } else return false
    } else return false

    if (c.rubrik == RUBRIK_JUNG || c.rubrik == RUBRIK_ALT)
        if (c.intervall >= 1000 * 60 * 60 * 24 * 30)
            c.rubrik = RUBRIK_ALT;
        else c.rubrik = RUBRIK_JUNG;


    c.wiederholungen.push({ "zeit": Date.now(), "antwort": antwort })
    database.statusSpeichern();

}

//Das Passwort wird von diesem Programm erstellt, damit der benutzer nicht ein Passwort verwenden kann
// welches er woanders schon nutzt, um im Falle eines Hacks dieses Programmes den Schaden zu minimieren
function newPassword() {
    //Erstellt eine zufällige 5stellige zeichenkette
    return (Math.random() + 1).toString(36).substring(7);//TODO die zeichenkette darf nicht "false" sein
}

//Diese funktion Filtert den Status des Benutzers, sodass nur noch Karten übrig bleiben, die zu dem zeitpunkt
// zu dem diese Funktion aufgerufen wird Fällig sind.
function getFälligeKarten(userName) {
    //TODO 
    //cs sind die Karten die Fällig sind. 
    let cs = user[userName].status.filter((e) => {
        return e["fällig"] < Date.now()
    })

    //Die Karten werden sortiert, um es zu vereinfachen herauszufinden wie viele neu sind etc. 
    cs = cs.sort((a, b) => { if (a.fällig < b.fällig) return 1; else return -1 })//TODO test
}

//Diese funtion gibt alle Karten zurück die in den Letzten 24h beantwortet wurden, das Ermöglicht einen
// Fortschritsbalken beim Lernen und ist wichtig für (möglicherweise später kommende) Statistiken
function getErledigteKarten(username, bedingungen) {
    //der früheste zeitpunkt und der Späteste zeitpunkt indem die Karte das Letzte mal beantwortet worden
    // sein muss
    let startzeit = Date.now() - 1000 * 60 * 60 * 24
    let endzeit = Date.now()

    //das Leere Array muss vorher als solches Definiert werden, da sonst keine Karten diesem hinzugefügt werden könnten
    cs = []

    //Forschleife durch alle karten
    for (card of user[username].status) {
        //Filtert schonmal alle Karten raus, die Überhaupt noch nie Gelernt wurden
        if (card.gelernt.length > 0)
            //Alle karten im zufor definierten Zeitraum werden nun dem zuvor definierten Array hinzugefügt
            if (card.gelernt.at(-1) < endzeit && card.gelernt.at(-1) > startzeit)
                cs.push(card)
    }

    //Mögliche zusätzliche bedingungen

    //Nach Neu gelernten Karten filtern um diese Zu begrenzen, um dem Benutzer regelmäßig neue und nicht ale
    // neuen Karten aufeinmal zu geben
    if (bedingungen.neu) {
        cs.filter((e) => {
            //Wenn die Karte nur einmal gelernt wurde ist sie Zwingend vorher neu gewesen :)
            return e.gelernt.length == 1
        })
    }

    //TODO weitere bedingungen könnten kommen

    //Rückgabe der Zuvor erstellten und (vielleicht) mehrfach gefilterten karten
    return cs
}

//Funktion die ein Array aus Allen kartenIDs zurückgiebt um Schneler zu vergleichen ob Datensätze übereinstimmen
function getCardIds(cards = dataabase.cards) {
    //Das cards Array wird einfach etwas Umgeschreiben, sodass die Karte durch ihre ID ersetzt wird
    return cards.map((e) => { return e.id })
}

//Alle karten werden durchsucht und ihre Fächer zusammengetragen
function getFächer() {
    let f = []
    //Durchlauf für alle karten im Kartensatz
    for (c of database.cards) {
        //Verhindern dass ein fach nicht mehrfach im Array steht
        if (!(f.indexOf(c.Fach) != -1))
            // das Fach der Karte wird hinzugefügt
            f.push(c.Fach)
    }
    //die Fächerliste wird als Array Zurückgegeben
    return f
}

//Alle Karten die zu dem Gegebenen fach gehören werden nach Themen durchsucht und das Ergebnis als Array zurückgegeben
function getThemen(fach) {
    let t = []
    //als erstes werden Alle karten die nicht zu dem Fach gehören rausgefiltert
    cs = database.cards.filter((e) => {
        return e.Fach == fach
    })

    //für jede noch übrigbleibende Karte wird nun das Thema in das Array t (t steht für Themen) übernommen
    for (c of cs) {
        //Verhindern, dass ein Thema mehrfach hinzugefügt wird
        if (!(t.indexOf(c.Thema) != -1))
            t.push(c.Thema)
    }

    //Rückgabe der Themen als Array aus Strings
    return t
}

//einfache Funktion die Die Existenz eines Users in der datenbank herausfindet
function userExists(username) {
    //es kann nicht einfach database.user[user] zurückgegeben werden auch wenn dies im IF statement
    // die bedingung ist, sonnst würde der ganze benutzer bei dessen existenz zurückgebeben werden
    // undnicht nur, das dieser Existiert
    if (database.user[username]) return true; return false
}

//Funktion die Den benutzer hinzufügt, und alles dazu notwendige als seiteneffeckt auslöst. bei Erfolg wird
// das Passwort des Nutzers zurückgegeben, bei misserfolg "false"
function addUser(username) {
    //wenn der Benutzer schon existiert wird False zurückgegeben
    if (userExists(username)) return false;

    //wenn nicht wird für ihn ein passwort erstellt, der benutzer in die datenbank geschrieben, dessen Status generiert
    // d.h. alle Karten werden für ihn als neu markiert 
    pass = newPassword()
    user[username] = { "passwort": pass }
    generateUserStatus(username)
    //Aufrufen der Databasefuntion, um Den nutzer zu speichern und alle notwendigen Tabellenblätter etc. zu ergenzen
    database.addUser(username, pass)

    //Rückgabe des Passworts. bei misserfolg wäre die Funktion bereits vorher abgebrochen
    return pass
}

//Für einen neu erstellten Benutzer muss jede karte in den Status des Nutzers kopiert werden, mit den jeweiligen werten.
async function generateUserStatus(username) {
    //nur die IDs sind dafür relevant, der rest der Informationen auf einer Karte kann später geladen werden, wenn entscheiungen,
    // wie z.b. welche karte fällig ist getroffen wurden
    let cardIds = database.cards.map((e) => { return e.id })

    //Der nutzer braucht auch die nötigen standartwerte, auch wenn er sie später ändern könnte
    database.user[username].einstellungen = {//TODO einstellungen speichern und im Frontend bearbeitbar machen
        "startLeichtigkeit": DEFAULT_LEICHTIGKEIT,
        "neueKartenProTag": NEUE_KARTEN_PRO_TAG,
        "lernenSchritte": [LERNEN_SCHRITT_1, LERNEN_SCHRITT_2],
        "startBeiEinfach": START_BEI_EINFACH,
        "statBeiGut": START_BEI_GUT,
        "wiederholungenProTag": WIEDERHOLUNGEN_PRO_TAG,
        "bonus": BONUS,
        "minimumIntervall": MINIMUM_INTERVALL,
        "maximumIntervall": MAXIMUM_INTERVALL,
        "faktorNachErneutemLernen": FAKTOR_NACH_ERNEUTEM_LERNEN,
        "erneutLernenSchritte": [ERNEUT_LERNEN_SCHRITT_1]
    }

    //Der Status wird ein Array aus objekten mit der ID der Karte
    database.user[username].status = []

    //For Loop über die IDs der Karten
    for (let id of cardIds) {
        user[username].status.push({
            //Die ID und alle wichtigen standardWerte müssen in das Objekt, 
            // was den Status einer Karte beschreibt geschrieben werden
            "id": id,
            "rubrik": RUBRIK_NEU
        })
    }

}

//Funktion um ein Passwort zu überprüfen. sollte vor jeder Aktion mit der Datenbank passieren, um Fremdzugriffe zu verhindern
function überprüfePasswort(n, p) {

    //Fals der Benutzer existiert, wird das Passwort mit dem des Benutzers verglichen,
    // wenn das passwort falsch ist, oder der Benutzer nicht existiert wird false zurückgegeben
    if (userExists(n)) {
        return database.user[n].passwort == p
    }
    else return false
}

//eine Liste aller Funktionen/variablen, die außerhalb dieser Datei genutzt werden können.
// alle aktionen laufen über funktionen dierer Datei, um an einem zentralen ort Fehler zu vermeiden
export default {
    "cards": database.cards,//TODO das sollte irgendwann ein getCards() oder so werden, 
    // um dierekte datenbankzugriffe  zu verhindern
    "userExists": userExists,
    "addUser": addUser,
    "getFächer": getFächer,
    "getThemen": getThemen,
    "überprüfePasswort": überprüfePasswort,
    "getFälligeKarten": getFälligeKarten,
    "lernen":lernen
}