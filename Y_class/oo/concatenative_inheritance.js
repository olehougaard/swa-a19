function create_animal(name) {
    return {
        getName() { return name },
        setName(newName) { name = newName },
        poop() { console.log(name + "is pooping") }
    }
}

function create_robot(name) {
    return {
        getName() { return name },
        drive() { console.log(name + "is driving") }
    }
}

function feline(obj) {
    const name = obj.getName()
    function mew() { console.log(name + "is mewing") }
    return Object.assign({}, obj, { mew })
}

function feline(obj) {
    const name = obj.getName()
    function mew() { console.log(name + "is mewing") }
    return Object.assign({}, obj, { mew })
}

function feline(obj) {
    const name = obj.getName()
    function mew() { console.log(name + "is mewing") }
    return Object.assign({}, obj, { mew })
}

function canine(obj) {
    const name = obj.getName()
    function bark() { console.log(name + "is barking") }
    return Object.assign({}, obj, { bark })
}

function murdering(obj) {
    const name = obj.getName()
    function kill(victim) { console.log(name + " is killing " + victim) }
    return Object.assign({}, obj, { kill })
}

function create_murder_robot_dog(name) {
    const robot = create_robot(name)
    const robot_dog = canine(robot)
    const robot_murder_dog = murdering(robot_dog)
    return robot_murder_dog
}
