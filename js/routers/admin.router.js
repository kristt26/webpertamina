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
        var tambahlistpemeriksaan = {
            name: 'tambahlistpemeriksaan',
            url: '/tambahlistpemeriksaan',
            controller: 'admintambahlistpemeriksaanController',
            templateUrl: './views/admin/tambahlistpemeriksaan.html'
        }
        var persetujuankim = {
            name: 'persetujuankim',
            url: '/persetujuankim',
            controller: 'adminpersetujuankimController',
            templateUrl: './views/admin/persetujuankim.html'
        }
        var kim = {
            name: 'kim',
            url: '/kim',
            controller: 'kimController',
            templateUrl: './views/admin/kim.html'
        }
        var historitruk = {
            name: 'historitruk',
            url: '/historitruk',
            controller: 'historitrukController',
            templateUrl: './views/admin/historitruk.html'
        }
        $stateProvider.state(helloState);
        $stateProvider.state(daftaruserstate);
        $stateProvider.state(manajemenuserstate);
        $stateProvider.state(listpemeriksaanstate);
        $stateProvider.state(tambahlistpemeriksaan);
        $stateProvider.state(persetujuankim);
        $stateProvider.state(kim);
        $stateProvider.state(historitruk);
    })