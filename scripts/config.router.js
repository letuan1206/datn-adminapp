/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
(function () {
  'use strict';
  angular
    .module('app')
    .run(runBlock)
    .config(config);

  runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
  function runBlock($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
      if (toState.name !== 'access.signin') {
        var isLogin = sessionStorage.getItem(LOCALSTORAGE_ADMIN) || false;
        if (!isLogin) {
          setTimeout(() => { $state.go('access.signin') }, 0);
        }
      }
    });
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG', '$locationProvider', 'toastrConfig'];
  function config($stateProvider, $urlRouterProvider, MODULE_CONFIG, $locationProvider, toastrConfig) {

    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });

    var p = getParams('layout'),
      l = p ? p + '.' : '',
      layout = 'views/layout/layout.' + l + 'html';
    // dashboard = 'views/dashboard/dashboard.'+l+'html';

    // $locationProvider.html5Mode(true);
    $urlRouterProvider
      .otherwise('/app/dashboard');

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        views: {
          '': {
            templateUrl: 'views/layout/layout.1.html'
          }
        },
        resolve: load(['ui.bootstrap', 'scripts/controllers/bootstrap.js'])
      })

      .state('access', {
        url: '/access',
        template: '<div class="dark bg-auto w-full"><div ui-view class="fade-in-right-big smooth pos-rlt"></div></div>'
      })

      .state('access.signin', {
        url: '/signin',
        templateUrl: 'apps/account/signin.html',
        controller: "SigninCtrl",
        resolve: load('apps/account/signin.js')
      })

      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'apps/dashboard/dashboard.html',
        data: { title: 'Dash Board' },
        controller: "DashBoardCtrl",
        resolve: load('apps/dashboard/dashboard.js')
      })

      .state('app.webshop', {
        url: '/webshop',
        templateUrl: 'apps/webshop/webshop.html',
        data: { title: 'Dash Board' },
        controller: "WebShopCtrl",
        resolve: load('apps/webshop/webshop.js')
      })

      .state('app.account', {
        url: '/account',
        templateUrl: 'apps/account/account.html',
        data: { title: 'Dash Board' },
        controller: "AccountCtrl",
        resolve: load(['ui.select', 'xeditable', 'apps/account/account.js'])
      })

      .state('app.char', {
        url: '/char',
        templateUrl: 'apps/char/char.html',
        data: { title: 'Dash Board' },
        controller: "CharacterCtrl",
        resolve: load(['ui.select', 'xeditable', 'apps/char/char.js'])
      })

      .state('app.logs', {
        url: '/logs',
        templateUrl: 'apps/logs/logs.html',
        data: { title: 'Dash Board' },
        controller: "LogsCtrl",
        resolve: load(['ui.select', 'xeditable', 'apps/logs/logs.js'])
      })

      .state('app.config-reset', {
        url: '/config-reset',
        templateUrl: 'apps/configs/resets.html',
        data: { title: 'Dash Board' },
        controller: "ConfigResetCtrl",
        resolve: load('apps/configs/resets.js')
      })

      .state('app.config-limit-reset', {
        url: '/config-limit-reset',
        templateUrl: 'apps/configs/limit_reset.html',
        data: { title: 'Dash Board' },
        controller: "ConfigResetLimitCtrl",
        resolve: load('apps/configs/limit_reset.js')
      })
      ;

    function load(srcs, callback) {
      return {
        deps: ['$ocLazyLoad', '$q',
          function ($ocLazyLoad, $q) {
            var deferred = $q.defer();
            var promise = false;
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            if (!promise) {
              promise = deferred.promise;
            }
            angular.forEach(srcs, function (src) {
              promise = promise.then(function () {
                angular.forEach(MODULE_CONFIG, function (module) {
                  if (module.name == src) {
                    src = module.module ? module.name : module.files;
                  }
                });
                return $ocLazyLoad.load(src);
              });
            });
            deferred.resolve();
            return callback ? promise.then(function () { return callback(); }) : promise;
          }]
      }
    }

    function getParams(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }
})();
