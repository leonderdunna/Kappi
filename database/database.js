/**
 * Beschreibung: Dierekte zugriffe auf die Datenbank (Google Tabelle), und Funktionen, um zu gewehrleisten, dass die Datenbank
 *  keine größeren probleme bekommt. Kurzum ist das die Schnittstelle zu Google
 * 
 * Author: siehe git
 * Datum: siehe git
 * Version: siehe git
 */


//TODO fehler beim erstellen von nutzern

//Die Google API wird importiert um die nötigen funktionen zu liefern um mit den Google servern Kontakt aufzunehmen
import { google } from 'googleapis';

//Der Schlüssel um für GoogleDrive eine autorisierung zu erlangen. Die identität unter der Datenbankzugriffe gemacht werden
// Das objekt wurde von google generiert.
const keys = {
    "type": "service_account",
    "project_id": "kareikarten",
    "private_key_id": "f627f4a15f7203ba3fb85887e0049daa3cfb05a6",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOrPg+E7P49wfv\n2GgKIgBE0IJKHZlyC3qsmk9g/8tzeJKq+RnWjg016DD9e5HJhjYVVjZK7S380xJt\ntHX5FKWaQWQrKb6gF0ut+v5360ulc8lPoSiB+4mCGk0z8QYG17pS2DWhH+db+zBw\nkGUY4kj2safhI9FYqTECN9rhSchtdQRhRpb5FXgNQosntJw1CYjc07+RVKRsHhiH\nYP8Ont52pu7ewWwCAFv3ss+0q+kyC0On6/hC2P9eFkdvzyyRfqSycKG5usn9NcqB\nzmMkFx+UWqARkOqgv39ZVNY6BjAa5MDBUJ6dfwtZ+g3GOlpyjjpbO6yKEQTIoI/D\n3oAOprvbAgMBAAECggEABBs2uqENV5RsiXRvnuyjMb46i1cjJaTuiLpl0t0QOVuQ\nBRTnfHhY9jAF/bwPuLGz+GGjbTA6vmfb91JWG69PcNgbwbsRPg3nL+blNtHyOtA3\nsm+cX3LvRNJS97RV8xGqzo8wdyZ+6lozAIDEMbbzJXGv6wsbD40wpU3l1WdIbULO\ng3foUugQu9jnu6zMINI4ZPDKn7K3/DQWJyzFXZM5zrod/D1FD8imJGCKrSeYVc0/\nx7z196oTqRFzuMofabyhxNEc9bVysh61eORHka4m98y+R9Uu3Oy5RvKdJjDpS/i+\n9q0qyLBuCwY57SpeS4x5hvMGrjBxbND4HJ2ZFE6qqQKBgQDDiXepwQAyOtmVXt25\nMZ1psE57CtBKBNXm++sHZWlXiQPAw5QTbCPopfePuKmRk3CdYfQewr+2kdDjLzHn\nstNkRu2a3jX364EuNsjT0o7LEM4bGz0hUJ6UaNR9fUeeV2vEgRiXQpZ2qYLMZIzJ\nDfV2tONUaHdiNkY2lmNOGuhsnwKBgQC6ywwqbZYfUNEW0nU/W0TeYp8dNUEM8Yvl\n24U0HoByxCu6nLQM9BeG6gA3h4W1pgs4ZN3bpDHqJwbu9IyhC2WjhJwAvzuxT2CS\nd3a+hzwu5efSmUtbzCBm2DHU3ldTrDsorvNmMMBOuwQBpbdpxfDrW+TeD2x28UA+\nva9ohoVrRQKBgQCypAqhGeR1/3H9lzf2E6/+eMaaftygYx6Q8qJclXfSMyksmQHV\nZLzBta8grNKuXwdJoc4HtGC2CS3QALQVPDkIqgw1qsGfiJbyg7aiXwF54BaMiSwm\nHaNjbwqCw0wFC1U3p8Gxn3IbYu5OkaZVoN0a4FO4L+Cx52fqQybimo6xfQKBgDzv\n6LQetA7bSprrZZyZpcn22nmo2ePjGQSPrNDn8nd+T9W9MW/YYaR9yjxTVeeAl8B6\nB3aUBkShHr3twcL3+NxzcoE74blib9rYZkCZ1aRnFE27/L2hxiBG/1q2fj6pvVL0\nYCtCVDpbAF+ZNFCpZoMho3ReC8Bxy8esEgFDgVsRAoGAGxfbxh1iiS8byzsIzwzO\nEqj1J73x6bUyQUGCDkWVL9kFDjclkP0bFQgRzVYgnpjr5u1/OjMYCsgrrYszWi5C\nVf20LojbWHPBLIZ1vj7F0jG54YlhcQsLcjrrQerQBH4wAIKrh5KJrpR6A81/Mr/2\n9Bh5o7WLpjqQNac5gTh5+1s=\n-----END PRIVATE KEY-----\n",
    "client_email": "leonard-menzel@kareikarten.iam.gserviceaccount.com",
    "client_id": "105389488506042909753",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/leonard-menzel%40kareikarten.iam.gserviceaccount.com"
}

