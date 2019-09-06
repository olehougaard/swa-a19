let quadratic_solver = {
    a: 1,
    b: 4,
    discriminant: function(c) { 
        return this.b**2 - 4 * this.a * c 
    },
    solutions: function(c) { 
        return [(-this.b - Math.sqrt(this.discriminant(c)))/(2*this.a), 
                (-this.b + Math.sqrt(this.discriminant(c)))/(2*this.a)] 
    },
    solver: function(c) {
        let self = this 
        return function() { 
            return self.solutions(c) 
        } 
    }
}

console.log(quadratic_solver.solutions(4))
let f = quadratic_solver.solver(4)
console.log(f())