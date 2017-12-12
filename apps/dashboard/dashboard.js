(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashBoardCtrl', DashBoardCtrl);

    DashBoardCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state'];
    function DashBoardCtrl($scope, $rootScope, $http, $filter, $window, $state) {
    
    }
})();