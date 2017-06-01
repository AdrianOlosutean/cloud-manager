app.controller('devopsController', function ($scope, $http, $timeout, apiRepository, $mdDialog) {
    $scope.networksDialog = (ev, vm) => {
        $mdDialog.show({
            controller: ComputeNetworksController,
            templateUrl: 'app/devops/networksDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                networks: vm.networks
            },
            clickOutsideToClose: true
        })
    };

    $scope.storageDialog = (ev, vm) => {
        $mdDialog.show({
            controller: ComputeStorageController,
            templateUrl: 'app/devops/storageDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                blocks: vm.blocks
            },
            clickOutsideToClose: true
        })
    };

    $scope.terminate = vm => {
        let index = $scope.vms.indexOf(vm);
        $scope.vms.splice(index,1);
        $http.delete(vm._links.self.href);
    };

    $scope.insert = () => {
        $http.post(apiRepository.getComputeAPI()+'/virtualMachines', {name:$scope.name}).success(function (data) {
            $scope.vms.push(data);
        });

    };

    $scope.pause = vm => {
        vm.status = 'PAUSED';
        $http.put(vm._links.self.href, vm);
    };
    $scope.resume = vm => {
        vm.status = 'RUNNING';
        $http.put(vm._links.self.href, vm);
    };

    $http.get(apiRepository.getComputeAPI() + '/virtualMachines').success(function (data) {
        $scope.vms = data._embedded.virtualMachines;
    });
});

function ComputeNetworksController($scope,networks, $http, apiRepository , $mdToast, $mdDialog) {
    $scope.networks = [];

    (function fetch() {
        let split = networks.split(',');
        for (let id of split) {
            $http.get(apiRepository.getNetworkAPI() + '/networks/' + id).then(function (response) {
                $scope.networks.push(response);
            });
        }
    })();
}

function ComputeStorageController($scope,blocks, $http, apiRepository) {
    $scope.blocks = [];

    (function fetch() {
        if(blocks !== null && blocks !== "") {
            let split = blocks.split(',');
            for (let id of split) {
                $http.get(apiRepository.getStorageAPI() + '/blocks/' + id).success(function (response) {
                    $scope.blocks.push(response);
                });
            }
        }
    })();
}