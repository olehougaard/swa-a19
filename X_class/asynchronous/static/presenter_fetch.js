export default (init_model, view) => {
  let model = init_model

  const onAction = ({type, ...params}) =>  {
    switch(type) {
      case 'hire':
        const { id } = params
        const salary = view.prompt('Salary?')
        if (salary) {
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          fetch('http://localhost:9090/employees', { method: 'POST', body: JSON.stringify({salary, manager:false}), headers })
          .then(res => res.json())
          .then(employee => {
            const { employeeId } = employee
            fetch('http://localhost:9090/persons/' + id, { method: 'PATCH', body: JSON.stringify({ employeeId }), headers })
            .then(res => res.json())
            .then(person => {
              model = model.addEmployee(employee).updatePerson(person)
              view.update(model)
            })
          })
        }
        break;
    }
  }

  return { onAction }
}
