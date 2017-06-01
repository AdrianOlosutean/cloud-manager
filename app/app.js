let app = angular.module('cloud_manager',['ngMaterial','ngMessages','ui.router', 'ngSanitize','mdDataTable','ngMdIcons']);

app.service('apiRepository', function () {

    var computeAPI;
    var storageAPI;
    var networkAPI;

    function getComputeAPI() {
        return 'http://'+computeAPI.ip+':'+computeAPI.port;
    }

    function getStorageAPI() {
        return 'http://'+storageAPI.ip+':'+storageAPI.port;
    }

    function getNetworkAPI() {
        return 'http://'+networkAPI.ip+':'+networkAPI.port;
    }

    function setAPIs(compute, storage, network) {
        computeAPI = compute;
        storageAPI = storage;
        networkAPI = network;
    }

    return {
        setAPIs: setAPIs,
        getComputeAPI: getComputeAPI,
        getStorageAPI: getStorageAPI,
        getNetworkAPI: getNetworkAPI
    };
});

app.config(( $stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: "app/login/login.html"
        })
        .state('admin', {
            url: '/admin',
            templateUrl: "app/admin/admin.html"
        })
        .state('devops', {
            url: '/devops',
            templateUrl: "app/devops/devops.html"
        })
});