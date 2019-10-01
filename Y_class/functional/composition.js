const pipe = (...fs) => x => fs.reduce((y, f) => f(y), x)
const compose = (...fs) => x => fs.reduceRight((y, f) => f(y), x)

// Concatenative inheritance mixin style

function Event({time, place}) {
    function getTime() { return time }
    function getPlace() { return place }
    return { getTime, getPlace }
}

function DataType({type, unit}) {
    function getType() { return type }
    function getUnit() { return unit }
    return { getType, getUnit } // Short for { getType: getType, getUnit: getUnit }
}

function WeatherData(state) {
    let {value} = state
    function getValue() { return value }
    let event = Event(state)
    let dt = DataType(state)
    return {getValue, ...event, ...dt}
}

function Temperature(state) {
    function convertToF() {
        if (state.unit === 'C') {
            state.unit = 'F'
            state.value = state.value * 9 / 5 + 32
        }
    }
    function convertToC() {
        if (state.unit === 'F') {
            state.unit = 'C'
            state.value = (state.value - 32) * 5 / 9
        }
    }
    return { convertToF, convertToC }
}

function create_temperature(time, place, unit, value) {
    let state = {time, place, type: 'Temperature', unit, value}
    return { ...Temperature(state), ...WeatherData(state) }
}

// Composition
const CEvent = (time, place) => obj => {
    const getTime = () => time
    const getPlace = () => place
    return { ...obj, getTime, getPlace }
}

const CDataType = (type, unit) => obj => {
    const getType = () => type
    const getUnit = () => unit
    const setUnit = _unit => { unit = _unit }
    return { ...obj, getType, getUnit, setUnit }
}

const CWeatherData = value => obj => {
    const getValue = () => value
    const setValue = _value => { value = _value }
    return { ...obj, getValue, setValue }
}

const CTemperature = () => obj => {
    const convertToF = () => {
        if (obj.getUnit() === 'C') {
            obj.setUnit('F')
            obj.setValue(9 / 5 * obj.getValue() + 32)
        }
    }
    const convertToC = () => {
        if (obj.getUnit() === 'F') {
            obj.setUnit('C')
            obj.setValue((obj.getValue() - 32) * 5 / 9)
        }
    }
    return { ...obj, convertToF, convertToC }
}

const temperature_creator = (time, place, unit, value) => 
    pipe(
        CEvent(time, place), 
        CDataType('Temperature', unit), 
        CWeatherData(value), 
        CTemperature())

const temp_obj = temperature_creator('Now', 'Horsens', 'C', 12)({})

// Mutable vs immutable
// Mutable:
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    getName() { return this.name }
    getAge() { return this.age }
    setName(name) { this.name = name }
    advanceAge() { this.age++ }
}

// Immutable - OO
class IPerson {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    getName() { return this.name }
    getAge() { return this.age }
    setName(name) { return new IPerson(name, this.age) }
    advanceAge() { return new IPerson(this.name, this.age + 1) }
}

const create_person1 = (name, age) => {
    const getName = () => name
    const getAge = () => age
    const setName = _name = create_person1(_name, age)
    const advanceAge = () => create_person1(name, age + 1)
    return {getName, getAge, setName, advanceAge}
}

// Data + functions
const create_person = (name, age) => Object.freeze({ name, age })
const withName = name => ({age}) => create_person(name, age)
const afterBirthday = ({name, age}) => create_person(name, age + 1)

const p = create_person('Joe', 42)
console.log(p)
p.age = 88
console.log(p)
