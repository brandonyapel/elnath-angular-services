var app = angular.module('MyApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/views/company.html',
        controller: 'CompanyController as vm'
    }).when('/about', {
        templateUrl: '/views/cars.html',
        controller: 'CarController as vm'
    }).when('/home', {
        redirectTo: '/'
    }).otherwise({
        template: '<h1>404</h1>'
    });
});

// myApp.controller('MyController', function(){
//     var self = this;
//     self.myMessage = 'This is my message to me!';
// });


