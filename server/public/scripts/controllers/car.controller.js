app.controller('CarController',['CarService','CompanyService', function(CarService,CompanyService){
    var self = this;
    self.message = 'What about them tacos??';
    self.cars = CarService.cars;
    self.addCar = CarService.addCar;
    self.newCar = CarService.newCar;
    self.deleteCar = CarService.deleteCar;
    self.toggleEditField = CarService.toggleEditField;
    self.editCar = CarService.editCar;

    //CompanyService
    self.companies = CompanyService.companies;
}]);