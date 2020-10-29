angular
    .module('admin.service', [])
    .factory('ContentService', ContentService);

function ContentService($http, $q, message, AuthService, helperServices) {
    var url = helperServices.url + '/api/content';
    var service = {
        Items: []
    };

    service.get = function () {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.Items);
        } else {
            $http({
                method: 'Get',
                url: url,
                headers: AuthService.getHeader()
            }).then(
                (response) => {
                    service.instance = true;
                    service.Items = response.data;
                    def.resolve(service.Items);
                },
                (err) => {
                    message.error(err.data);
                    def.reject(err);
                }
            );
        }

        return def.promise;
    };

    service.getById = function (id) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.Items.find((x) => x.idcontent == id);
            def.resolve(data);
        } else {
            $http({
                method: 'Get',
                url: url + '/' + id,
                headers: AuthService.getHeader()
            }).then(
                (response) => {
                    service.Items.push(response.data);
                    def.resolve(response.data);
                },
                (err) => {
                    message.error(err.data);
                    def.reject(err);
                }
            );
        }

        return def.promise;
    };

    service.getPengumuman = function () {
        var def = $q.defer();
        if (service.instance) {
            var data = service.Items.find((x) => x.type == 'pengumuman');
            def.resolve(data);
        } else {
            service.get().then((result) => {
                var data = result.Items.find((x) => x.type == 'pengumuman');
                def.resolve(data);
            });
        }

        return def.promise;
    };

    service.getInformasi = function () {
        var def = $q.defer();
        if (service.instance) {
            var data = service.Items.find((x) => x.type == 'informasi');
            def.resolve(data);
        } else {
            service.get().then((result) => {
                var data = result.Items.find((x) => x.type == 'informasi');
                def.resolve(data);
            });
        }

        return def.promise;
    };

    service.post = function (param) {
        var def = $q.defer();

        if (!param.idcontent) {
            param.idcontent = 0;
            param.created = new Date();
        }

        $http({
            method: 'Post',
            url: url,
            headers: AuthService.getHeader(),
            data: param
        }).then(
            (response) => {
                service.Items.push(response.data);
                def.resolve(response.data);
            },
            (err) => {
                message.error(err.data);
                def.reject(err);
            }
        );

        return def.promise;
    };

    service.put = function (param) {
        var def = $q.defer();
        $http({
            method: 'Put',
            url: url,
            headers: AuthService.getHeader(),
            data: param
        }).then(
            (response) => {
                var data = service.Items.find((x) => x.idcontent == param.idcontent);
                if (data) {
                    data.content = param.content;
                    data.publish = param.publish;
                    data.created = param.created;
                    data.title = param.title;
                }
                def.resolve(response.data);
            },
            (err) => {
                message.error(err.data);
                def.reject(err);
            }
        );
        return def.promise;
    };

    service.delete = function (id) {
        var def = $q.defer();
        $http({
            method: 'Delete',
            url: url + '/' + id,
            headers: AuthService.getHeader()
        }).then(
            (response) => {
                var data = service.Items.find((x) => x.idpegawai == id);
                if (data) {
                    var index = service.Items.indexOf(data);
                    service.Items.splice(index, 1);
                    def.resolve(true);
                }
            },
            (err) => {
                message.error(err.data);
                def.reject(err);
            }
        );
        return def.promise;
    };

    return service;
}