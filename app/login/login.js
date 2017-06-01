app.controller('loginController', ($scope, $http, $rootScope ,$state, $mdToast,apiRepository) => {

    $scope.nav = "app/customnav.html";

    $rootScope.logout = function () {
        $state.go('login');
        $rootScope.isLoggedIn = false;
        $rootScope.user = "";
    };

    $scope.login = function () {
        $http.get("http://localhost:8080/users/search/login?username="+$scope.username+"&password="+$scope.password)
            .then(function successCallback(response) {
                let user = response.data;
                let type = user.type;
                goTo(apiRepository, type)
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Invalid Credentials')
                        .hideDelay(1000)
                );
            });
    };

    function goTo(apiRepository, type) {
        $http.get("http://localhost:8080/endpoints")
            .then(function successCallback(response) {
                let endpointsList = response.data._embedded.endpoints;
                let endpoints = {};
                endpointsList.forEach(e => {
                    if(e.name === 'storage')
                        endpoints.storage = e;
                    if(e.name === 'compute')
                        endpoints.compute = e;
                    if(e.name === 'networks')
                        endpoints.network = e;
                });
                apiRepository.setAPIs(endpoints.compute, endpoints.storage, endpoints.network);
                $state.go(type.toLowerCase());
            })
    }
});