angular.module("auth.controller", [])

  .controller("LoginController", LoginController)

function LoginController($scope, $state, AuthService) {
  $scope.model = {};
  $scope.login = (user) => {
    AuthService.login(user).then(x => {
      if (x.roles[0] == "Company") {
        $state.go("perusahaan");
      } else {
        $state.go("index");
      }
    })
  }
}

