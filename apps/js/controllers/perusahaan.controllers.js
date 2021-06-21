angular
    .module('perusahaan.controller', [])
    .controller('companyController', companyController)
    .controller('dashboardController', dashboardController)
    .controller('profilePerusahaanController', profilePerusahaanController)
    .controller('kendaraanController', kendaraanController)
    .controller('pengajuanController', pengajuanController)
    .controller('tambahPengajuanController', tambahPengajuanController)
    .controller('pejabatController', pejabatController)
    ;

function companyController($scope, ProfilePerusahaanServices, message, $state, AuthService) {
    $scope.profile = {};
    if (!AuthService.userIsLogin()) {
        $state.go("login");
    } else {
        ProfilePerusahaanServices.get().then(x => {
            $scope.$emit("SendDown", "true");
            $scope.profile = x;
        }, err => {
            message.dialogmessage("Mohon isi Profile terlebih dahulu").then(x => {
                $state.go("profileperusahaan");
            });
        })
    };
    $scope.logout = () => {
        AuthService.logOff();
    }
}

function dashboardController($scope, DaftarUserServices) {
    $scope.datas = [];
    $scope.Title = 'Daftar User';
    DaftarUserServices.get().then(x => {
        $scope.datas = x;
    });
}

function profilePerusahaanController($scope, helperServices, message, $rootScope, ProfilePerusahaanServices) {
    $scope.url = helperServices.base;
    $scope.statusProfile = false;
    $scope.test;
    $scope.model = {};
    ProfilePerusahaanServices.get().then(x => {
        $scope.statusProfile = true;
        $scope.model = x;
    }, err => {
        $scope.statusProfile = false;
    })
    $scope.simpan = () => {
        var photo = {};
        var ext = $scope.model.logoData.filename.split(".");
        photo.fileExtention = ext[1];
        photo.fileType = "Photo";
        photo.fileName = $scope.model.logoData.filename;
        photo.data = $scope.model.logoData.base64;
        $scope.model.logoData = photo;
        if ($scope.model.id) {
            ProfilePerusahaanServices.put($scope.model).then(x => {

            })
        } else {
            ProfilePerusahaanServices.post($scope.model).then(x => {
                message.info("Berhasil Menyimpan");
            })
        }
        console.log($scope.model);
    }
    $scope.edit = () => {
        $scope.statusProfile = false;
    }
}


function kendaraanController($scope, KendaraanServices, helperServices, message) {
    $scope.url = helperServices.base;
    $scope.datas = [];
    $scope.model = {};
    $scope.model.driverLicense = {};
    $scope.model.assdriverLicense = {};
    $scope.model.vehicleRegistration = {};
    $scope.model.keurDLLAJR = {};
    $scope.model.assdriverIDCard = {};
    $scope.model.driverIDCard = {};
    KendaraanServices.get().then(x => {
        $scope.datas = x;
        console.log(x);
    })
    $scope.setFile = (item) => {
        console.log(item);
    }
    $scope.simpan = () => {
        if ($scope.model.id) {
            KendaraanServices.put($scope.model).then(x => {
                message.info("Data berhasil di tambahkan");
                $('#myTab li:first-child a').tab('show')
                $scope.model = {};
                $scope.model.driverLicense = {};
                $scope.model.assdriverLicense = {};
                $scope.model.vehicleRegistration = {};
                $scope.model.keurDLLAJR = {};
                $scope.model.assdriverIDCard = {};
                $scope.model.driverIDCard = {};
            })
        } else {
            KendaraanServices.post($scope.model).then(x => {
                message.info("Data berhasil di tambahkan");
                $('#myTab li:first-child a').tab('show')
                $scope.model = {};
                $scope.model.driverLicense = {};
                $scope.model.assdriverLicense = {};
                $scope.model.vehicleRegistration = {};
                $scope.model.keurDLLAJR = {};
                $scope.model.assdriverIDCard = {};
                $scope.model.driverIDCard = {};
            })
        }
    }
    $scope.edit = (item) => {
        $('#myTab li:last-child a').tab('show')
        $scope.model = {};
        $scope.model = item
        $scope.model.driverLicense.berlaku = new Date($scope.model.driverLicense.berlaku);
        $scope.model.driverLicense.hingga = new Date($scope.model.driverLicense.hingga);
        $scope.model.assdriverLicense.berlaku = new Date($scope.model.assdriverLicense.berlaku);
        $scope.model.assdriverLicense.hingga = new Date($scope.model.assdriverLicense.hingga);
        $scope.model.vehicleRegistration.berlaku = new Date($scope.model.vehicleRegistration.berlaku);
        $scope.model.vehicleRegistration.hingga = new Date($scope.model.vehicleRegistration.hingga);
        $scope.model.keurDLLAJR.berlaku = new Date($scope.model.keurDLLAJR.berlaku);
        $scope.model.keurDLLAJR.hingga = new Date($scope.model.keurDLLAJR.hingga);
        $scope.model.assdriverIDCard.berlaku = new Date($scope.model.assdriverIDCard.berlaku);
        $scope.model.assdriverIDCard.hingga = new Date($scope.model.assdriverIDCard.hingga);
        $scope.model.driverIDCard.berlaku = new Date($scope.model.driverIDCard.berlaku);
        $scope.model.driverIDCard.hingga = new Date($scope.model.driverIDCard.hingga);
        $scope.model.carCreated = $scope.model.carCreated.toString();
        console.log($scope.model);
    }
}

