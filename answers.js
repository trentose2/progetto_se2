var bodyParser = require('body-parser')
const express = require('express')
const app = express()
var risorse = require('./risorse')
app.use(bodyParser.json() )
app.use(bodyParser.urlencoded({ extended: true }));

	//funzione della get: non fa altro se non ritornare l'elemento desiderato
var answers_get = (x) => {
	return(x)
}
	

	//funzione della post: crea una nuova answers
var answers_post = (body,i) => {
	//const new_name = x
    //const new_id = new_name.replace(/\s/g, '') //da sistemare perché al momento scrive "answer_prova 2" - guarda client.js
    if(body==null || isNaN(i)) {
		return('errore')
	} else if(body.taskid==false || body.taskid==null || isNaN(body.taskid) || !(Number.isInteger(body.taskid)) || body.taskid<0) {
		return('errore')
	}
	else if(body.userid==false || body.userid == null || isNaN(body.userid) || !(Number.isInteger(body.userid)) || body.userid<0){
		return('errore')
	} 
	else if(body.tempo==false || body.tempo==null) {
		return('errore')
	} 
	else if(body.risposta==false || body.risposta==null) {
		return('errore')
	} 
	else {
		const new_answer = {answerid:i, taskid: body.taskid, userid: body.userid, risposta: body.risposta, tempo: body.tempo} //{id:new_id, answer_name:new_name}
		return(new_answer)
	}	
}

var get_id = (id) => {
	for(let i=0;i<risorse.answers.length;i++) {
		//console.log(risorse.tasks[i].taskid)
		if(risorse.answers[i].answerid==id) {
			return(risorse.answers[i])
		}
	}
	return('errore');
}
	
module.exports={answers_get,answers_post,get_id}