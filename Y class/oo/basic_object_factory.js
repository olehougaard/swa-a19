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