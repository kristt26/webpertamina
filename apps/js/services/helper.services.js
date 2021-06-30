angular.module("helper.service", [])
    .factory("helperServices", helperServices);


function helperServices() {
    var service = {};
    service.url = "http://192.168.1.12/api/";
    service.base = "http://192.168.1.12/";
    // service.url = "http://36.94.6.214/api/";
    // service.base = "http://36.94.6.214/";
    service.jenisPengajuan = ['Baru', 'Perpanjangan'];
    service.roles = ['Company', 'Approval1', 'HSE', 'Manager', 'Gate'];
    function toRoman(num) {
        if (typeof num !== 'number')
            return false;

        var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman_num = "",
            i = 3;
        while (i--)
            roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
        return Array(+digits.join("") + 1).join("M") + roman_num;
    }
    return { url: service.url, base: service.base, jenisPengajuan: service.jenisPengajuan, roles: service.roles, toRoman: toRoman };
}