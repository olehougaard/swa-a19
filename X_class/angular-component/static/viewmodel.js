export default (init_model) => {
  let model = init_model
  let listeners = []

  const addListener = listener => listeners.push(listener)

  const notify = () => listeners.forEach(listener => listener())

  const hire = async (id, salary) => {
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    const employee_res = await fetch('http://localhost:9090/employees', { method: 'POST', body: JSON.stringify({salary, manager:false}), headers })
    const employee = await employee_res.json()
    const { employeeId } = employee
    const person_res = await fetch('http://localhost:9090/persons/' + id, { method: 'PATCH', body: JSON.stringify({ employeeId }), headers })
    const person = await person_res.json()
    model.addEmployee(employee)
    model.updatePerson(person)
    notify()
  }

  const personData = () => model.personData()

  return { hire, addListener, personData }
}
