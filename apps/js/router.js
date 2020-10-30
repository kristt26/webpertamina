angular.module("app.router", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
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

        .state("daftaruser", {
            url: '/daftaruser',
            parent: 'index',
            controller: "adminDaftarUserController",
            templateUrl: 'apps/views/admin/daftaruser.html'
        })

        .state("manajemenuser", {
            url: '/manajemenuser',
            parent: 'index',
            controller: "adminManajemenUserController",
            templateUrl: 'apps/views/admin/manajemenuser.html'
        })

        .state("listpemeriksaan", {
            url: '/listpemeriksaan',
            parent: 'index',
            controller: "adminlistpemeriksaanController",
            templateUrl: 'apps/views/admin/listpemeriksaan.html'
        })

        .state("tambahlistpemeriksaan", {
            url: '/tambahlistpemeriksaan',
            parent: 'index',
            controller: "admintambahlistpemeriksaanController",
            templateUrl: 'apps/views/admin/tambahlistpemeriksaan.html'
        })

        .state("persetujuankim", {
            url: '/persetujuankim',
            parent: 'index',
            controller: "adminpersetujuankimController",
            templateUrl: 'apps/views/admin/persetujuankim.html'
        })

        .state("kim", {
            url: '/kim',
            parent: 'index',
            controller: "adminkimController",
            templateUrl: 'apps/views/admin/kim.html'
        })

        .state("historitruk", {
            url: '/historitruk',
            parent: 'index',
            controller: "adminhistoritrukController",
            templateUrl: 'apps/views/admin/historitruk.html'
        })

        .state('about', {
            // we'll get to this in a bit       
        });

    });