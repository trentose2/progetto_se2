const app = require('./api').app
const fetch = require("node-fetch")
const url = "http://localhost:8000/"


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


var user_nonvalido3 = 	{	"username": "usernamev1",
						   	"nome": "firstname1",
						   	"cognome": "lastname1",
						   	"matricola": 132465
						};

var user_nonvalido4 = 	{	"username": "usernamev1",
						   	"nome": "firstname1",
						   	"cognome": "lastname1",
						   	"matricola": 1324
						};

var user_valido1 = 	{"username": "usernamev1",
					 "nome": "firstname1",
					 "cognome": "lastname1",
					 "email": "prova1@mail.it",
					 "matricola": 132465
					};

var exam_valido1 = {
                    creator: 12,
                    titolo: 'prova',
                    tasks: [1,2,3,4], 
                    groups: [12,13,14]
    
}

var exam_nonvalido1 = {
                    creator: null,
                    titolo: 'prova',
                    tasks: [1,2,3,4], 
                    groups: [12,13,14]
    
}

var answer_valida1 = {taskid: 1,
					 userid: 1,
					 risposta: 'Prima risposta',
					 tempo: '2018-01-30T17:12:47'
}

var answer_nonvalida1 = {
		taskid: 1,
		userid: 1,
		risposta: '',
		tempo: '2018-01-30T17:12:47'
}

var group_valido1 = {
	titolo: "prova1",
	componenti: [
		80709944,
		74734533,
		89689823,
		6293821,
		70651806
	  ]
}

var group_nonvalido2 = {
	componenti: [
		80709944,
		-74734533,
		-89689823,
		-6293821,
		-70651806
	  ]
	}


beforeAll(function () {
  server = require('./api.js');
});

afterAll(function () {
  server.close();
});





test('base test', () => {
	expect(true).toBe(true);
});


// ------- TASKS

test('works with GET /tasks', () => {
	expect.assertions(1);
    return fetch(url+"tasks")
        .then(r => expect(r.status).toEqual(200))
});

test('works with POST /tasks', () => {
	expect.assertions(1);
    return fetch(url)
        .then(r => expect(r.status).toEqual(200))
});

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

test('works with correct GET /tasks/:taskid', () => {
	expect.assertions(1); 
	return fetch(url+'tasks/1')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(200));
});

test('works with 404 GET /tasks/:taskid', () => {
	expect.assertions(1); 
	return fetch(url+'tasks/999999')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(404));
});

