const model = (persons, employees, filter = () => true) => {
    const employeeMap = {}
    employees.forEach(e => employeeMap[e.employeeId] = e)

    const personData = () => persons
        .map(p => ({ ...p, ...employeeMap[p.employeeId]}))
        .filter(filter)

    const updatePerson = p => model(persons.map(pp => p.id === pp.id? p : pp), employees, filter)
    const addEmployee = e => model(persons, employees.concat(e), filter)

    const filtered = filter => model(persons, employees, filter )
    const all = () => model(persons, employees)

    return { personData, updatePerson, addEmployee, filtered, all }
}

export default model
