import { google } from 'googleapis';
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

async function addUser(username, passwort) {

    const request = {
        //Neues Tabellenblatt wird angelegt
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

    gsapi.spreadsheets.batchUpdate(request, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            statusSpeichern(username).then(() => { console.log("status von " + username + " wurde gespieichert") })
            userSpeichern(user).then(() => {
                console.log("User " + username + " wurde hinzugefügt");
            })
        }
    });


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
    console.log(res.data.values)
    //  user[name].status = res.data.values.map((e) => {console.log(e[0]); return JSON.parse(e[0]) });

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

    for (let u of userArray) {
        user[u[0]] = { "passwort": u[1] }
        loadStatus(u[0])
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
getAlleKarten().then((r) => {
    cards = r
})
export default {
    "getAlleKarten": getAlleKarten,
    "addUser": addUser,
    "kartenSpeichern": kartenSpeichern,
    "statusSpeichern": statusSpeichern,
    "user": user,
    "cards": cards
}

//Testausgaben
