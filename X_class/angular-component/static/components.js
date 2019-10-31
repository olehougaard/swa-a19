import model from './model.js'

const module = angular.module('employeeApp', [])

module.component('personRow', {
  bindings: { data: '<' },
  template: "<tr> \
      <td key='$ctrl.data'>{{$ctrl.data.id}}</td> \
      <td>{{$ctrl.data.name}}</td> \
      <td ng-if='{{$ctrl.data.employeeId}}'>{{$ctrl.data.employeeId}}</td> \
      <td ng-if='$ctrl.data.employeeId'>{{$ctrl.data.salary}}</td> \
      <td ng-if='$ctrl.data.employeeId'>{{$ctrl.data.manager}}</td> \
      <td colspan='3' ng-if='{{!$ctrl.data.employeeId'}}><button ng-click='hire($ctrl.data.id)'>Hire</button></td> \
    </tr>",
    controller: function () {
      this.data = {id: 'Blah'}
    }
})

module.controller('EmployeeController', function($scope, $http) {
  let aModel
  $http.get('http://localhost:9090/persons')
  .then(({data: persons}) => {
    $http.get('http://localhost:9090/employees')
    .then(({data: employees}) => {
      aModel = model(persons, employees)
      $scope.persons = aModel.personData()
    })
  })
  .catch(console.err)

  $scope.hire = id => {
    const salary = window.prompt('Salary?')
    if (salary) {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
      $http.post('http://localhost:9090/employees', JSON.stringify({salary, manager: false}), { headers })
      .then(({data: employee})=> {
        $http.patch('http://localhost:9090/persons/' + id, JSON.stringify({ employeeId: employee.employeeId }), {headers })
        .then(({data: person}) => {
          aModel.addEmployee(employee)
          aModel.updatePerson(person)
          $scope.persons = aModel.personData()
        })
      })
    }
  }
})