function pengajuanController($scope, PengajuanServices) {
    $scope.datas = [];

    PengajuanServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.deleteItem = (item) => {
        message.info('Berhasil');
    }
}

function tambahPengajuanController($scope, KendaraanServices, helperServices, PengajuanServices, message, $state, $stateParams) {
    $scope.url = helperServices.base;
    $scope.jenisPengajuan = helperServices.jenisPengajuan;
    $scope.id = $stateParams.id;
    $scope.kendaraan = [];
    $scope.model = {};
    $scope.model.items = []
    KendaraanServices.get().then(x => {
        $scope.kendaraan = x;
        // console.log(x[0]);
        // var test = atob(x[0].fileAssDriverLicense.data);
        // console.log(test);
        $scope.model.company = { id: $scope.kendaraan[0].company.id };
        PengajuanServices.get().then(itemPengajuan => {
            if ($stateParams.id == null) {
                var d = new Date();
                if (itemPengajuan.length == 0) {
                    $scope.model.letterNumber = "1/" + $scope.kendaraan[0].company.name.toUpperCase().replace(/\s/g, '') + "/" + helperServices.toRoman(d.getDate()) + "/" + d.getFullYear();
                } else {
                    var itemnomor = itemPengajuan[itemPengajuan.length - 1];
                    var arraynomor = itemnomor.letterNumber.split('/');
                    $scope.model.letterNumber = (parseInt(arraynomor[0]) + 1) + "/" + $scope.kendaraan[0].company.name.toUpperCase().replace(/\s/g, '') + "/" + helperServices.toRoman(d.getDate()) + "/" + d.getFullYear()
                }
                console.log($scope.model.letterNumber);
            } else {
                $scope.model = itemPengajuan.find(datapengajuan => datapengajuan.id == $stateParams.id);
                console.log($scope.model);
            }
        })
    })
    $scope.setItem = (item) => {
        if ($stateParams.id == null) {
            item.truckId = angular.copy(item.id);
            item.attackStatus = item.attackStatus;
            item.pengajuanId;
            delete item.id;
            $scope.model.items.push(angular.copy(item));
            console.log($scope.model);
        } else {
            item.attackStatus = item.attackStatus;
            item.pengajuanId;
            var truck = {};
            truck.truck = item;
            $scope.model.items.push(angular.copy(truck));
            console.log($scope.model);
        }
    }
    $scope.deleteItem = (item) => {
        var index = $scope.model.items.indexOf(item);
        $scope.model.items.splice(index, 1);
        console.log($scope.model);
    }
    $scope.simpan = () => {

        if ($scope.model.id) {
            PengajuanServices.put($scope.model).then(x => {
                message.info('Berhasil');
                $state.go("pengajuan");
            })
        } else {
            PengajuanServices.post($scope.model).then(x => {
                message.info('Berhasil');
                $state.go("pengajuan");
            })
        }
    }
}
function pejabatController($scope, helperServices) {
    $scope.simpan = () => {
        if ($scope.model.id) {
            PengajuanServices.put($scope.model).then(x => {

            })
        } else {
            PengajuanServices.post($scope.model).then(x => {

            })
        }
    }
}