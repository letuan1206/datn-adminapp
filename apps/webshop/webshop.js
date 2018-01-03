(function () {
    'use strict';
    angular
        .module('app')
        .controller('WebShopCtrl', WebShopCtrl);

    WebShopCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state', 'DTOptionsBuilder', 'DTColumnBuilder', 'toastr'];
    function WebShopCtrl($scope, $rootScope, $http, $filter, $window, $state, DTOptionsBuilder, DTColumnBuilder, toastr) {
        $scope.selectClass = '0';
        $scope.page = 0;
        $scope.selectGroup = '';

        $scope.itemAddList = [{
            itemCode: '',
            itemPrice: ''
        }];

        $scope.addRow = function () {
            var item = {
                itemCode: '',
                itemPrice: ''
            }
            $scope.itemAddList.push(item);
        }

        $scope.clearRow = function () {
            $scope.itemAddList = [{
                itemCode: '',
                itemPrice: ''
            }];
        }

        $scope.delRow = function (index) {
            $scope.itemAddList.splice(index, 1);
        }

        $scope.saveItem = function () {
            var url = SERVER_API + "admin/addItemWebShop";
            var data = {
                itemAddList: $scope.itemAddList
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                toastr.success(response.data.message, {
                    closeButton: true
                });
                $('#addItem').modal('hide');
                
                $scope.clearRow();
                $scope.submit($scope.page);
            }, function (err) {
                $scope.isServerError = false;
            });
        }

        $scope.submit = function (page, selectClass, selectGroup) {
            var url = SERVER_API + "admin/getItemWebShop";
            var data = {
                page: page,
                selectClass: selectClass,
                selectGroup: selectGroup
            };
            $scope.selectClass = selectClass;
            $scope.page = page;
            $scope.selectGroup = selectGroup;

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    $scope.listItem = response.data.data;

                } else if (response.data.status === RESPONSE_STATUS_ERROR) {

                }
            }, function (err) {
                $scope.isServerError = false;
            });
            $window.scrollTo(0, 0);
        };

        $scope.submit($scope.page);

        $scope.selectItem = function (item) {
            $scope.itemChoose = item;
            $scope.itemPrice = item.price;
            console.log($scope.itemChoose);
        };

        $scope.saveDeleteItem = function() {
            var url = SERVER_API + "admin/deleteItemWebShop";
            var data = {
                itemCode: $scope.itemChoose.item_code
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                toastr.success(response.data.message, {
                    closeButton: true
                });
                $('#deleteItem').modal('hide');

                $scope.submit($scope.page);
            }, function (err) {
                $scope.isServerError = false;
            });
        };

        $scope.updateItem = function () {
            var url = SERVER_API + "admin/updateItemWebShop";
            var data = {
                itemCode: $scope.itemChoose.item_code,
                itemPrice: $scope.itemPrice
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                toastr.success(response.data.message, {
                    closeButton: true
                });
                $('#editItem').modal('hide');

                $scope.submit($scope.page);
            }, function (err) {
                $scope.isServerError = false;
            });
        };
    }
})();
