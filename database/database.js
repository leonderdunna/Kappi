const { google } = require('googleapis');
const api = require('../api/api');
const keys = require('./kareikarten-f627f4a15f72.json')
const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);
const datadocid = '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8'
var user = {}
var cards = []

client.authorize(
    (err, tokens) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Connected!')
            // gsrun(client)
        }
    }
);

const gsapi = google.sheets({ version: 'v4', auth: client })

function addUser(username, passwort) {

    // const sheets = google.sheets({ version: 'v4', auth });
    const request = {
        // The ID of the spreadsheet
        "spreadsheetId": datadocid,
        "resource": {
            "requests": [{
                "addSheet": {
                    // Add properties for the new sheet
                    "properties": {
                        // "sheetId": number,
                        "title": username,
                        // "index": number,
                        // "sheetType": enum(SheetType),
                        // "gridProperties": {
                        //     object(GridProperties)
                        // },
                        // "hidden": boolean,
                        // "tabColor": {
                        //     object(Color)
                        // },
                        // "rightToLeft": boolean
                    }
                }
            }]
        }
    };

    gsapi.spreadsheets.batchUpdate(request, (err, response) => {
        if (err) {
            // TODO: Handle error
        } else {
            console.log("User " + username + " wurde hinzugefügt")
        }
    });
    user[username] = { "passwort": passwort }
    userSpeichern(user)
    generateUserStatus(username)
    statusSpeichern(username)

}

function generateUserStatus(username){
   let cardIds = cards.map((e)=>{return e.id})
   console.log(cardIds)
   user[username].status = []
   for(id of cardIds){
       user[username].status.push({
           "id":id,
           "fällig":0,
           "leichtigkeit":api.DEFAULT_LEICHTIGKEIT,
           "intervall":api.DEFAULT_START_INTERVALL,
           "gelernt":[]
       })
   }
}

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

async function getAlleKarten() {
    const gsapi = google.sheets({ version: 'v4', auth: client })
    const opt = {
        spreadsheetId: datadocid,
        range: 'Karten!A1:A'
    }
    let res = await gsapi.spreadsheets.values.get(opt);
    return res.data.values.map((e) => { return JSON.parse(e[0]) });

}
async function loadStatus(name) {
    const gsapi = google.sheets({ version: 'v4', auth: client })
    const opt = {
        spreadsheetId: datadocid,
        range: name + '!A1:A'
    }
    let res = await gsapi.spreadsheets.values.get(opt);
    user[name].status = res.data.values.map((e) => { return JSON.parse(e[0]) });

}




function getCardById(id) {
    return cards.filter((e) => { e.id == id })[0]
}

async function getAlleUser() {
    const gsapi = google.sheets({ version: 'v4', auth: client })
    const opt = {
        spreadsheetId: datadocid,
        range: 'User!A1:B'
    }
    let res = await gsapi.spreadsheets.values.get(opt);
    let userArray = res.data.values;

    for (u of userArray) {
        user[u[0]] = { "passwort": u[1] }
        loadStatus(u)
    }

}

async function kartenSpeichern(neueKarten) {


    var opt = {
        spreadsheetId: '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8',
        range: 'Karten!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: neueKarten.map((r) => { return [JSON.stringify(r)] })
        }

    }
    gsapi.spreadsheets.values.update(opt)
}


async function statusSpeichern( userName) {


    var opt = {
        spreadsheetId: '1xLP93_fIY3i6Uf9RjqcxD6Hfa4bkrl7mu6wOCQ6wdR8',
        range: userName+'!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: user[username].status.map((r) => { return [JSON.stringify(r)] })
        }

    }
    gsapi.spreadsheets.values.update(opt)
}

async function userSpeichern(neueUser) {

    usernamen = Object.getOwnPropertyNames(neueUser)
    u = []
    for (name of usernamen) {
        u.push([name, "'" + neueUser[name].passwort])
    }

    var opt = {
        spreadsheetId: datadocid,
        range: 'User!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: u
        }

    }
    gsapi.spreadsheets.values.update(opt)
}



//INIT
getAlleUser()
getAlleKarten().then(() => {
    cards = r
})

module.exports = {
    "getAlleKarten": getAlleKarten,
    "addUser": addUser,
    "kartenSpeichern": kartenSpeichern,
    "statusSpeichern":statusSpeichern,
    "user": user,
    "cards":cards
}

//Testausgaben
