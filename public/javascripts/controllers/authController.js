//remember to inject services into controller

app.controller('AuthCtrl', ['$scope', 'auth', '$state', function($scope, auth, $state){
  $scope.user = {};
  
//invokes the function in services
//then redirects to /home after registration
  $scope.register = function () {
    auth.register($scope.user).then(function(){  //redirecting user to home after registration
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).then(function(){
      $state.go('home');
    });
  };
  
}]);