//Neuer Klient wird angelegt für zugriff auf Google-Dienste
const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

//Konstanten
const datadocid = '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8'

//Die Hauptvariablen dier Verwaltet werden
var user = {}
var cards = []

//Verbinden Zu google um den Klient zu verifizieren.
client.authorize(
    (err, tokens) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('database: Bei Google Angemeldet')
            // gsrun(client)
        }
    }
);

//Das Objekt, was die Nötigen Funktionen beinhaltet GoogleTabellen zu bearbeiten
const gsapi = google.sheets({ version: 'v4', auth: client })

//Erstellen der Datenbankstruktur für einen Neuen Benutzer
async function addUser(username, passwort) {
    const request = {
        //Die Eigenschaften des Neuen Tabellenblattes für den Nutzer
        "spreadsheetId": datadocid,
        "resource": {
            "requests": [{
                "addSheet": {
                    "properties": {
                        "title": username,
                    }
                }
            }]
        }
    };

    //Hinzufügen des Tabellenblattes welches oben definiert wurde
    gsapi.spreadsheets.batchUpdate(request, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            //Wenn das erstelen des Tabellenblattes erfolgreih war wird Der in der API generierte Status des Nutzers
            // in der Tabelle Gespieichert un schließlich auch der benutzername und dessen passwort in die User tabelle 
            // geschrieben
            console.log("database: Das Tabellenblatt für "+username + " wurde angelegt.")
            statusSpeichern(username)
            einstellungenSpeichern(username)
            userSpeichern(user).then(() => {
                console.log("database: User " + username + " wurde hinzugefügt.");
            })
        }
    });


}

//Funktion wird bald entfrnt... ist kopiert, um den umgang mit der Google API zu verstehen. dient noch als Vorlage
async function gsrun(cl) {

    const opt = {
        spreadsheetId: '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8',
        range: 'Karten!A2:B13'
    }
    let res = await gsapi.spreadsheets.values.get(opt);
    let karten = res.data.values;

    let newKarten = karten.map((r) => {
        r.push(r[0] + '-' + r[1]);
        return r
    })


    const opt2 = {
        spreadsheetId: '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8',
        range: 'Karten!D2',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: newKarten
        }

    }
    let resp = await gsapi.spreadsheets.values.update(opt2)
    //console.log(resp)

}

//Abruf der Ersten Spallte aus dem karten-Tabellenblatt, der Datenbank.
// jede Zelle beinhaltet eine Karte im JSON-Format
async function getAlleKarten() {
    //Optionen werden definiert um die Abfrage zur GOOGLE API zu stellen. 
    // hier die ID des dokuments und der Bereich in dem karten stehen
    const opt = {
        spreadsheetId: datadocid,
        range: 'Karten!A1:A'
    }

    //die tatsächliche anfrage an Google. giebt ein zweidimensionales Array aus [spalte [zeile]] zurück.
    let res = await gsapi.spreadsheets.values.get(opt);
    //das Zweidimensionale Array muss in ein Eindimenisonales konvertiert werden.
    // nebenbei wird der string der Von der Api zurückkommt wieder ind gültige JSON format konvertiert
    let karten =res.data.values.map((e) => { return JSON.parse(e[0]) });
    console.log("database: Karten werden abgerufen. "+karten.length+" Karten gefunden")
    return karten
}

