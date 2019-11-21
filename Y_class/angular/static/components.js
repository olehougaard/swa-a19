import model from './model.js'

const module = angular.module('employeeApp', [])
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

  $scope.salary = 0

  $scope.hire = id => {
    if ($scope.salary > 0) {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
      $http.post('http://localhost:9090/employees', JSON.stringify({salary: $scope.salary, manager: false}), { headers })
      .then(({data: employee})=> {
        $http.patch('http://localhost:9090/persons/' + id, JSON.stringify({ employeeId: employee.employeeId }), {headers })
        .then(({data: person}) => {
          aModel.addEmployee(employee)
          aModel.updatePerson(person)
          $scope.persons = aModel.personData()
          $scope.salary = 0
        })
      })
    }
  }
})
