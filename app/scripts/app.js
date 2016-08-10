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
    templateUrl: 'views/app/layout/main.html'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    templateUrl: 'views/app/dashboard.html'
  });

  $urlRouterProvider.otherwise('/');

});
