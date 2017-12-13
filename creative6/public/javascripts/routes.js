angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtrl'
        })
        .when('/messages', {
            templateUrl: 'views/messages.html',
            controller: 'messageCtrl',
            controllerAs: 'messageCtrl'
        })
        .otherwise({redirectTo: '/login'});
});


