angular.module('approval.service', [])
    .factory('approvalServices', approvalServices)
    .factory('pengajuanBerkasController', pengajuanBerkasController)
    ;

function approvalServices($http, $q, helperServices, AuthService, message) {
    var controller = helperServices.url + 'companyadministrator';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, createProfile: createProfile
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller,
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    def.resolve(res.data);
                },
                (err) => {
                    def.reject(err.data);

                }
            );
        }
        return def.promise;
    }

    function createProfile() {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + "/createprofile",
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                if (service.instance = true) {
                } else {
                    service.data = res.data;
                }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err.data);

            }
        );
        return def.promise;
    }

}
function pengajuanBerkasController($http, $q, helperServices, AuthService, message) {
    var controller = helperServices.url + 'approval/';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, createProfile: createProfile
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller + "GetPersetujuan",
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    def.resolve(res.data);
                },
                (err) => {
                    def.reject(err.data);

                }
            );
        }
        return def.promise;
    }

    function createProfile() {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + "/createprofile",
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                if (service.instance = true) {
                } else {
                    service.data = res.data;
                }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err.data);

            }
        );
        return def.promise;
    }

}
