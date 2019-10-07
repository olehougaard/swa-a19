export default (init_model, view) => {
  let model = init_model

  const onAction = ({type, ...params}) =>  {
    switch(type) {
      case 'hire':
        const { id } = params
        const salary = view.prompt('Salary?')
        if (salary) {
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          const employee_res = await fetch('http://localhost:9090/employees', { method: 'POST', body: JSON.stringify({salary, manager:false}), headers })
          const employee = await employee_res.then(res => res.json())
          const { employeeId } = employee
          const person_res = await fetch('http://localhost:9090/persons/' + id, { method: 'PATCH', body: JSON.stringify({ employeeId }), headers })
          const person = await person_res.then(res => res.json())
          model = model.addEmployee(employee).updatePerson(person)
          view.update(model)
        }
        break;
    }
  }

  return { onAction }
}
