// Higher-order functions

const pets = [{type: 'dog', name:'Fido'}, {type: 'cat', name: 'Hannibal'}, {type:'dog', name: 'Rover'}]

let names = ps => {
    let res = []
    for(pet of ps) {
        res.push(pet.name) // pet => pet.name
    }
    return res
}

let types = ps => {
    let res = []
    for(pet of ps) {
        res.push(pet.type) // pet => pet.type
    }
    return res
}

let map = f => a => {
    let res = []
    for(x of a) {
        res.push(f(x))
    }
    return res
}

const curry_names = map(pet => pet.name)
const curry_types = map(pet => pet.type)

console.log(curry_names(pets))
console.log(map(pet => pet.name)(pets))
console.log(pets.map(pet => pet.name))

console.log(pets.filter(pet => pet.type === 'dog'))

const names_of_dogs = pets
    .filter(pet => pet.type === 'dog')
    .map(pet => pet.name)

console.log(names_of_dogs)
// More options in immutable.js

const count_pets = ps => {
    let acc = { dogs: 0, cats: 0}
    for(pet of ps) {
        acc = {...acc, [pet.type + 's']: acc[pet.type + 's'] + 1}
    }
    return acc
}

console.log(count_pets(pets))

const pet_count = pets
  .reduce((acc, pet) => ({...acc, [pet.type + 's']: acc[pet.type + 's'] + 1}), 
          { dogs: 0, cats: 0})

const numbers = [2, 3, 4, -12, 9]
const sum = numbers.reduce((acc, value) => acc + value, 0)
