let pt = {
    x: 200,
    y: 100,
    getX: function() { return this.x },
    getY: function() { return this.y },
}

console.log(pt.getX())
// Doesn't work
let f = pt.getX
console.log(f())
// Works
let g = function() { return pt.getX() }
console.log(g())
// Also works:
console.log(f.call(pt))
// Also works
g = pt.getX.bind(pt) // or: f.bind(pt)

// Exercise 2
function create_point(x, y) {
    function getX() { return x }
    function getY() { return y }
    function moveTo(newX, newY) {
        x = newX
        y = newY
    }
    function toString() { return "asdælfkjdj" }
    function copy() { return create_point(x, y) }
    return {
        getX: getX,
        getY: getY,
        moveTo: moveTo,
        toString: toString,
        copy: copy
    }
}

function create_circle(center, radius) {
    function getCenter() { return center }
    function getRadius() { return radius }
    function moveTo(newX, newY) { center.moveTo(newX, newY) }
    function toString() { return "asdæklfajhkl" }
    // With syntactic sugar from ES6
    return {
        getCenter, // Short for getCenter: getCenter
        getRadius,
        moveTo,
        toString
    }
}

pt = create_point(200, 100)
f = pt.getX
console.log(f())

// Constructor
function Point(x, y) {
    this.x = x
    this.y = y
    this.getX = function() { return this.x }
    this.getY = function() { return this.y }
    this.moveTo = function(newX, newY) {
        this.x = newX
        this.y = newY
    }
    this.toString= function() { return "asdælfkjdj" }
    this.copy = function() { return create_point(this.x, this.y) }
}

pt = new Point(100, 200)
console.log(pt.getX())
console.log(pt.x)

// Constructor w/prototype
function PointProto(x, y) {
    this.x = x
    this.y = y
}

PointProto.prototype.getX = function() { return this.x }
PointProto.prototype.getY = function() { return this.y }
PointProto.prototype.moveTo = function(newX, newY) {
    this.x = newX
    this.y = newY
}
PointProto.prototype.toString= function() { return "asdælfkjdj" }
PointProto.prototype.copy = function() { return create_point(this.x, this.y) }

pt = new PointProto(50, 75)
console.log(pt.getX())

// Using class keyword
class PointClass {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getX() { return this.x }
    getY() { return this.y }
    moveTo(newX, newY) {
        this.x = newX
        this.y = newY
    }
    toString() { return "asdælfkjdj" }
    copy() { return create_point(this.x, this.y) }
}

pt = new PointClass(10, 10)
console.log(pt.getX())
console.log(typeof PointClass)
console.log(typeof PointClass.prototype.getX)

// Inheritance
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
    }
    getFullName() { return this.firstName + ' ' + this.lastName }
}

class Employee extends Person {
    constructor(firstName, lastName, salary) {
        super(firstName, lastName)
        this.salary = salary
    }

    toString() { return super.getFullName() + ': ' + this.salary }
}

// What's going on underneath
// __proto__
let p = new Person('Abe', 'Lincoln')
let e = { salary: 10000 }
Object.setPrototypeOf(e, p)
console.log(e.__proto__ === p) // true
console.log(e.firstName) // Abe
e.firstName = 'Abraham'
console.log(e.firstName) // Abraham
console.log(p.firstName) // Abe
console.log(p.__proto__ === Person.prototype) // true
console.log(Person.__proto__ === Function.prototype) //true
console.log(Employee.prototype.__proto__ === Person.prototype)
let e2 = new Employee('Abe', 'Lincoln', 10000)
console.log(e2.getFullName())

// Before class keyword
function Person2014(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}
Person2014.prototype.getFullName = function() { return this.firstName + this.lastName }

function Employee2014(firstName, lastName, salary) {
    Person2014.call(this, firstName, lastName)
    this.salary = salary
}
Employee2014.prototype.toString = function() { return this.getFullName() + ': ' + salary }
Object.setPrototypeOf(Employee2014.prototype, Person2014.prototype)

// Concatenative inheritance / mixins
function create_person(firstName, lastName) {
    function getFirstName() { return firstName }
    function getLastName() { return lastName }
    function getFullName() { return firstName + ' ' + lastName }
    return { getFirstName, getLastName, getFullName }
}

function salaried(obj, salary) {
    function toString() { return obj.getFullName() + ': ' + salary }
    function getSalary() { return salary }
    return Object.assign(obj, { getSalary, toString })
}

function create_employee(firstName, lastName, salary) {
    return salaried(create_person(firstName, lastName), salary)
}

// Alternative implementation
// Concatenative inheritance / mixins
function create_person({firstName, lastName}) {
    function getFirstName() { return firstName }
    function getLastName() { return lastName }
    function getFullName() { return firstName + ' ' + lastName }
    return { getFirstName, getLastName, getFullName }
}

function salaried(obj) {
    function toString() { return obj.firstName + ' ' + obj.lastName + ': ' + salary }
    function getSalary() { return obj.salary }
    return { getSalary, toString }
}

function create_employee(firstName, lastName, salary) {
    let obj = {firstName, lastName, salary}
    return Object.assign({}, create_person(obj), salaried(obj))
}

