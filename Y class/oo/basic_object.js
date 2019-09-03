let quadratic_solver = {
    a: 1,
    b: 4,
    discriminant: function(c) { 
        return this.b**2 + 4 * this.a * c 
    },
    solutions: function(c) { 
        return [(-this.b - Math.sqrt(this.discriminant(c)))/(2*this.a), 
                (-this.b + Math.sqrt(this.discriminant(c)))/(2*this.a)] 
    },
    solver: function() { 
        let self = this
        return function(c) { 
            return self.solutions(c) 
        } 
    }
}

let solver = quadratic_solver.solver()
console.log(solver(2))
