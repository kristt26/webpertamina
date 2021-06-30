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
                controller: 'adminController',
                templateUrl: 'apps/views/admin/index.html'
            })

            .state("home", {
                url: '/home',
                parent: 'index',
                controller: "adminController",
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
                controller: "adminDaftarUserController",
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
                controller: "adminlistpemeriksaanController",
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

            .state('perusahaan', {
                url: '/perusahaan',
                controller: 'companyController',
                templateUrl: 'apps/views/perusahaan/index.html'
            })

            .state("dashboard", {
                url: '/dashboard',
                parent: 'perusahaan',
                controller: "dashboardController",
                templateUrl: 'apps/views/perusahaan/home.html'
            })

            .state("profileperusahaan", {
                url: '/profileperusahaan',
                parent: 'perusahaan',
                controller: "profilePerusahaanController",
                templateUrl: 'apps/views/perusahaan/profile.html'
            })

            .state("kendaraan", {
                url: '/kendaraan',
                parent: 'perusahaan',
                controller: "kendaraanController",
                templateUrl: 'apps/views/perusahaan/kendaraan.html'
            })

            .state("pengajuan", {
                url: '/pengajuan',
                parent: 'perusahaan',
                controller: "pengajuanController",
                templateUrl: 'apps/views/perusahaan/pengajuan.html'
            })

            .state("tambahpengajuan", {
                url: '/tambahpengajuan/:id',
                params: {
                    id: {
                        value: null,
                        squash: false,
                    }
                },
                parent: 'perusahaan',
                controller: "tambahPengajuanController",
                templateUrl: 'apps/views/perusahaan/tambahpengajuan.html'
            })

            // .state("pejabat", {
            //     url: '/pejabat',
            //     parent: 'perusahaan',
            //     controller: "pejabatController",
            //     templateUrl: 'apps/views/perusahaan/pejabat.html'
            // })

            .state("kims", {
                url: '/kims',
                parent: 'perusahaan',
                controller: "kimsController",
                templateUrl: 'apps/views/perusahaan/kims.html'
            })

            .state("histori", {
                url: '/histori',
                parent: 'perusahaan',
                controller: "adminhistoritrukController",
                templateUrl: 'apps/views/admin/historitruk.html'
            })
            .state("detailhistori", {
                url: '/detailhistori',
                parent: 'perusahaan',
                controller: "adminhistoritrukController",
                templateUrl: 'apps/views/admin/detailhistoritruk.html'
            })

            .state('approval', {
                url: '/approval',
                controller: 'approvalController',
                templateUrl: 'apps/views/approval/index.html'
            })

            .state("pengajuanberkas", {
                url: '/pengajuanberkas',
                parent: 'approval',
                controller: "pengajuanBerkasController",
                templateUrl: 'apps/views/approval/pengajuan.html'
            })

            .state('about', {
                // we'll get to this in a bit       
            });

    });