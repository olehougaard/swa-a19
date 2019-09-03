console.log("Hello, World!")

let hash = {}
hash['Milk'] = 9.99
console.log(hash['Milk'])
delete hash['Milk']
console.log(hash['Milk'])

console.log()

hash.Milk = 9.99
console.log(hash.Milk)
delete hash.Milk
console.log(hash.Milk)

let p = {
    x: 20,
    y: 100,
    distance: function() {
        return Math.sqrt(square(this.x) + square(this.y))
    }
}

function square(x) {
    return x * x
}

let square2 = function(x) {
    return x ** 2
}

let distance = p.distance

console.log(7 === '7')

function add(a, b) {
    function sum() {
    // In scope: a, b, sum
        return a + b
    }
    // In scope: a, b, sum
    return sum
}

let s = add(3, 4)
console.log(distance())

button.onClick = function() { controller.doSomething() }
