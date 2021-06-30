angular
    .module('approval.controller', [])
    .controller('approvalController', approvalController)
    .controller('pengajuanBerkasController', pengajuanBerkasController)
    
    ;

function approvalController($scope, ProfilePerusahaanServices, message, $state, AuthService) {
    // $scope.profile = {};
    // if (!AuthService.userIsLogin()) {
    //     $state.go("login");
    // } else {
    //     ProfilePerusahaanServices.get().then(x => {
    //         $scope.$emit("SendDown", "true");
    //         $scope.profile = x;
    //     }, err => {
    //         message.dialogmessage("Mohon isi Profile terlebih dahulu").then(x => {
    //             $state.go("profileperusahaan");
    //         });
    //     })
    // };
    $scope.logout = () => {
        AuthService.logOff();
    }
}

function pengajuanBerkasController($scope, pengajuanBerkasController) {
    $scope.datas = [];
    $scope.Title = 'Daftar User';
    pengajuanBerkasController.get().then(x => {
        $scope.datas = x;
        console.log(x);
    });
}
