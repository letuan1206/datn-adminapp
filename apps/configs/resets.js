(function () {
    'use strict'
    angular
        .module('app')
        .controller('ConfigResetCtrl', ConfigResetCtrl);

    ConfigResetCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state'];
    function ConfigResetCtrl($scope, $rootScope, $http, $filter, $window, $state) {

        var url = SERVER_API + 'admin/configReset';
        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.resets = response.data.data;
            console.log($scope.resets);
        }, function (err) {
            $scope.isServerError = false;
        });

        $scope.submit = function () {
            var url = SERVER_API + 'admin/configReset';

            $scope.resets.forEach(element => {
                delete element.id;
            });

            var data = {
                params: $scope.resets
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.resets = response.data.data;
                console.log(response);
            }, function (err) {
                $scope.isServerError = false;
            });
        }

        $scope.removeRow = function (index) {
            $scope.resets.splice(index, 1);
        }

        $scope.addRow = function () {
            var newRow = {
                blue_reset: 0,
                chaos_reset: 0,
                cre_reset: 0,
                leadership: 0,
                level_reset: 0,
                level_reset_vip: 0,
                point: 0,
                point_online: 40,
                reset: 0,
                sliver: 0,
                zen_reset: 0
            }

            $scope.resets.push(newRow);
        }
    }

})();