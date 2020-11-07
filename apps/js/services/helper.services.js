angular.module("helper.service", [])
    .factory("helperServices", helperServices)
    ;


function helperServices() {
    var service = {};
    service.url = "http://192.168.1.5/api/";
    service.base = "http://192.168.1.5/";
    service.jenisPengajuan = ['Baru', 'Perpanjangan'];

    return { url: service.url, base: service.base, jenisPengajuan: service.jenisPengajuan };
}