(function () {
    'use strict';
    angular
        .module('app')
        .filter('propsFilter', propsFilter)
        .controller('AccountCtrl', AccountCtrl);

    function propsFilter() {
        return filter;
        function filter(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    }
    AccountCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state', 'editableOptions', 'editableThemes'];
    function AccountCtrl($scope, $rootScope, $http, $filter, $window, $state, editableOptions, editableThemes) {

        editableOptions.theme = 'bs3';
        editableOptions.icon_set = 'font-awesome';
        editableThemes.bs3.inputClass = 'form-control-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';

        var url = SERVER_API + 'admin/accountList';
        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.person = {};
            $scope.people = response.data.data;
        }, function (err) {
            $scope.isServerError = false;
        });

        $scope.onSelectCallback = function (item, model) {

            var url = SERVER_API + 'admin/accountDetail?account=' + item.memb___id;

            $http.get(url, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.member = response.data.data;
            }, function (err) {
                $scope.isServerError = false;
            });
        }
    }
})();