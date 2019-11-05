function bindValue(comp, { addListener }, get, set) {
    comp.onchange = () => set(comp.value)
    addListener(() => { comp.value = get() })
}

export default (window, viewmodel) => {
    const document = window.document
    const table_body = document.getElementById('employee_data')
    const salary = document.getElementById('salary')
    bindValue(salary, viewmodel, viewmodel.getSalary, viewmodel.setSalary)

    const addPerson = p => {
        const tr = table_body.appendChild(document.createElement('tr'))
        tr.insertCell().appendChild(document.createTextNode(p.id))
        tr.insertCell().appendChild(document.createTextNode(p.name))
        if (p.employeeId) {
            tr.insertCell().appendChild(document.createTextNode(p.employeeId))
            tr.insertCell().appendChild(document.createTextNode(p.salary || 0))
            tr.insertCell().appendChild(document.createTextNode(!!p.manager))
        } else {
            const button = tr.insertCell().appendChild(document.createElement('button'))
            button.appendChild(document.createTextNode("Hire"))
            button.onclick = () => {
                viewmodel.hire(p.id)
            }
            tr.insertCell()
            tr.insertCell()
        }
    }

    const update = persons => {
        while(table_body.firstChild) table_body.removeChild(table_body.firstChild)
        persons.forEach(addPerson)
    }

    viewmodel.addListener(() => update(viewmodel.personData()))
    update(viewmodel.personData())
}
