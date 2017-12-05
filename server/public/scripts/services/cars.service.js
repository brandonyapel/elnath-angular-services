app.service('CarService', ['$http', function ($http) {
    var self = this;
    
    
    self.newCar = {}
    self.cars = {list: []};


    self.getCars = function () {
        $http({
            method: 'GET',
            url: '/car'
        }).then(function (response) {
            self.cars.list = response.data
            console.log(self.cars)
        })
    };
    self.getCars();

    self.addCar = function (newCar) {
        console.log('addCars()',newCar)
        $http({
            method: 'POST',
            url: '/car',
            data:  newCar
        }).then(function (response) {
            self.newCar.year = '';
            self.newCar.model = '';
            self.newCar.nickname = '';
            self.newCar.make = '';
            self.getCars();

        })
    };

    self.deleteCar = function(carID){
        console.log
        $http({
            method: 'DELETE',
            url: '/car/'+carID,
        }).then(function (response) {
            self.getCars();

        })

    }

    self.editCar = function(carID){
        console.log(self.cars.list[carID-1]);
        $http({
            method: 'PUT',
            url: '/car/'+carID,
            data: self.cars.list[carID-1]
        }).then(function (response) {
            self.getCars();

        })

    }

    self.toggleEditField = function(carID){
        self.cars.list[carID-1].displayedit = !self.cars.list[carID-1].displayedit
    }

}]);
