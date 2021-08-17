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
    $scope.logout = () => {
        AuthService.logOff();
    }
    // dashboardServices.get().then(res=>{
    //     $scope.data = res
    //     console.log(res);
    // })
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
    $scope.itemDetail = undefined;
    $scope.model.items = [];
    $scope.tombolSimpan = true;
    ListPemeriksaanServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.simpan = () => {
        if ($scope.model.id) {
            ListPemeriksaanServices.put($scope.model).then(x => {
                message.dialogconfirm("List Pemeriksaan Berhasil diubah", "OK").then(x => {
                    document.location.reload();
                })
            })
        } else {
            ListPemeriksaanServices.post($scope.model).then(x => {
                message.dialogconfirm("List Pemeriksaan Berhasil disimpan", "OK").then(x => {
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

function adminBerkasPengajuanController($scope, PersetujuanKimServices, message, $stateParams, helperServices, $sce, ListPemeriksaanServices, approvalServices) {
    $scope.datas = [];
    $scope.model = {};
    $scope.Title = 'Pemeriksaan Berkas';
    $scope.breadcrumb = 'Berkas Pengajuan';
    $scope.detailbreadcrumb;
    $scope.stnk = {};
    $scope.keur = {};
    $scope.sim = {};
    $scope.kir = {};
    PersetujuanKimServices.get().then(x => {
        $scope.datas = x;

        ListPemeriksaanServices.get().then(res => {
            if ($stateParams.id) {
                $scope.model = $scope.datas.find(x => x.id == $stateParams.id);
                // $scope.ktpDriver = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.driverIDCard.document);
                $scope.ktpDriver = $sce.trustAsResourceUrl(helperServices.base + 'photos/c20681e6-733d-438b-b351-bf3b68cbdae7.png');
                // console.log($scope.urlPhoto);
                $scope.detailbreadcrumb = "Berkas";
                res.forEach(element => {
                    var jenis = element.items.find(it => it.jenisPemeriksaan == 1);
                    var item = {};
                    element.items.forEach(data => {
                        item = { itemPengajuanId: $scope.model.pengajuan.id, itemPemeriksaanId: data.id, hasil: false, tindakLanjut: null, keterangan: null, compensationDeadLine: null, itemPemeriksaan: data, jenis: jenis ? 1 : 0 };
                        $scope.model.hasilPemeriksaan.push(item);
                    });
                    if (element.name == 'STNK')
                        $scope.stnk = item;
                    else if (element.name == 'KEURDLLAJR')
                        $scope.keur = item;
                    else if (element.name == 'SIM')
                        $scope.sim = item;
                    else if (element.name == 'SURAT TERA METROLOGI')
                        $scope.kir = item;

                });
                // console.log($scope.stnk);
                // console.log($scope.keur);
                // console.log($scope.sim);
                // console.log($scope.kir);
                console.log($scope.model);
            }
        })
    })

    $scope.setDataKim = (item) => {
        $scope.model.id = 0;
        $scope.model.pengajuan = item.id;
        $scope.model.truck = item.truck;
    }
    $scope.Proses = () => {
        message.dialogmessage("Anda Yakin").then(x => {
            approvalServices.post($scope.model).then(res => {
                message.info("proses Berhasil");
            })
        });
    }
    $scope.detail = (item, set) => {
        $scope.ktpDriver = {};
        $scope.setKtpDriver = undefined;
        $scope.simDriver = {};
        $scope.setSimDriver = undefined;
        $scope.photoDriver = {};
        $scope.setPhotoDriver = undefined;
        $scope.keurdllajr ={};
        $scope.setKeurdllajr = undefined;
        $scope.stnk = {};
        $scope.setStnk =undefined;
        if (set == 'KTP') {
            $scope.ktpDriver = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.driverIDCard.document);
            $scope.setKtpDriver = $scope.model.truck.driverIDCard.document.split('.');
            $scope.setKtpDriver = $scope.setKtpDriver[1];
            $scope.ktpAssDriver = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.assdriverIDCard.document);
            $scope.setAssKtpDriver = $scope.model.truck.assdriverIDCard.document.split('.');
            $scope.setAssKtpDriver = $scope.setAssKtpDriver[1];
            console.log($scope.setAssKtpDriver);
            $("#detailKtp").modal("show");
        }
        if (set == 'SIM') {
            $scope.simDriver = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.driverLicense.document);
            $scope.setSimDriver = $scope.model.truck.driverLicense.document.split('.');
            $scope.setSimDriver = $scope.setSimDriver[1];
            $scope.simAssDriver = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.assdriverLicense.document);
            $scope.setAssSimDriver = $scope.model.truck.assdriverLicense.document.split('.');
            $scope.setAssSimDriver = $scope.setAssSimDriver[1];
            $("#detailKtp").modal("show");
        }
        if (set == 'Photo') {
            $scope.photoDriver = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.driverPhoto);
            $scope.setPhotoDriver = $scope.model.truck.driverPhoto.split('.');
            $scope.setPhotoDriver = $scope.setPhotoDriver[1];
            $scope.photoAssDriver = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.assdriverPhoto);
            $scope.setAssPhotoDriver = $scope.model.truck.assdriverPhoto.split('.');
            $scope.setAssPhotoDriver = $scope.setAssPhotoDriver[1];
            $("#detailKtp").modal("show");
        }
        if (set == 'KEURDLLAJR') {
            $scope.keurdllajr = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.keurDLLAJR.document);
            $scope.setKeurdllajr = $scope.model.truck.keurDLLAJR.document.split('.');
            $scope.setKeurdllajr = $scope.setKeurdllajr[1];
            $("#detailKtp").modal("show");
        }
        if (set == 'STNK') {
            $scope.stnk = $sce.trustAsResourceUrl(helperServices.base + $scope.model.truck.vehicleRegistration.document);
            $scope.setStnk = $scope.model.truck.vehicleRegistration.document.split('.');
            $scope.setStnk = $scope.setStnk[1];
            $("#detailKtp").modal("show");
        }
    }
    $scope.validate = (set) => {
        if (set == 'SIM') {
            $scope.itemBerkas = $scope.sim;
            $("#showValid").modal("show");
        }
        if (set == 'KEURDLLAJR') {
            $scope.itemBerkas = $scope.keur;
            $("#showValid").modal("show");
        }
        if (set == 'STNK') {
            $scope.itemBerkas = $scope.stnk;
            $("#showValid").modal("show");
        }
        console.log($scope.itemBerkas);
    }
    // $scope.Proses = ()=>{
    //     console.log($scope.model);
    // }
}

function adminpersetujuankimController($scope, PersetujuanKimServices, message) {
    $scope.datas = [];
    $scope.model = {};
    $scope.Title = 'Persetujuan KIM';
    PersetujuanKimServices.get().then(x => {
        $scope.datas = x;
    })
    $scope.setDataKim = (item) => {
        $scope.model.id = 0;
        $scope.model.pengajuan = item.id;
        $scope.model.truck = item.truck;
    }
    $scope.save = (item) => {
        var data = angular.copy(item);

        data.beginDate = new Date(item.beginDate);
        data.endDate = new Date(item.endDate);
        console.log(data);
        message.dialogmessage("Anda Yakin").then(x => {
            PersetujuanKimServices.post(data).then(res => {
                message.info("proses Berhasil");
            })
        });
    }
}

function adminkim($scope) {
    $scope.Title = 'KIM'

}

function adminKimController($scope, adminKimsServices, message) {
    $scope.datas = [];
    $scope.model = {};
    $scope.tanggalCreate = new Date();
    adminKimsServices.get().then(res => {
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