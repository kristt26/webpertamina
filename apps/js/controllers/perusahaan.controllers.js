angular
    .module('perusahaan.controller', [])
    .controller('companyController', companyController)
    .controller('dashboardController', dashboardController)
    .controller('profilePerusahaanController', profilePerusahaanController)
    .controller('kendaraanController', kendaraanController)
    .controller('adminkim', adminkim)
    .controller('adminhistoritruk', adminhistoritruk);

function companyController($scope, ProfilePerusahaanServices, message, $state) {
    $scope.profile = {};
    ProfilePerusahaanServices.get().then(x => {
        $scope.$emit("SendDown", "true");
        $scope.profile = x;
    }, err => {
        message.dialogmessage("Mohon isi Profile terlebih dahulu").then(x => {
            $state.go("profileperusahaan");
        });
    })
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


function kendaraanController($scope) {
    $scope.datas = [];
}

function adminkim($scope) {
    $scope.Title = 'KIM'

}

function adminhistoritruk($scope) {
    $scope.Title = 'KIM'

}