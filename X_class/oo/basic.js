let m = { "Seven": 7, "Zero": 0}

console.log(m["Seven"])

m = { Seven: 7, Zero: 0}

console.log(3 * '3')
console.log(3 * 'Orangutang')
console.log(m["One"])
console.log(3 === '3')
console.log(m.Seven)

let p = {
    x: 3,
    y: 4
}

p.x = 4
console.log(p)
delete p.y
console.log(p)
p.y = 3
console.log(p)

function distance() {
  return Math.sqrt(this.x**2 + this.y**2)
}

p.distance = distance
console.log(p.distance())

function add(x, y) {
    function sum() {
    // Scope: x, y, sum, add, a, b
    return x + y
    }
    // Scope: x, y, sum, add
    return sum
}

let f = add(2, 2)
console.log(f())

console.log()
console.log(p.distance === distance)
console.log(p.distance())

p = {
    x: 3,
    y: 4,
    distance: function() { return Math.sqrt(this.x**2 + this.y**2 ) }
}

let g = p.distance
console.log(g())

// myButton.onClick = function() { myController.handleClick() }
// myButton.onClick = myController.handleClick.bind(myController)
console.log(distance.bind(p)())
console.log(distance.call(p))

