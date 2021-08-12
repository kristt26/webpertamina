angular.module("auth.controller", [])

  .controller("LoginController", LoginController)

function LoginController($scope, $state, AuthService) {
  $scope.model = {};
  $scope.login = (user) => {
    AuthService.login(user).then(x => {
      if (x.roles[0] == "Company") {
        $state.go("dashboard");
      } else if(x.roles[0] == "Approval1"){
        $state.go("approval");
      } else {
        $state.go("home");
      }
    })
  }
}

