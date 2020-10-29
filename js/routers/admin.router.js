angular.module('admin.router', ['ui.router'])
    .config(function ($stateProvider) {
        var helloState = {
            name: 'hello',
            url: '/hello',
            controller: 'adminController',
            templateUrl: './views/home.html'
        }
        var daftaruserstate = {
            name: 'daftaruser',
            url: '/daftaruser',
            controller: 'adminDaftarUserController',
            templateUrl: './views/admin/daftaruser.html'
        }
        var manajemenuserstate = {
            name: 'manajemenuser',
            url: '/manajemenuser',
            controller: 'adminManajemenUserController',
            templateUrl: './views/admin/manajemenuser.html'
        }
        var listpemeriksaanstate = {
            name: 'listpemeriksaan',
            url: '/listpemeriksaan',
            controller: 'adminListPemeriksaanController',
            templateUrl: './views/admin/listpemeriksaan.html'
        }
        $stateProvider.state(helloState);
        $stateProvider.state(daftaruserstate);
        $stateProvider.state(manajemenuserstate);
        $stateProvider.state(listpemeriksaanstate);
    })