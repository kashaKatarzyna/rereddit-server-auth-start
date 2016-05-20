app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
  $scope.posts = posts.posts;

  $scope.addPost = function() {
    if ($scope.title === '') { return; }

//create fnc from posts.js
    posts.create({ 
      title: $scope.title, 
      link: $scope.link
    });

    $scope.title = '';
    $scope.link = '';
  }

//upvote fnc from posts.js
  $scope.incrementUpvotes = function(item) {
    posts.upvote(item);
  }
}]);

//front end. posts service to share the array with posts controller,
//injected as a service
//linked to home template
//creates a new post and show it.
//