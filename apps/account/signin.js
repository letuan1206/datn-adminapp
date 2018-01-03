(function () {
    'use strict';
    angular
        .module('app')
        .controller('SigninCtrl', SigninCtrl);

    SigninCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state'];
    function SigninCtrl($scope, $rootScope, $http, $filter, $window, $state) {
        var vm = $scope;

        $scope.loging = true;

        $scope.submit = function () {
            $scope.loging = true;
            $.getJSON('//freegeoip.net/json/?callback=?', function (result) {
                var url = SERVER_API + "admin/login";
                var data = {
                    email: vm.email,
                    pass: vm.pass,
                    ip: result.ip
                };

                $http.post(url, data, {
                    withCredentials: true
                }).then(function (response) {
                    if (response.data.status === RESPONSE_STATUS_SUCCESS) {

                        $window.sessionStorage.setItem(LOCALSTORAGE_ADMIN, JSON.stringify(response.data.data));
                        $rootScope.user = JSON.parse(JSON.stringify(response.data.data));
                        $state.go('app.dashboard');

                        $scope.loging = false;

                    } else if (response.data.status === RESPONSE_STATUS_ERROR) {
                        $scope.loging = false;
                        $scope.message = response.data.message;
                    }
                }, function (err) {
                    $scope.isServerError = false;
                });
            });

        };
    }
})();