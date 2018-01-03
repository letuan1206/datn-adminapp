(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashBoardCtrl', DashBoardCtrl);

    DashBoardCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state', 'DTOptionsBuilder', 'DTColumnBuilder'];
    function DashBoardCtrl($scope, $rootScope, $http, $filter, $window, $state, DTOptionsBuilder, DTColumnBuilder) {

        var url = SERVER_API + 'admin/dashBoard';
        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.dashboard = response.data.data;
        }, function (err) {
            $scope.isServerError = false;
        });


        var url = SERVER_API + 'admin/getAccountCharacterOnline';
        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.accountList = response.data.data;
            $scope.accountList.forEach(element => {
                element['MapName'] = get_map_name(parseInt(element.MapNumber));
            });
        }, function (err) {
            $scope.isServerError = false;
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', true)
            .withOption('searching', true)
            .withDisplayLength(50);

    }
})();
