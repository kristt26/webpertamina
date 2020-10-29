angular.module("app",
[
    "app.router",
    "datatables",
    "swangular",
    "message.service",
    
    "auth.service",
    "storage.services",
    "helper.service",

    "app.conponent",

    "auth.controller",
 
    

]).controller("homeController",homeController)

;


function homeController($scope,AuthService){
    $scope.logOff=function(){
        AuthService.logOff();
    }
}