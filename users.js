//var api = require('./api')
var bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({ extended: true }));

	//funzione della get: non fa altro se non ritornare l'elemento desiderato
var users_get = (x) => {
	return(x)
}
	

	//funzione della post: crea una nuova task
var users_post = (x) => {
	const user_name = x
    const new_id = user_name.replace(/\s/g, '') //da sistemare perché al momento scrive "utente_prova 2" - guarda client.js
    const new_user =  {id:new_id, name:user_name}
    return(new_user)
}
	
module.exports={users_get,users_post}