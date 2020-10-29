angular
    .module('admin.controller', [])
    .controller('adminController', adminController)
    .controller('adminDaftarUserController', adminDaftarUserController)
    .controller('adminManajemenUserController', adminManajemenUserController)
    .controller('adminListPemeriksaanController', adminListPemeriksaanController)
    .controller('admintambahlistpemeriksaanController', admintambahlistpemeriksaanController)
    .controller('adminpersetujuankim', adminpersetujuankim)
    .controller('adminkim', adminkim)
    .controller('adminhistoritruk', adminhistoritruk);

function adminController($scope) {

}

function adminDaftarUserController($scope) {
    $scope.Title = 'Daftar User'
}

function adminManajemenUserController($scope) {
    $scope.Title = 'Manajemen User Access'
}

function adminListPemeriksaanController($scope) {
    $scope.Title = 'List Pemeriksaan'

}

function admintambahlistpemeriksaanController($scope) {
    $scope.Title = 'Tambah List Pemeriksaan'

}

function adminpersetujuankim($scope) {
    $scope.Title = 'Persetujuan KIM'

}

function adminkim($scope) {
    $scope.Title = 'KIM'

}

function adminhistoritruk($scope) {
    $scope.Title = 'KIM'

}