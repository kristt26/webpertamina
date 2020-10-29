angular
    .module('admin.controller', [])
    .controller('adminController', adminController)
    .controller('adminDaftarUserController', adminDaftarUserController)
    .controller('adminManajemenUserController', adminManajemenUserController)
    .controller('adminListPemeriksaanController', adminListPemeriksaanController);

function adminController($scope) {

}

function adminDaftarUserController($scope) {
    $scope.Title = 'Daftar User'
}

function adminManajemenUserController($scope) {
    $scope.Title = 'Manajemen User Access'
}

function adminListPemeriksaanController($scope) {

}