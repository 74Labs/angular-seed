'use strict';

/**
 * @ngdoc overview
 * @name angularSandboxApp
 * @description
 * # angularSandboxApp
 *
 * Main module of the application.
 */
angular

  .module('app', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])

.controller('SiteCtrl', function($rootScope) {

  $rootScope.app.mode = 'layout-top-nav';
  $rootScope.app.skin = 'skin-black-light';

})

.controller('AppCtrl', function($rootScope, $scope, $http, $interval) {

  var self = this;

  $rootScope.app.mode = 'sidebar-mini sidebar-collapse';
  $rootScope.app.skin = 'skin-yellow';

  self.checkOnlineStatus = function() {
    $http.get('http://localhost:3000/status')
      .success(function() {
        $rootScope.app.online = true;
      })
      .error(function() {
        $rootScope.app.online = false;
      });
  };

  self.checkOnlineStatus();

  $interval(function() {
    self.checkOnlineStatus();
  }, 10000);

})

.run(function($log, $rootScope, $state, $window) {
  $rootScope.$state = $state;
  $rootScope.app = {
    online: true,
    error: null,
    user: null
  };
  $rootScope.$on('$includeContentLoaded', function() {
    $window.$.AdminLTE.layout.activate();
    $window.$.AdminLTE.layout.fix();
    $window.$.AdminLTE.layout.fixSidebar();
    $log.debug('AdminLTE', 'Activate');
  });
  $rootScope.$on('$stateChangeSuccess', function() {
    $window.$.AdminLTE.layout.fix();
    $window.$.AdminLTE.layout.fixSidebar();
    $log.debug('AdminLTE', 'Fix');
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('site', {
    url: '/',
    abstract: true,
    templateUrl: 'views/site/layout/main.html',
    controller: 'SiteCtrl'
  })

  .state('site.home', {
    url: '',
    templateUrl: 'views/site/home.html',
    controller: 'HomeCtrl'
  })

  .state('site.about', {
    url: 'about',
    templateUrl: 'views/site/about.html',
    controller: 'AboutCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/app/layout/main.html',
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    templateUrl: 'views/app/dashboard.html',
    data: {
      title: 'DASHBOARD'
    }
  });

  $urlRouterProvider.otherwise('/');

});
