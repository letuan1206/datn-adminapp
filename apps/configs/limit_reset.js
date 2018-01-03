(function () {
    'use strict'
    angular
        .module('app')
        .controller('ConfigResetLimitCtrl', ConfigResetLimitCtrl);

    ConfigResetLimitCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state'];
    function ConfigResetLimitCtrl($scope, $rootScope, $http, $filter, $window, $state) {

        var url = SERVER_API + 'admin/configLimitReset';
        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.resets = response.data.data;
            console.log($scope.resets);
        }, function (err) {
            $scope.isServerError = false;
        });

        $scope.submit = function () {
            var url = SERVER_API + 'admin/configLimitReset';

            var data = {
                params: $scope.resets
            }
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
                distance_top_day_reset: 0,
                max_reset_in_day: 0,
                percent_saturday: "10",
                percent_sunday: "20",
                reset_top: 0
            }
            $scope.resets.push(newRow);
        }
    }

})();