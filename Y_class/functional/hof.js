// Higher-order functions

const pets = [
    {type: 'dog', name:'Fido'}, 
    {type: 'cat', name: 'Hannibal'}, 
    {type: 'dog', name: 'Rover'},
    {type: 'dragon', name: 'Fluffykins'}]

const names = pets => {
    let acc = []
    for(let p of pets) {
        acc.push(p.name)
    }
    return acc
}

const types = pets => {
    let acc = []
    for(let p of pets) {
        acc.push(p.type)
    }
    return acc
}

const map = f => xs => {
    let acc = []
    for(let x of xs) {
        acc.push(f(x))
    }
    return acc
}

const namesHOF = map(pet => pet.name)
const typesHOF = map(pet => pet.type)

const namesJS = pets => pets.map(pet => pet.name)
const typesJS = pets => pets.map(pet => pet.type)

console.log(names(pets))

const dogs = pets.filter(pet => pet.type === 'dog')
console.log(dogs)

const dogNames = pets.filter(pet => pet.type === 'dog').map(pet => pet.name)
console.log(dogNames)

const typeCount = pets => {
    let result = { dog: 0, cat: 0, dragon: 0}
    for(let pet of pets) {
        result = { ...result, [pet.type]: result[pet.type]+1 }
    }
    return result
}

const sum = is => {
    let result = 0
    for(let i of is) {
        result = result + i
    }
    return result
}

const reduce = (f, init) => xs => {
    let result = init
    for(let x of xs) {
        result = f(result, x)
    }
    return result
}

const typeCountHOF = reduce(
    (result, pet) => ({ ...result, [pet.type]: result[pet.type]+1 }),
    { dog: 0, cat: 0, dragon: 0})
const sumHOF = reduce((result, i) => result + i, 0)

const typeCountJS = pets => pets.reduce(
    (result, pet) => ({ ...result, [pet.type]: result[pet.type]+1 }),
    { dog: 0, cat: 0, dragon: 0})
const sumJS = is => is.reduce((result, i) => result + i, 0)


console.log(typeCount(pets))
let number_array = [34, 234, 324, -123]
console.log(sum(number_array))

// Monkey patching - handle with care
Array.prototype.sum = function() { return this.reduce((result, i) => result + i, 0) }
console.log(number_array.sum())