//abruf der ersten Spalte aus dem Jeweiligen Tabellenblattes des nutzers
// Jede zelle beinhaltet wieder den status einer Karte
async function loadStatus(name) {
    //Optionen werden definiert um die Abfrage zur GOOGLE API zu stellen. 
    // hier die ID des dokuments und der Bereich in dem karten stehen
    const opt = {
        spreadsheetId: datadocid,
        range: name + '!A1:A'
    }

    //die tatsächliche anfrage an Google. giebt ein zweidimensionales Array aus [spalte [zeile]] zurück.
    let res = await gsapi.spreadsheets.values.get(opt);
  
    //das Zweidimensionale Array muss in ein Eindimenisonales konvertiert werden.
    // nebenbei wird der string der Von der Api zurückkommt wieder ind gültige JSON format konvertiert
    user[name].status = res.data.values.map((e) => { return JSON.parse(e[0]) });
    console.log("database: Der Status von "+name+" wurde geladen")

}
async function loadEinstellungen(name) {
    //Optionen werden definiert um die Abfrage zur GOOGLE API zu stellen. 
    // hier die ID des dokuments und der Bereich in dem karten stehen
    const opt = {
        spreadsheetId: datadocid,
        range: name + '!B1:B'
    }

    //die tatsächliche anfrage an Google. giebt ein zweidimensionales Array aus [spalte [zeile]] zurück.
    let res = await gsapi.spreadsheets.values.get(opt);
  
    //das Zweidimensionale Array muss in ein Eindimenisonales konvertiert werden.
    // nebenbei wird der string der Von der Api zurückkommt wieder ind gültige JSON format konvertiert
    user[name].einstellungen = res.data.values.map((e) => { return JSON.parse(e[0]) })[0];
    console.log("database: Die Einstellungen von "+name+" wurde geladen")

}

//Da im Status des Nutzers nur die Informationen über eine karte gespeichert werden die den lernfortschritt,
// beschreiben wird durch diese Funktion die Möglichkeit geboten eine abfrage der Tatsächlichen karte 
// zu tätigen um Frage antwort etc. der karte herauszufinden
function getCardById(id) {
    //Zurückgegeben wird die Erste Karte mit der entsprechenden ID
    //Es dürfte nicht passieren dass mehrere karten mit einer ID existieren
    console.log("database: Die Karte "+id+" wurde abgerufen")
   // console.log("database testausgabe karte die abgerufen wird")
   // console.log(cards.filter((e)=>{return e.id==id}))
    return cards.filter((e) => { return e.id == id })[0]//TODO: fehler ausgeben wenn es mehere karen mit der gleihen id gibt
}

//schreiben der Nutzer in die User Variable. abfragen des Name/Passworts und aufruf zum laden des Status
async function getAlleUser() {
    //Optionen werden definiert um die Abfrage zur GOOGLE API zu stellen. 
    // hier die ID des dokuments und der Bereich in dem karten stehen
    const opt = {
        spreadsheetId: datadocid,
        range: 'User!A1:B'
    }
    //die tatsächliche anfrage an Google. giebt ein zweidimensionales Array aus [spalte [zeile]] zurück.
    let res = await gsapi.spreadsheets.values.get(opt);
    let userArray = res.data.values;

    let usernamen = userArray.map((e)=>{return e[0]})
    console.log("database: Die Benutzerliste wurde abgefragt. Folgende Benutzer wurden gefunden:")
    console.log(usernamen)
    // die benutzer werden in das richtige Format Formatiert und ihr status wird geladen
    for (let u of userArray) {
        user[u[0]] = { "passwort": u[1] }
        loadStatus(u[0])
        loadEinstellungen(u[0])
    }

}

