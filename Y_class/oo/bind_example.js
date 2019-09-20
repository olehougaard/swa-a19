class Animal {
    constructor(name) {
        this.name = name
    }
    poop() {
        console.log(this.name + ' poops')
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name)
    }
    mew() {
        console.log(this.name + ' mews')
    }
}

function perform(actions) {
    for(action of actions) {
        // Global calling context. This is bound to global object or undefined
        action()
    }
}

let cat = new Cat('Spot')
// Doesn't work - loses context
// perform([cat.poop, cat.mew])

// bind() binds the value of 'this' (and optionally a number of other parameters)
const bound_poop = cat.poop.bind(cat)
const bound_mew = cat.mew.bind(cat)
console.log(cat.poop)
console.log(bound_poop)
// Bound functions do not look up 'this' in the calling context
perform([bound_poop, bound_mew])

let dog = { name: 'Fido' }
const dog_poop = cat.poop.bind(dog)
dog_poop()
console.log(cat.__proto__.poop)

// Binding the method in a constructor
class Dog extends Animal {
    constructor(name) {
        super(name)
        this.bark = function() {
            console.log(this.name + " barks")
        }.bind(this)
    }
}

const dog1 = new Dog("Name 1")
const f = dog1.bark
f()
