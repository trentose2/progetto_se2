const express = require('express')
var bodyParser = require('body-parser')
const get_tasks = require('./tasks').get_tasks
const get_id_tasks = require('./tasks').get_id
const post_tasks = require('./tasks').post_tasks
const get_groups = require('./groups').get_groups
const post_groups = require('./groups').post_groups
const get_users = require('./users').users_get
const get_id_users = require('./users').users_id
const post_users = require('./users').users_post
const get_answers = require('./answers').answers_get
const post_answers = require('./answers').answers_post
const get_exams = require('./exams').get_exams
const post_exams = require('./exams').post_exams
var risorse = require('./risorse')
const app = express()
const PORT = process.env.PORT || 3001
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Hello World!'))

// ------- TASKS


var i_tasks=2;
/*
app.get('/tasks', (req, res) => {
	res.json(get_tasks(tasks))
})

module.exports = {app};
*/

app.get('/tasks', (req, res) => {
	res.send(get_tasks(risorse.tasks));
})

app.post('/tasks', (req, res) => {
	i_tasks += 1;
	var new_task = post_tasks(req.body,i_tasks); //body è la variabile che setto nel client.js
	/*
	const task_name = req.body.name
    const new_id = task_name.replace(/\s/g, '')
    const new_task =  {id:new_id, name:task_name}
    tasks.push(new_task)
	*/
	if(new_task!='errore') {
		risorse.tasks.push(new_task)
		res.status(201)
		//console.log(new_task);
		res.json(new_task)
	}
	else {
		res.status(400)
		res.end();
	}
	
	//res.end();
})

app.get('/tasks/:taskid', (req,res) => {
	const id = Number.parseInt(req.params.taskid);
	if(!id){
        res.status(400)
		res.send('errore')
		res.end();
    }
	var task = get_id_tasks(id);
    if(task!='errore'){
        //var tjson = JSON.parse(JSON.stringify(task));
		res.json(task)
        res.status(200)
		//res.send(tjson);
    }else{
		res.status(404);
		res.send('errore');
		res.end();
    }
});

//exports.tasks = tasks;

// -------- END TASKS


// ------- USERS



var user_id = 2;
/*
	USER	
{
	"userID" : 21
	"username": "ipsum aliqua exercitation nulla",
	"nome": "elit d",
	"cognome": "nostrud ullamco ea labore Excepteur",
	"email": "dolor exercitation incididunt reprehen",
	"matricola": -51728310
}*/

app.get('/users', (req, res) => {
	res.send(get_users(risorse.users));
})

app.post('/users', (req, res) => {
	user_id += 1;
	var new_user = post_users(user_id,req.body); //body è la variabile che setto nel client.js
	
	if(new_user!='errore') {
		risorse.users.push(new_user)
		res.status(201)
		res.json(new_user)
	}
	else {
		res.status(400)
		res.end();
	}

})

app.get('/users/:userid', (req,res) => {
	const id = Number.parseInt(req.params.userid);
	if(!id){
        res.status(400)
		res.send('errore')
		res.end();
    }
	var user = get_id_users(id);
    if(user!='errore'){
        //var tjson = JSON.parse(JSON.stringify(user));
		res.json(user)
        res.status(200)
		//res.send(tjson);
    }else{
		res.status(404);
		res.send('errore');
		res.end();
    }
});



// -------- END USERS



// ------- GROUPS

var groups = [{groupid: 1,
			   componenti: [1, 2, 3]},
			  {groupid: 2,
			   componenti: [4, 5]}];
var i_groups = 2;
// console.log(groups[0].componenti[0]); //questa è la dimostrazione che c'è

app.get('/groups', (req, res) => {
	res.send(get_groups(groups));
})

app.post('/groups', (req, res) => {
	i_groups += 1;
	var new_group = post_groups(req.body,i_groups); //body è la variabile che setto nel client.js
    if(new_group!='errore') {
        groups.push(new_group)
	    res.status(201)
        res.json(new_group)
    } else {
        res.status(400)
    res.end();
    }
})


// -------- END GROUPS


// ------- ANSWERS

var answers = [{answerid: 1, taskid: 1, user: users[0], risposta: 'Prima risposta', tempo: '2018-01-30T17:12:47'},
			   {answerid: 2, taskid: 2, user: users[0], risposta: 'Seconda risposta', tempo: '2018-02-30T17:12:47'}];
i_answers = 2;

app.get('/answers', (req, res) => {
	res.send(get_answers(answers));
})

app.post('/answers', (req, res) => {
	i_answers += 1;
	var new_answer = post_answers(req.body,i_answers); //body è la variabile che setto nel client.js
	if(new_answer!='errore'){
		answers.push(new_answer)
		res.status(201)
		res.json(new_answer)
	}
	else {
		res.status(400)
		res.end();
}
	
})

// -------- END ANSWERS

// ------- EXAMS

var exams = [{ examid: 1, titolo:'prova', creator: 0, tasks: [0,1], groups: [4,5,6]},
			 { examid: 2, titolo:'prova', creator: 1, tasks: [0,1], groups: [4,6,8]}];
var i_exams = 2;

app.get('/exams', (req, res) => {
    res.send(get_exams(exams));
    })

app.post('/exams',(req,res) => {
    i_exams += 1
    var new_exam = post_exams(req.body, i_exams)
    if(new_exam!='errore') {
        exams.push(new_exam)
        res.status(201)
        res.json(new_exam)
   }
	else {
		res.status(400)
		res.end();
	}
			})
			
// -------- END EXAMS


//module.exports = {app};

var server = app.listen(PORT, () => console.log('Listening on port ' + PORT))

module.exports = {app};
module.exports = server;