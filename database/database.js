const { google } = require('googleapis')
const keys = require('./kareikarten-f627f4a15f72.json')
const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);
client.authorize(
    (err, tokens) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Connected!')
            gsrun(client)
        }
    }
);

async function gsrun(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl })
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
 let resp =  await gsapi.spreadsheets.values.update(opt2)
 console.log(resp)
}
