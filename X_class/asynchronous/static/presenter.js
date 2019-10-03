export default (init_model, view) => {
  let model = init_model

  const onAction = ({type, ...params}) =>  {
    switch(type) {
      case 'hire':
        const { id } = params
        const salary = view.prompt('Salary?')
        if (salary) {
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          let employee
          const person
          model = model.addEmployee(employee).updatePerson(person)
          view.update(model)
        }
        break;
    }
  }

  return { onAction }
}
