angular.module("auth.controller", [])

  .controller("LoginController", LoginController)

function LoginController($scope, $state, AuthService) {
  $scope.model = {};
  $scope.login = (user) => {
    AuthService.login(user).then(x => {
      $state.go("index");
    })
  }
}

