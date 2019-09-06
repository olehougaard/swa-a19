function create_quad_solver(a, b) {
    function discriminant (c) { 
        return b**2 - 4 * a * c 
    }
    function solutions(c) { 
        return [(-b - Math.sqrt(discriminant(c)))/(2*a), 
                (-b + Math.sqrt(discriminant(c)))/(2*a)] 
    }
    function solver(c) {
        return function() { 
            return solutions(c) 
        } 
    }
    return {
        solutions: solutions,
        solver: solver 
    }
}

let qs = create_quad_solver(1, 4)
console.log(qs.solutions(4))
let f = qs.solver(4)
console.log(f())

function create_person(name) {
    function getName() {
        return name
    }
    function setName(newName) {
        name = newName
    }
    return { getName: getName, setName: setName }
}
