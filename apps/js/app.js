angular.module("app", [
    "app.router",
    "datatables",
    "swangular",
    "message.service",

    "auth.service",
    "storage.services",
    "helper.service",

    "app.conponent",

    "auth.controller",
    "admin.controller",
    "admin.service",
    "perusahaan.controller",
    "perusahaan.service",
    "naif.base64",
    "datatables"


]).controller("homeController", homeController)

    ;


function homeController($scope, AuthService) {
    $scope.logOff = function () {
        AuthService.logOff();
    }
}