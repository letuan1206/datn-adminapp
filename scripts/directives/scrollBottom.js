(function () {
    'use strict';
    angular
        .module('app')
        .directive('schrollBottom', function ($filter, $browser) {
            return {
                scope: {
                    schrollBottom: "="
                },
                link: function (scope, element) {
                    scope.$watchCollection('schrollBottom', function (newValue) {
                        if (newValue) {
                            $(element).scrollTop($(element)[0].scrollHeight);
                        }
                    });
                }
            }
        })
})();