//schreiben der Karten in die Datenbank
async function kartenSpeichern(neueKarten) {
    //Optionen wie die ID des Dokuments, der Bereich für die Daten und natürlich der Inhalt
    var opt = {
        spreadsheetId: '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8',
        range: 'Karten!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            //Das was abgspeichert wird muss für die Google Tabelle in einem Zweidimensionalen Array stehen.
            //in der Zweiten dimension dürfen nur Strings stehen, d.h. die Karten müssen im JSON Format als 
            // Zeichenkette gespeichert werden
            values: neueKarten.map((r) => { return [JSON.stringify(r)] })
        }
    }
    //Die anfrage an google die zuvor in opt definierten änderunen an der Tabelle durchzuführen
    gsapi.spreadsheets.values.update(opt)
    console.log("database: Karten werden in Google-Tabellen gesichert")
}

//Speichern des Status eines Nutzers. Entspricht dem speichern der karten, nur mit dem entsprechend anderen
// Tabellenblatt.
async function statusSpeichern(userName) {
    var opt = {
        spreadsheetId: '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8',
        range: userName + '!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: user[userName].status.map((r) => { return [JSON.stringify(r)] })
        }
    }
    
    gsapi.spreadsheets.values.update(opt)
    console.log("database: Der Status des Bentzers "+userName+" wird in Google-Tabellen gesichert")
}

async function einstellungenSpeichern(userName) {
    var opt = {
        spreadsheetId: '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8',
        range: userName + '!B1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values:[[JSON.stringify( user[userName].einstellungen)]]
        }
    }
    
    gsapi.spreadsheets.values.update(opt)
    console.log("database: Die Einstellungen des Bentzers "+userName+" wird in Google-Tabellen gesichert")
}

// Speichern der liste der Nutzer und deren Passwörter
// in der Tabeelle stehen in der ersten spalte die Nutzernamen und in der zweitten die Passwörter
// Die passwörter können im Klartext gespeichert werden, da die Passwörter durch das programm 
// definiert wurden und keine nutzereingaben waren
async function userSpeichern(neueUser) {

    //Ein array aus allen nutzernamen wird angelegt
    let usernamen = Object.getOwnPropertyNames(neueUser)
    let u = []
    // in u wird in jeweils einem array der nutzername zu jedem nutzer und sein passwort angelegt.
    // u wird dadurch ein zweidimensionales Array, welches so von google verarbeitet werden kann
    for (let uname of usernamen) {
        u.push([uname, "'" + neueUser[uname].passwort])
    }

    //Optionen zur veränderung des User - Tabelenblattes
    var opt = {
        spreadsheetId: datadocid,
        range: 'User!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: u
        }

    }

    // Anfrage an google
    gsapi.spreadsheets.values.update(opt)
    console.log("database: Die Liste aller Benutzer wird in Google-Tabellen gesichert")
}



//INIT
//zu programmstart müssen alle nutzer geladen werden und alle karten
getAlleUser()
getAlleKarten().then((r) => {
    cards = r
})

function getCards(){
return cards
}
function setCards(cs){
cards = cs
kartenSpeichern(cs)
}

function getUser(){
    return user 
}
function setUser(u, speichern = true){
    user = u

    if(speichern)
    for ( let name in user){
        statusSpeichern(name)
    }
    //TODO gucken was verändert wurde und das abspeichern

}

//Exportieren aller Funktionen, um sie für andere Dateien verfügbar zu machen und 
// komplikationen durch aufrufe zur datenbank durch andere Dateien zu verhindern
export default {
    "getAlleKarten": getAlleKarten,
    "addUser": addUser,
    "kartenSpeichern": kartenSpeichern,
    "statusSpeichern": statusSpeichern,
    "einstellungenSpeichern":einstellungenSpeichern,
    "getCards":getCards,
    "setCards":setCards,
    "getUser":getUser,
    "setUser":setUser,
    "getCardById":getCardById
}
