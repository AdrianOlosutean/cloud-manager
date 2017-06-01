app.controller('adminController', function ($scope, $mdDialog, $mdToast, $window, $http, apiRepository) {

    $scope.insert = () => {
        $http.post(apiRepository.getNetworkAPI() + '/networks', {name:$scope.name})
            .then(function successCallback(response) {
                $scope.networks.push(response.data);
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Already found')
                        .hideDelay(2000)
                );
            });
    };

    $scope.delete = network => {
        $http.delete(network._links.self.href);
        let index = $scope.networks.indexOf(consultation);
        $scope.networks.splice(index, 1);
    };


    $http.get(apiRepository.getNetworkAPI() + '/networks').success(function (data) {
        $scope.networks = data._embedded.networks;
    });
});