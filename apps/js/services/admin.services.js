angular.module('admin.service', [])
    .factory('DaftarUserServices', DaftarUserServices)
    .factory('ListPemeriksaanServices', ListPemeriksaanServices)
    .factory('AdministratorServices', AdministratorServices)
    .factory('PersetujuanKimServices', PersetujuanKimServices)
    ;

function DaftarUserServices($http, $q, StorageService, $state, helperServices, AuthService, message) {
    var controller = helperServices.url + 'users';
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
                    def.reject(err);
                    message.error(err);
                }
            );
        }
        return def.promise;
    }
    function post(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: helperServices.url + 'administrator/createuser/' + param.roles,
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }
    function put(param) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: helperServices.url + 'administrator/updateuser/' + param.id,
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var data = service.data.find(x => x.id == param.id);
                if (data) {
                    data.firstName = param.firstName;
                    data.lastName = param.lastName;
                    data.userName = param.userName;
                    data.email = param.email;
                }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }

}

function ListPemeriksaanServices($http, $q, StorageService, $state, helperServices, AuthService, message) {
    var controller = helperServices.url + 'itempemeriksaan';
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

function AdministratorServices($http, $q, StorageService, $state, helperServices, AuthService, message) {
    var controller = helperServices.url + 'administrator';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        GetPersetujuan: GetPersetujuan, post: post, put: put
    };

    function GetPersetujuan() {
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
        get: get, post: post
    };

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: controller + "/GetPersetujuan",
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
    function post(param) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: controller + "/CreateKim/" + param.pengajuan,
            data: param,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var data = service.data.find(x=>x.id == param.pengajuan);
                if(data){
                    var index = service.data.indexOf(data);
                    service.data.splice(index, 1);
                }
                def.resolve(res.data);
            },
            (err) => {
                message.error(err.data);
                def.reject(err.data);
            }
        );
        return def.promise;
    }
}