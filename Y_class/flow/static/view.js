export default (window, dispatcher) => {
    const document = window.document
    const table_body = document.getElementById('employee_data')
    const listeners = []

    const listen = l => listeners.push(l)

    const addPerson = p => {
        const tr = document.createElement('tr')
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
                const theDispatcher = dispatcher()
                theDispatcher(event)
            }

            tr.insertCell()
            tr.insertCell()
        }
        return tr
    }

    const view = model => model.personData().map(addPerson)

    const renderer = rows => {
        while(table_body.firstChild) table_body.removeChild(table_body.firstChild)
        rows.forEach(r => table_body.appendChild(r))
    }
    const prompt = window.prompt.bind(window)

    return { view, renderer }
}
