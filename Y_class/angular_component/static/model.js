const model = (persons, employees) => {
    const employeeMap = {}
    employees.forEach(e => employeeMap[e.employeeId] = e)

    const personData = () => persons
        .map(p => ({ ...p, ...employeeMap[p.employeeId]}))

    const updatePerson = p => {
        let i = persons.findIndex(pp => pp.id == p.id)
        persons[i] = p
    }
    const addEmployee = e => {
        employees.push(e)
        employeeMap[e.employeeId] = e
    }

    return { personData, updatePerson, addEmployee }
}

export default model
