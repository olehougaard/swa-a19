import model from './model.js'

const module = angular.module('employeeApp', [])

module.value('$model', { salary: 0, persons: [] })

module.component('modelInput', {
  bindings: { propertyName: '@' },
  template: '<input ng-model="$ctrl.model[$ctrl.propertyName]">',
  controller: ['$model', function ($model) {
      this.model = $model
  }]            
})

module.controller('EmployeeController', function($scope, $model, $http) {
  console.log($model)
  $scope.model = $model
  let aModel
  $http.get('http://localhost:9090/persons')
  .then(({data: persons}) => {
    $http.get('http://localhost:9090/employees')
    .then(({data: employees}) => {
      aModel = model(persons, employees)
      $scope.model.persons = aModel.personData()
    })
  })
  .catch(console.err)

  $scope.hire = id => {
    if ($scope.model.salary > 0) {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
      $http.post('http://localhost:9090/employees', JSON.stringify({salary: $scope.model.salary, manager: false}), { headers })
      .then(({data: employee})=> {
        $http.patch('http://localhost:9090/persons/' + id, JSON.stringify({ employeeId: employee.employeeId }), {headers })
        .then(({data: person}) => {
          aModel.addEmployee(employee)
          aModel.updatePerson(person)
          $scope.model.persons = aModel.personData()
          $scope.model.salary = 0
        })
      })
    }
  }
})
