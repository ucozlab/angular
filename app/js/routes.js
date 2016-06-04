angular.module('uShop')
.config(function($routeProvider){
    $routeProvider
    .when('/home', {
        templateUrl: '/app/tpl/photo.html'
    })
    .when('/new', {
        templateUrl: '/app/tpl/new.html'
    })
    .when('/', {
        templateUrl: '/app/tpl/pages/home.html'
    })
    .when('/contact', {
        templateUrl: '/app/tpl/pages/contacts.html'
    })
    .when('/about', {
        templateUrl: '/app/tpl/pages/new.html'
    })
    .otherwise({
        redirectTo : '/'
    });
});
