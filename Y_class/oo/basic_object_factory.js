function quad_solver_factory(a, b) {
    function discriminant(c) {
        return b**2 + 4 * a * c
    }
    function solutions(c) { 
        return [(-b - Math.sqrt(discriminant(c)))/(2*a), 
                (-b + Math.sqrt(discriminant(c)))/(2*a)] 
    }
    return {
        solutions: solutions,
        solver: function() { 
            return function(c) { 
                return solutions(c) 
            }    
        }
    }
}

let quadratic_solver = quad_solver_factory(1, 4)
console.log(quadratic_solver.solutions(2))

function person_factory(name) {
    function getName() {
        return name
    }
    function setName(newName) {
        name = newName
    }
    return { getName: getName, setName: setName }
}

let person = person_factory('Me')
console.log(person.getName())
person.setName('You')
console.log(person.getName())
