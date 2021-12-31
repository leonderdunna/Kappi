const server = "http://localhost:3000/"

function getCard() {
    //card = await fetch()
    fetch(server +'card')
	.then(response => response.json())
	.then(data => {console.log(data);card = data;refreschUI();console.log(card)})
	.catch(err => console.error(err));
}

async function userExists(user){
    return JSON.parse(await fetch(server+ 'userExists/'+user))
}

module.exports={
    "getCard":getCard,
    "userExists":userExists
}