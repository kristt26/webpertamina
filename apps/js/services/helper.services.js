angular.module("helper.service", [])
    .factory("helperServices", helperServices)
    ;


function helperServices() {
    var service = {};
    service.url = "http://192.168.1.5/api/";
    service.base = "http://192.168.1.5/";
    // service.url = "http://36.94.6.214/api/";
    // service.base = "http://36.94.6.214/";
    service.jenisPengajuan = ['Baru', 'Perpanjangan'];
    service.roles = ['Company', 'Approval1', 'HSE', 'Manager', 'Gate'];


    return { url: service.url, base: service.base, jenisPengajuan: service.jenisPengajuan, roles: service.roles };
}