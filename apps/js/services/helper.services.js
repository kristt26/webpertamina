angular.module("helper.service", [])
    .factory("helperServices", helperServices)
    ;


function helperServices() {
    var service = {};
    service.url = "http://36.94.6.214/api/";
    service.base = "http://36.94.6.214/";
    service.jenisPengajuan = ['Baru', 'Perpanjangan'];

    return { url: service.url, base: service.base, jenisPengajuan: service.jenisPengajuan };
}