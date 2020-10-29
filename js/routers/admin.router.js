angular.module('admin.router', ['ui.router'])
    .config(function ($stateProvider) {
        var helloState = {
            name: 'hello',
            url: '/hello',
            controller: 'adminController',
            templateUrl: './views/home.html'
        }
        var datauser = {
            name: 'daftaruser',
            url: '/daftaruser',
            controller: 'adminDaftarUserControllerController',
            templateUrl: './views/admin/daftaruser.html'
        }
        var manajemenuserstate = {
            name: 'manajemenuser',
            url: '/manajemenuser',
            controller: 'adminManajemenUserControllerController',
            templateUrl: './views/admin/manajemenuser.html'
        }
        $stateProvider.state(helloState);
        $stateProvider.state(datauser);
        $stateProvider.state(manajemenuserstate);
    })