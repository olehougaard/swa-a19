const pipe = (...fs) => x => fs.reduce((f, y) => f(y), x)
const compose = (...fs) => x => fs.reduceRight((f, y) => f(y), x)

// Concatenative inheritance mixin style

function Eventful({time, place}) {
    function getTime() { return time }
    function getPlace() { return place }
    return { getTime, getPlace }
}

/*
Equivalent to:
function Eventful(state) {
    let time = state.time
    let place = state.placew
    function getTime() { return time }
    function getPlace() { return place }
    return { getTime: getTime, getPlace: getPlace }
}
*/

function Typed({type, unit}) {
    function getType() { return type }
    function getUnit() { return unit }
    return {getType, getUnit}
}

function WeatherData(state) {
    function getValue() { return state.value }
    return Object.assign({}, {getValue}, Eventful(state), Typed(state))
}

function withTemperature(state) {
    function convertToF() { 
        if (state.unit === 'C') {
            state.unit = 'F'
            state.value = state.value * (9 / 5) + 32
        }
    }
    function convertToC() { 
        if (state.unit === 'F') {
            state.unit = 'C'
            state.value = (state.value - 32) * (5 / 9)
        }
    }
    return { convertToF, convertToC }
}

function create_temperature(value, time, place, type, unit) {
    let state = {value, time, place, type, unit}
    return Object.assign({}, WeatherData(state), withTemperature(state))
}

// Concatenative inheritance with composition

function Eventful(time, place, obj) {
    const getTime = () => time
    const getPlace = () => place 
    return { ...obj, getTime, getPlace }
}

const Typed = (type, unit, obj) => {
    const getType = () => type
    const getUnit = () => unit
    const setUnit = _unit => { unit = _unit }
    return { ...obj, getType, getUnit, setUnit }
}

const WeatherData = (value, obj) => {
    const getValue = () => value
    const setValue = _value => { value = _value }
    return { ...obj, getValue, setValue }
}

function withTemperature(obj) {
    function convertToF() { 
        if (obj.getUnit() === 'C') {
            obj.setUnit('F')
            obj.setValue(obj.value * (9 / 5) + 32)
        }
    }
    function convertToC() { 
        if (obj.getUnit() === 'F') {
            obj.setUnit('C')
            obj.setValue((state.value - 32) * (5 / 9))
        }
    }
    return { ...obj, convertToF, convertToC }
}

const create_temperature = (value, place, time, unit) => {
    const event = Eventful(place, time, {})
    const type = Typed('Temperature', unit, event)
    const data = WeatherData(value, type)
    const temp = withTemperature(data)
    return temp
}

// With true composition

const Eventful = (time, place) => obj => {
    const getTime = () => time
    const getPlace = () => place 
    return { ...obj, getTime, getPlace }
}

const Typed = (type, unit) => obj => {
    const getType = () => type
    const getUnit = () => unit
    const setUnit = _unit => { unit = _unit }
    return { ...obj, getType, getUnit, setUnit }
}

const WeatherData = value => obj => {
    const getValue = () => value
    const setValue = _value => { value = _value }
    return { ...obj, getValue, setValue }
}

const withTemperature = () => obj => {
    function convertToF() { 
        if (obj.getUnit() === 'C') {
            obj.setUnit('F')
            obj.setValue(obj.value * (9 / 5) + 32)
        }
    }
    function convertToC() { 
        if (obj.getUnit() === 'F') {
            obj.setUnit('C')
            obj.setValue((state.value - 32) * (5 / 9))
        }
    }
    return { ...obj, convertToF, convertToC }
}

const create_temperature = (value, place, time, unit) => {
    const event = Eventful(place, time)
    const type = Typed('Temperature', unit)
    const data = WeatherData(value)
    const temp = withTemperature()
    const f = compose(temp, data, type, event)
    // const f = pipe(event, type, data, temp)
    return f({})
}

// Mutable vs immutable
// Mutable:
class Person {
    constructor(name) {
        this.name = name
    }

    getName() { return name }
    setName(name) { this.name = name }
}


// Immutable - not OO:
const create_person = (name, age) => {
    const getName = () => name
    const getAge = () => age
    const setName = _name => create_person(_name, age)
    const advanceAge = () => create_person(name, age + 1)
    return { getName, getAge, setName, advanceAge }
}

// Data + functions
const create_person1 = (name, age) => Object.freeze({name, age})
const setName = name => obj => ({...obj, name})
const advanceAge = obj => ({...obj, age: obj.age + 1})

