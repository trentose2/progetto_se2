const app = require('./api').app
const fetch = require("node-fetch")
const url = "http://localhost:3001/"


var task_valido1 = 	{tipologia: 
						{domanda: 'Prima domanda radiobox?', 
						 options: [{choice: 'Prima scelta', selection: false},
								   {choice: 'Seconda scelta', selection: false},
								   {choice: 'Terza scelta', selection: false}], 
						 risposta: 'Prima risposta'
						}
					};
					
var task_nonvalido3 =	{tipologia:
							{risposta: 'Prima risposta'}
						};



var server;

beforeAll(function () {
  server = require('./api.js');
});

afterAll(function () {
  server.close();
});





test('base test', () => {
	expect(true).toBe(true);
});


test('works with GET /tasks', () => {
	expect.assertions(1);
    return fetch(url+"tasks")
        .then(r => expect(r.status).toEqual(200))
});
/*
test('works with POST /tasks', () => {
	expect.assertions(1);
    return fetch(url)
        .then(r => expect(r.status).toEqual(200))
});
*/

test('works with correct POST /tasks', () => {
	expect.assertions(1); 
	return fetch(url+"tasks", {
		method: 'POST',
		body: JSON.stringify(task_valido1),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});

test('works with wrong POST /tasks', () => {
	expect.assertions(1); 
	return fetch(url+"tasks", {
		method: 'POST',
		body: JSON.stringify(task_nonvalido3),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

test('works with GET /users', () => {
	expect.assertions(1);
    return fetch(url+"users")
        .then(r => expect(r.status).toEqual(200))
});

test('works with POST /users', () => {
	expect.assertions(1);
	return fetch(url+"users", {
		method: 'POST',
		body: JSON.stringify({username: 'provaT', nome: 'TestName', cognome: 'TestSurname', email:'mail@test.com', matricola: 111111}),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});

//afterAll(() => setTimeout(() => process.exit(), 1000));


test('works with GET /groups', () => {
	expect.assertions(1);
    return fetch(url+"groups")
        .then(r => expect(r.status).toEqual(200))
});

test('works with POST /groups', () => {
	expect.assertions(1);
	return fetch(url+"groups", {
		method: 'POST',
		body: JSON.stringify({componenti: [{username: 'provaUser', nome: 'Firstname', cognome: 'Lastname', email:'prova@mail.it', matricola: 123654}]}),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});


test('works with GET /answers', () => {
	expect.assertions(1);
    return fetch(url+"answers")
        .then(r => expect(r.status).toEqual(200))
});

test('works with POST /answers', () => {
	expect.assertions(1);
	return fetch(url+"answers", {
		method: 'POST',
		body: JSON.stringify({taskid: 28, user: {username: 'provaUser', nome: 'Firstname', cognome: 'Lastname', email:'prova@mail.it', matricola: 123654}, risposta: 'Seconda risposta', tempo: '2018-02-30T17:12:47'}),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});

test('works with GET /exams', () => {
	expect.assertions(1);
    return fetch(url+"exams")
        .then(r => expect(r.status).toEqual(200))
});

test('works with POST /exams', () => {
	expect.assertions(1);
	return fetch(url+"exams", {
		method: 'POST',
		body: JSON.stringify({
        creator: {username: 'provaUser', nome: 'Firstname', cognome: 'Lastname', email:'prova@mail.it', matricola: 123456}, 
        tasks: [
            {taskid: 1, tipologia: {domanda: 'Prima domanda radiobox?', options: [{choice: 'Prima scelta', selection: false},{choice: 'Seconda scelta', selection: false},{choice: 'Terza scelta', selection: false}], risposta: 'Prima risposta'}}, 
            {taskid: 2, tipologia: {domanda: 'Prima domanda radiobox?', options: [{choice: 'Prima scelta', selection: false},{choice: 'Seconda scelta', selection: false},{choice: 'Terza scelta', selection: false}], risposta: 'Prima risposta'}}], 
        groups: [
            {groupid: 1, componenti: [{username: 'provaUser', nome: 'Firstname', cognome: 'Lastname', email:'prova@mail.it', matricola: 123654}]}, 
            {groupid: 2, componenti: [{username: 'provaUser2', nome: 'Firstname2', cognome: 'Lastname2', email:'prova2@mail.it', matricola: 123650},
                                      {username: 'provaUser1', nome: 'Firstname1', cognome: 'Lastname1', email:'prova1@mail.it', matricola: 123655}]} ] }),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});