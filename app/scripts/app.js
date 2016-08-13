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

.controller('AppCtrl', function($scope, $http, $interval, $rootScope) {

  var self = this;

  self.checkOnlineStatus = function() {
    $http.get('http://localhost:3000/status')
      .success(function() {
        $rootScope.app.skin = 'skin-yellow';
        $rootScope.app.error = null;
      })
      .error(function() {
        $rootScope.app.skin = 'skin-red';
        $rootScope.app.error = 'Server is offline. Retrying connection...';
      });
  };

  self.checkOnlineStatus();

  $interval(function() {
    self.checkOnlineStatus();
  }, 10000);

})

.run(function($rootScope, $window) {
  $rootScope.app = {
    skin: 'skin-blue',
    online: true,
    error: null
  };
  $rootScope.$on('$includeContentLoaded', function() {
    $window.$.AdminLTE.layout.activate();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('site', {
    url: '/',
    abstract: true,
    templateUrl: 'views/site/layout/main.html'
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
