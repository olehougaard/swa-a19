export default (init_model, view) => {
  let model = init_model

  const onAction = ({type, ...params}) =>  {
    switch(type) {
      case 'hire':
        const { id } = params
        const salary = view.prompt('Salary?')
        if (salary) {
          const request = new XMLHttpRequest()
          request.open('POST', 'http://localhost:9090/employees')
          request.setRequestHeader('Content-Type', 'application/json')
          request.setRequestHeader('Accept', 'application/json')
          request.send(JSON.stringify({ salary, manager: false }))
          request.onload = () => {
            const employee = JSON.parse(request.responseText)
            const { employeeId } = employee
            request.open('PATCH', 'http://localhost:9090/persons/' + id)
            request.setRequestHeader('Content-Type', 'application/json')
            request.setRequestHeader('Accept', 'application/json')
            request.send(JSON.stringify({ employeeId }))
            request.onload = () => {
              const person = JSON.parse(request.responseText)
              model = model.addEmployee(employee).updatePerson(person)
              view.update(model)
            }
          }
        }
        break;
    }
  }

  return { onAction }
}
