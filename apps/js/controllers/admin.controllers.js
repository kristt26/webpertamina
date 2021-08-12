angular
    .module('admin.controller', [])
    .controller('adminController', adminController)
    .controller('adminDaftarUserController', adminDaftarUserController)
    .controller('adminlistpemeriksaanController', adminlistpemeriksaanController)
    .controller('adminBerkasPengajuanController', adminBerkasPengajuanController)
    .controller('adminpersetujuankimController', adminpersetujuankimController)
    .controller('adminkim', adminkim)
    .controller('adminhistoritrukController', adminhistoritrukController)
    .controller('adminKimController', adminKimController)
    ;

function adminController($scope, $state, AuthService, dashboardServices) {
    $scope.profile = {};
    $scope.data = {};
    if (!AuthService.userIsLogin()) {
        $state.go("login");
    }
    $scope.logout = ()=>{
        AuthService.logOff();
    }
    dashboardServices.get().then(res=>{
        $scope.data = res
        console.log(res);
    })
}

function adminDaftarUserController($scope, DaftarUserServices, helperServices, message) {
    $scope.roles = helperServices.roles;
    $scope.datas = [];
    $scope.model = {};
    $scope.Title = 'Daftar User';
    $scope.simpan = true;
    DaftarUserServices.get().then(x => {
        $scope.datas = x;
    });
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = (item) => {
        if (item.id) {
            DaftarUserServices.put(item).then(x => {
                message.info("User berhasil diubah");
                $scope.model = {};
                $scope.simpan = true;
            })
        } else {
            DaftarUserServices.post(item).then(x => {
                message.info("User berhasil ditambahkan");
                $scope.model = {};
                $scope.simpan = true;
            })
        }
    }
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
                message.dialogconfirm("List Pemeriksaan Berhasil diubah", "OK").then(x=>{
                    document.location.reload();
                })
            })
        } else {
            ListPemeriksaanServices.post($scope.model).then(x => {
                message.dialogconfirm("List Pemeriksaan Berhasil disimpan", "OK").then(x=>{
                    document.location.reload();
                })
                // $scope.model = {};
                // $scope.detail = {};
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

function adminBerkasPengajuanController($scope, PersetujuanKimServices, message) {
    $scope.datas = [];
    $scope.model = {};
    $scope.Title = 'Pemeriksaan Berkas';
    PersetujuanKimServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.setDataKim = (item)=>{
        $scope.model.id = 0;
        $scope.model.pengajuan = item.id;
        $scope.model.truck = item.truck;
    }
    $scope.save = (item)=>{
        var data = angular.copy(item);
        
        data.beginDate = new Date(item.beginDate);
        data.endDate = new Date(item.endDate);
        console.log(data);
        message.dialogmessage("Anda Yakin").then(x=>{
            PersetujuanKimServices.post(data).then(res=>{
                message.info("proses Berhasil");
            })
        });
    }
}

function adminpersetujuankimController($scope, PersetujuanKimServices, message) {
    $scope.datas = [];
    $scope.model = {};
    $scope.Title = 'Persetujuan KIM';
    PersetujuanKimServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.setDataKim = (item)=>{
        $scope.model.id = 0;
        $scope.model.pengajuan = item.id;
        $scope.model.truck = item.truck;
    }
    $scope.save = (item)=>{
        var data = angular.copy(item);
        
        data.beginDate = new Date(item.beginDate);
        data.endDate = new Date(item.endDate);
        console.log(data);
        message.dialogmessage("Anda Yakin").then(x=>{
            PersetujuanKimServices.post(data).then(res=>{
                message.info("proses Berhasil");
            })
        });
    }
}

function adminkim($scope) {
    $scope.Title = 'KIM'

}

function adminKimController($scope, adminKimsServices, message) {
    $scope.datas=[];
    $scope.model ={};
    $scope.tanggalCreate = new Date();
    adminKimsServices.get().then(res=>{
        $scope.datas = res;
    })
    $scope.print = (item) => {
        item.beginDate = new Date(item.beginDate);
        item.endDate = new Date(item.endDate);
        $scope.model = item;
        setTimeout(() => {
            $("#print").printArea();
        }, 100);
    }
    $scope.Title = 'KIM'

}

function adminhistoritrukController($scope) {
    $scope.Title = 'KIM'

}