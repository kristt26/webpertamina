angular.module('perusahaan.service', [])
    .factory('CompanyServices', CompanyServices)
    .factory('ProfilePerusahaanServices', ProfilePerusahaanServices)
    .factory('KendaraanServices', KendaraanServices)
    .factory('PersetujuanKimServices', PersetujuanKimServices)
    ;

function CompanyServices($http, $q, StorageService, $state, helperServices, AuthService, message) {
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

function ProfilePerusahaanServices($http, $q, helperServices, AuthService) {
    var controller = helperServices.url + 'companyadministrator';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, post: post, put: put
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller + "/getprofile",
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

    function post(params) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + "/createprofile",
            data: params,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err.data);

            }
        );
        return def.promise;
    }

    function put(params) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: controller + "/updateprofile/" + params.id,
            data: params,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err.data);

            }
        );
        return def.promise;
    }
}

function KendaraanServices($http, $q, StorageService, $state, helperServices, AuthService, message) {
    var controller = helperServices.url + 'companyadministrator/trucks';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get, post: post, put: put
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
                    message.error(err.data);
                    def.reject(err.data);
                }
            );
        }
        return def.promise;
    }

    function post(params) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller,
            data: params,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                message.error(err.data);
                def.reject(err.data);
            }
        );
        return def.promise;
    }

    function put(params) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: controller + '?id=' + params.id,
            data: params,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var data = service.data.find(x => x.id == params.id);
                if (data) {
                    data.kelengkapan = params.kelengkapan;
                    data.penjelasan = params.penjelasan;
                }
                def.resolve(res.data);
            },
            (err) => {
                message.error(err.data);
                def.reject(err);
            }
        );
        return def.promise;
    }
}
function PersetujuanKimServices($http, $q, StorageService, $state, helperServices, AuthService, message) {
    var controller = helperServices.url + 'administrator';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller + "/get",
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    def.resolve(res.data);
                },
                (err) => {
                    message.error(err.data);
                    def.reject(err.data);
                }
            );
        }
        return def.promise;
    }
}