'use strict';

/**
 * @ngdoc overview
 * @name formulaireApp
 * @description
 * # formulaireApp
 *
 * Main module of the application.
 */
var app = angular
  .module('formulaireApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ui.sortable',
    'mm.foundation'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/createForm', {
        templateUrl: 'CreateForm/createForm.html',
        controller: 'CreateFormCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
