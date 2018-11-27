var https = require('http');
const fetch = require("node-fetch");

var url = "http://localhost:3001/";


/*
https.get(url, function(resp) {
	console.log('\ngetting ' + url)
	var data = "";
	resp.on("data", function(chunk) {
		data += chunk;
	});
	resp.on("end", function() {
		console.log(data);
	});
}).on("error", function(err) {
	console.log("Error: " + err.message);
});
 
*/
 //var body = 'prova'

async function postBody(url, body) { 
	//console.log('\n==='+ body +'===\n')
	console.log('\n\nposting ' + url, body + '\n')
	try {
		//	console.log('\n==='+ body +'===\n')

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			
			headers: {
				'Content-Type': 'application/json',
			},
		});
		//	console.log('\n==='+ body +'===\n')

		//console.log(response.status)
		const json = await response.json();
		//	console.log('\n==='+ body +'===\n')

		console.log(json)
		//	console.log('\n==='+ body +'===\n')

	} catch (error) {
        console.log(error);
    }
};

async function get(url) {
	console.log('\n\ngetting 2 ' + url + '\n')
    try {
		const response = await fetch(url);
        const json = await response.json();
        console.log(json)
    } catch (error) {
        console.log(error);
    }
};

async function get_post (url) {
	await get(url+"tasks");
	await postBody(url+"tasks",{task_name: 'prova2'});
	await get(url+"users");
	await postBody(url+"users",{user_name: 'utente_prova2'});
	await get(url+"groups");
	//await postBody(url+"groups",{group_pname: 'utente_prova2'});
	await get(url+"answers");
	await postBody(url+"answers",{answer_name: 'risposta prova'});
};


get_post(url)