angular.module("auth.service", [])

    .factory("AuthService", AuthService)


    ;




function AuthService($http, $q, StorageService, $state, helperServices, message) {

    var service = {};

    return {
        login: login,
        logOff: logoff,
        userIsLogin: userIsLogin,
        getUserName: getUserName,
        // userIsLogin: userIsLogin,
        userInRole: userInRole,
        getHeader: getHeader,
        getToken: getToken,
        getUserId: getUserId,
        addProfile : addProfile,
        getProfile : getProfile
    }

    function login(user) {
        var def = $q.defer();
        var a = helperServices.url;
        var b = getHeader();
        $http({
            method: 'POST',
            url: helperServices.url + "users/authenticate",
            data: user,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            var user = res.data;
            StorageService.addObject("user", user);
            def.resolve(user);
        }, err => {
            def.reject(err);
            message.error(err.data);
        });
        return def.promise;
    }

    function getHeader() {

        try {
            if (userIsLogin()) {
                return {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }
            }
            throw new Error("Not Found Token");
        } catch {
            return {
                'Content-Type': 'application/json'
            }
        }
    }

    function logoff() {
        StorageService.clear();
        $state.go("login");

    }

    function getUserName() {
        if (userIsLogin) {
            var result = StorageService.getObject("user");
            return result.Username;
        }
    }

    function getToken() {
        if (userIsLogin) {
            var result = StorageService.getObject("user");
            return result.token;
        }
    }

    function getUserId() {
        if (userIsLogin) {
            var result = StorageService.getObject("user");
            return result.id;
        }
    }

    function userIsLogin() {
        var result = StorageService.getObject("user");
        if (result) {
            return true;
        }
    }

    function userInRole(role) {
        var result = StorageService.getItem("user");
        if (result && result.roles.find(x => x.name = role)) {

            return true;
        }
    }
    
    function addProfile(profile) {
        StorageService.addObject("profile", profile);
    }

    function getProfile() {
        var result = StorageService.getObject("profile");
        if (result) {
            return result;
        }
    }
}