import React from 'react'

const EmployeeData = ({person: {id, name, employeeId, salary, manager}, dispatcher}) => {
    if (employeeId) 
        return [<td key='empId'>{employeeId}</td>, <td key='salary'>{salary}</td>, <td key='manager'>{manager.toString()}</td>]
    else
        return [<td colspan="3" key='hire'>
            <button onClick = {() => dispatcher()({type:'hire', id})}>Hire</button>
        </td>]
}

const PersonData = ({person, dispatcher}) => [
    <td key='id'>{person.id}</td>,
    <td key='name'>{person.name}</td>,
    ...EmployeeData({person, dispatcher})
] 

const PersonRow = (props) => (
    <tr>
        <PersonData {...props}/>
    </tr>
)

const PersonDataBody = ({model, dispatcher}) => (
    <tbody>
        {
            model.personData().map(person => <PersonRow key={person.id.toString()} {...{person, dispatcher}}/>)
        }
    </tbody>
)

export default dispatcher => model => (
    <div id='base'>
        <h1>People</h1>
        <table id='employees'>
            <thead><tr><td>Id</td><td>Name</td><td>Employee id</td><td>Salary</td><td>Manager</td></tr></thead>
            <PersonDataBody {...{model, dispatcher}}/>
        </table>
    </div>
)
