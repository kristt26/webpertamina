angular.module("app.router", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/account/login');
        $stateProvider
            .state("account", {
                url: '/account',
                templateUrl: 'apps/views/accounts/account.html'
            })

            .state("login", {
                url: '/login',
                parent: 'account',
                controller: "LoginController",
                templateUrl: 'apps/views/accounts/login.html'
            })

            .state("register", {
                url: '/register',
                parent: 'account',
                templateUrl: '../apps/views/accounts/register.html'
            })

            .state('index', {
                url: '/index',
                controller: 'homeController',
                templateUrl: 'apps/views/admin/index.html'
            })

            .state("home", {
                url: '/home',
                parent: 'index',
                controller: "homeController",
                templateUrl: 'apps/views/admin/home.html'
            })

            .state('about', {
                // we'll get to this in a bit       
            })
            ;

    });