test('works with 400 GET /tasks/:taskid', () => {
	expect.assertions(1); 
	return fetch(url+'tasks/a')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

// ------- END TASKS

// ------- USERS

test('works with GET /users', () => {
	expect.assertions(1);
    return fetch(url+"users")
        .then(r => expect(r.status).toEqual(200))
});

test('works with correct POST /users', () => {
	expect.assertions(1);
	return fetch(url+"users", {
		method: 'POST',
		body: JSON.stringify(user_valido1),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});

test('works with wrong POST /users', () => {
	expect.assertions(1); 
	return fetch(url+"users", {
		method: 'POST',
		body: JSON.stringify(user_nonvalido3),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});
/*
const putUser = function(id, toModify){
	return fetch(url+"users/"+id,{
		method: 'PUT',
		headers: {
		 'Content-Type': 'application/json',
		 'Accept': 'application/json'
		},
		body: JSON.stringify(toModify)
	});
}

test('PUT user con id null', () => {
	return putUser(null, user_valido1)
		.then(putResponse => {expect(putResponse.status).toBe(404)});
});

test('PUT user con id non valido', () => {
	return putUser(-1, user_valido1)
		.then(putResponse => {expect(putResponse.status).toBe(404)});
});

test('PUT user giusto', () => {
	return putUser(1, user_valido1)
		.then(putResponse => {expect(putResponse.status).toBe(204)});
});

test('PUT user con nuovi dati non validi', () => {
	return putUser(null, user_nonvalido4)
		.then(putResponse => {expect(putResponse.status).toBe(404)});
});

const deleteUser = function(userID){
	return fetch(url+"users/"+userID, {
	  method: 'DELETE',
	  headers: {
		'Accept': 'application/json'
	  }
	});
 };

test('delete user valido',()=>{
    return deleteUser(1)
    .then(res=>{
      expect(res.status).toBe(204);
  })
});

test('delete user non valido',()=>{
    return deleteUser(-1)
    .then(res=>{
      expect(res.status).toBe(404);
  })
});
*/
test('works with correct GET /users/:userid', () => {
	expect.assertions(1); 
	return fetch(url+'users/1')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(200));
});
 test('works with 404 GET /users/:userid', () => {
	expect.assertions(1); 
	return fetch(url+'users/999999')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(404));
});
 test('works with 400 GET /users/:userid', () => {
	expect.assertions(1); 
	return fetch(url+'users/a')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

//afterAll(() => setTimeout(() => process.exit(), 1000));

// ------- END USERS

// ------- GROUPS

test('works with GET /groups', () => {
	expect.assertions(1);
    return fetch(url+"groups")
        .then(r => expect(r.status).toEqual(200))
});

test('works with correct POST /groups', () => {
	expect.assertions(1);
	return fetch(url+"groups", {
		method: 'POST',
		body: JSON.stringify(group_valido1),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});

test('works with wrong POST /groups', () => {
	expect.assertions(1); 
	return fetch(url+"groups", {
		method: 'POST',
		body: JSON.stringify(group_nonvalido2),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

test('works with correct GET /groups/:groupid', () => {
	expect.assertions(1); 
	return fetch(url+'groups/1')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(200));
});

test('works with 404 GET /groups/:groupid', () => {
	expect.assertions(1); 
	return fetch(url+'groups/999999')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(404));
});

test('works with 400 GET /groups/:groupid', () => {
	expect.assertions(1); 
	return fetch(url+'groups/a')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

// ------- END GROUPS

// ------- ANSWERS


//------> CORREGGERE CHE DA ERRORI CON I TEST <-----------


test('works with GET /answers', () => {
	expect.assertions(1);
    return fetch(url+"answers")
        .then(r => expect(r.status).toEqual(200))
});

test('works with correct POST /answers', () => {
	expect.assertions(1);
	return fetch(url+"answers", {
		method: 'POST',
		body: JSON.stringify(answer_valida1),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});

test('works with wrong POST /answers', () => {
	expect.assertions(1);
	return fetch(url+"answers", {
		method: 'POST',
		body: JSON.stringify(answer_nonvalida1),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

test('works with correct GET /answers/:answerid', () => {
	expect.assertions(1); 
	return fetch(url+'answers/1')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(200));
});

test('works with 404 GET /answers/:answerid', () => {
	expect.assertions(1); 
	return fetch(url+'answers/999999')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(404));
});

test('works with 400 GET /answers/:answerid', () => {
	expect.assertions(1); 
	return fetch(url+'answers/a')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

// ------- END ANSWERS

// ------- EXAMS

test('works with GET /exams', () => {
	expect.assertions(1);
    return fetch(url+"exams")
        .then(r => expect(r.status).toEqual(200))
});

test('works with correct POST /exams', () => {
	expect.assertions(1);
	return fetch(url+"exams", {
		method: 'POST',
		body: JSON.stringify(exam_valido1),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(201));
});

test('works with wrong POST /exams', () => {
	expect.assertions(1); 
	return fetch(url+"exams", {
		method: 'POST',
		body: JSON.stringify(exam_nonvalido1),
		headers: {
			'Content-Type': 'application/json',
		},
    })
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

test('works with correct GET /exams/:examid', () => {
	expect.assertions(1); 
	return fetch(url+'exams/1')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(200));
});

test('works with 404 GET /exams/:examid', () => {
	expect.assertions(1); 
	return fetch(url+'exams/999999')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(404));
});

test('works with 400 GET /tasks/:taskid', () => {
	expect.assertions(1); 
	return fetch(url+'exams/a')
	//.then(r => r.json())
    .then(r => expect(r.status).toEqual(400));
});

// ------- END EXAMS