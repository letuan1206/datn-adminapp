(function () {
    'use strict';
    angular
        .module('app')
        .controller('LogsCtrl', LogsCtrl);

    LogsCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state', 'DTOptionsBuilder', 'DTColumnBuilder'];
    function LogsCtrl($scope, $rootScope, $http, $filter, $window, $state, DTOptionsBuilder, DTColumnBuilder) {

        $scope.logType = [
            { type: 1, description: "Log Chung" },
            { type: 2, description: "Log SMS" },
            { type: 3, description: "Log Resets" },
            { type: 4, description: "Log Nạp Thẻ" },
            { type: 5, description: "Log Chuyển Khoản" },
            { type: 6, description: "Log Đổi Item Sliver & Jewel" },
            { type: 7, description: "Log Đăng nhập" }
        ]

        $scope.log = {
            selected: true
        };

        var url = SERVER_API + 'admin/accountList';
        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.person = {};
            $scope.people = response.data.data;
        }, function (err) {
            $scope.isServerError = false;
        });

        $scope.removeAccount = function () {
            $scope.log.selected = undefined;
            $scope.account = '';
        }

        $scope.onSelectAccount = function (item, model) {
            $scope.account = item.memb___id;
        }

        $scope.onSelectLogs = function (item, model) {
            $scope.logChoose = item.type;
        }

        $scope.submit = function () {
            var url = SERVER_API + 'admin/viewLogs';
            var data = {
                type: $scope.logChoose,
                account: $scope.account
            }

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                switch ($scope.logChoose) {
                    case 2:
                        $scope.logSMS = response.data.data
                        break;
                    case 3:
                        $scope.logReset = response.data.data
                        break;
                    case 4:
                        $scope.logCard = response.data.data;
                        break;
                    case 5:
                        $scope.logBankTranfer = response.data.data;
                        break;
                    case 6:
                        $scope.logItemChange = response.data.data;
                        break;
                    case 7:
                        $scope.logLogin = response.data.data;
                        break;
                }

            }, function (err) {
                $scope.isServerError = false;
            });
        }

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', true)
            .withOption('searching', true)
            .withDisplayLength(50);
    }
})();
