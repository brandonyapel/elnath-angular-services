app.service('CompanyService', ['$http', function ($http) {
    var self = this;
    
    
    self.newCompany = {}
    self.companies = {list: []};


    self.getCompanies = function () {
        $http({
            method: 'GET',
            url: '/companies'
        }).then(function (response) {
            self.companies.list = response.data
            console.log(self.companies)
        })
    };
    self.getCompanies();

    self.addCompany = function (newCompany) {
        console.log('addCompany()',newCompany)
        $http({
            method: 'POST',
            url: '/companies',
            data:  newCompany
        }).then(function (response) {
            self.getCompanies();
            self.newCompany.name = '';
            self.newCompany.country = '';

        })
    };
    
}]);

