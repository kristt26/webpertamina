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
    "approval.controller",
    "approval.service",
    "naif.base64",
    "datatables",
    "ui.select2",
    "ngLocale",
    "ui.utils.masks",
    "720kb.datepicker"


]).controller("homeController", homeController)

    ;


function homeController($scope, AuthService) {
    $scope.logOff = function () {
        AuthService.logOff();
    }
}