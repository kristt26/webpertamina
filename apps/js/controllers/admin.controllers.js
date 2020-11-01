angular
    .module('admin.controller', [])
    .controller('adminController', adminController)
    .controller('adminDaftarUserController', adminDaftarUserController)
    .controller('adminlistpemeriksaanController', adminlistpemeriksaanController)
    .controller('adminpersetujuankimController', adminpersetujuankimController)
    .controller('adminkim', adminkim)
    .controller('adminhistoritruk', adminhistoritruk);

function adminController($scope) {

}

function adminDaftarUserController($scope, DaftarUserServices) {
    $scope.datas = [];
    $scope.Title = 'Daftar User';
    DaftarUserServices.get().then(x => {
        $scope.datas = x;
    });
}



function adminlistpemeriksaanController($scope, ListPemeriksaanServices, message) {
    $scope.Title = 'List Pemeriksaan';
    $scope.datas = [];
    $scope.model = {};
    $scope.detail = {};
    $scope.model.cek = false;
    $scope.itemDetail = "";
    $scope.model.items = [];
    $scope.tombolSimpan = true;
    ListPemeriksaanServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.simpan = () => {
        if ($scope.model.id) {
            ListPemeriksaanServices.put($scope.model).then(x => {

            })
        } else {
            ListPemeriksaanServices.post($scope.model).then(x => {

            })
        }
    }
    $scope.addDetail = () => {
        $scope.model.items.push(angular.copy($scope.detail));
        $scope.detail = {};
    }
    $scope.ubah = (item) => {
        $scope.model = angular.copy(item);
        if (item.detail) {
            $scope.model.cek = true;
        }

    }
    $scope.ubahDetail = (item) => {
        $scope.detail = item;
        $scope.tombolSimpan = false;
        $("#additemDetail").modal('show');
    }
    $scope.clear = () => {
        $scope.detail = {};
        $scope.tombolSimpan = true;
    }

}


function adminpersetujuankimController($scope, PersetujuanKimServices) {
    $scope.datas = [];
    $scope.Title = 'Persetujuan KIM';
    PersetujuanKimServices.get().then(x => {
        $scope.datas = x;
    })
}

function adminkim($scope) {
    $scope.Title = 'KIM'

}

function adminhistoritruk($scope) {
    $scope.Title = 'KIM'

}