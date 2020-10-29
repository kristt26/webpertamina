angular.module('admin.router', ['ui.router'])
    .config(function ($stateProvider) {
        var helloState = {
            name: 'hello',
            url: '/hello',
            controller: 'adminController',
            templateUrl: './views/home.html'
        }
        $stateProvider.state(helloState);
    })