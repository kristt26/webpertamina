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


function kendaraanController($scope, KendaraanServices, helperServices) {
    $scope.url = helperServices.base;
    $scope.datas = [];
    $scope.model = {};
    $scope.model.driverLicense = {};
    $scope.model.assdriverLicense = {};
    $scope.model.vehicleRegistration = {};
    $scope.model.keurDLLAJR = {};
    KendaraanServices.get().then(x => {
        $scope.datas = x;
        console.log(x);
    })
    $scope.setFile = (item) => {
        console.log(item);
    }
    $scope.simpan = () => {
        $scope.model.driverLicense = JSON.stringify($scope.model.driverLicense);
        $scope.model.assdriverLicense = JSON.stringify($scope.model.assdriverLicense);
        $scope.model.vehicleRegistration = JSON.stringify($scope.model.vehicleRegistration);
        $scope.model.keurDLLAJR = JSON.stringify($scope.model.keurDLLAJR);
        if ($scope.model.id) {

        } else {
            KendaraanServices.post($scope.model).then(x => {

            })
        }
    }
}

function pengajuanController($scope, PengajuanServices) {
    $scope.datas = [];

    PengajuanServices.get().then(x => {
        $scope.datas = x;
    })

}

function tambahPengajuanController($scope, KendaraanServices, helperServices, PengajuanServices) {
    $scope.url = helperServices.base;
    $scope.jenisPengajuan = helperServices.jenisPengajuan;
    $scope.kendaraan = [];
    $scope.model = {};
    $scope.model.items = []
    KendaraanServices.get().then(x => {
        $scope.kendaraan = x;
        $scope.model.companyId = $scope.kendaraan[0].company.id;
        PengajuanServices.get().then(itemPengajuan => {
            var d = new Date();
            if (itemPengajuan.length == 0) {
                $scope.model.letterNumber = "1/" + $scope.kendaraan[0].company.name.toLowerCase().replace(/\s/g, '') + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear();
            } else {
                var itemnomor = itemPengajuan[itemPengajuan.length - 1];
                var arraynomor = itemnomor.letterNumber.split('/');
                $scope.model.letterNumber = (parseInt(arraynomor[0]) + 1) + "/" + $scope.kendaraan[0].company.name.toLowerCase().replace(/\s/g, '') + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear()
            }
            console.log($scope.model.letterNumber);
        })
    })
    $scope.setItem = (item) => {
        var data = {};
        data.truckId = item.id;
        data.attackStatus = item.attackStatus;
        data.pengajuanId;
        // data.truck = item;
        $scope.model.items.push(angular.copy(data));
    }
    $scope.deleteItem = (item) => {
        var index = $scope.model.items.indexOf(item);
        $scope.model.items.splice(index, 1);
    }
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