export default window => {
    const document = window.document
    const table_body = document.getElementById('employee_data')
    const listeners = []

    const listen = l => listeners.push(l)

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
                const event = { type: 'hire', id: p.id }
                listeners.forEach(l => l(event))
            }

            tr.insertCell()
            tr.insertCell()
        }
    }

    const update = model => {
        while(table_body.firstChild) table_body.removeChild(table_body.firstChild)
        model.personData().forEach(addPerson)
    }
    const prompt = window.prompt.bind(window)

    return { addPerson, update, listen, prompt }
}
