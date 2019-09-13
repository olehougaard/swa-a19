// Exercise 2
function create_point(x, y) {
    function getX() { return x }
    function getY() { return y }
    function moveTo(newX, newY) {
        x = newX
        y = newY
    }
    function toString() { return "(" + x + ", " + y + ")" }
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
    function toString() { return "Some string" }
    return { getCenter, getRadius, moveTo, toString }
}

// Factory vs Constructor

// Factory
function create_person(name) {
    function getName() {
        return name
    }
    function setName(newName) {
        name = newName
    }
    return { getName, setName }
}

// Constructor
function Person(name) {
    "use strict"
    this.name = name
    this.getName = function() {
        return this.name
    }
    this.setName = function(name) {
        this.name = name
    }
}

const person = new Person('Ole')
person.setName('Ollie')
console.log(person)

const person2 = new create_person('Ole')
console.log(person2.getName())

// const person3 = Person('Ole') - Error if you remember "use strict"
// console.log(person3.getName()) - Error: person3 is undefined

// Constructor w/prototype
function Person2(name) {
    "use strict"
    this.name = name
}

Person2.prototype.getName = function() {
    return this.name
}

Person2.prototype.setName = function(name) {
    this.name = name
}

let person21 = new Person2("George")
person21.setName("Joe")
console.log(person21.getName())

// class keyword
class Person3 {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
    
    setName(name) {
        this.name = name
    }
}

let person31 = new Person3("George")
person31.setName("Joe")
console.log(person31.getName())
