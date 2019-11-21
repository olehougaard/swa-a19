export default (window, viewmodel) => {
    const document = window.document
    const table_body = document.getElementById('employee_data')

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
                const salary = window.prompt('Salary?')
                if (salary) {
                    viewmodel.hire(p.id, salary)
                }
            }
            tr.insertCell()
            tr.insertCell()
        }
    }

    const update = model => {
        while(table_body.firstChild) table_body.removeChild(table_body.firstChild)
        model.personData().forEach(addPerson)
    }

    viewmodel.addListener(() => update(viewmodel))
    update(viewmodel)
}
