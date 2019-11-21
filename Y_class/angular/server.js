const express = require('express')
const body_parser = require('body-parser')

const app = express()
app.use(express.static('static'))

app.use(body_parser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
  });

const persons = {
    '1': { id: 1, name: 'John Doe' },
    '2': { id: 2, name: 'Jane Doe', employeeId: 17 },
    '3': { id: 3, name: 'George Deer', employeeId: 19 },
    '4': { id: 4, name: 'Jill Deer', employeeId: 23 },
}

const employees = {
    '17': { employeeId: 17, salary: 42000, manager: false },
    '19': { employeeId: 19, salary: 35000, manager: false },
    '23': { employeeId: 23, salary: 74000, manager: true },
}

const employeeIds = [ 29, 31, 37, 41, 43, 47 ]

const subordinates = {
    '23': [ 17, 19 ]
}

app.get('/persons', (_, res) => {
    res.send(Object.values(persons))
})

app.get('/persons/:id', (req, res) => {
    const id = req.params.id
    if (persons[id])
        res.send(persons[id])
    else {
        res.status(404)
        res.send()
    }
})

app.patch('/persons/:id', (req, res) => {
    const id = req.params.id
    const person = req.body
    if (person.id && person.id != id) {
        res.status(409)
        res.send()
    } else if (persons[id]) {
        Object.assign(persons[id], person)
        res.send(persons[id])
    } else {
        res.status(404)
        res.send()
    }
})

app.get('/employees', (_, res) => {
    res.send(Object.values(employees))
})

app.post('/employees', (req, res) => {
    const employee = req.body
    employee.employeeId = employeeIds.shift()
    employees[employee.employeeId] = employee
    res.send(employee)
})

app.get('/employees/:id', (req, res) => {
    const id = req.params.id
    if (employees[id])
        res.send(employees[id])
    else {
        res.status(404)
        res.send()
    }
})

app.get('/employees/:id/subordinates', (req, res) => {
    const id = req.params.id
    if (employees[id] && employees[id].manager)
        res.send(subordinates[id].map(sub => employees[sub]) || [])
    else {
        res.status(404)
        res.send()
    }
})

app.post('employees/:id/subordinates', (req, res) => {
    const id = req.params.id
    const empId = req.body.employeeId
    if (!employees[id] || !employees[id].manager){
        res.status(404)
        res.send()
    } else if (subordinates[id]) {
        subordinates[id].push(empId)
    } else {
        subordinates[id] = [empId]
    }
    res.send(JSON.stringify(employees[empId]))
})

app.listen(9090, () => console.log("Server is listening on 9090"))
